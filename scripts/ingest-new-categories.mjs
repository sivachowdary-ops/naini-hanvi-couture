/**
 * New Categories Ingestion Pipeline
 * 
 * Processes the 4 newly uploaded category folders:
 *   - Ajarakh Modal Silk
 *   - Jamdani
 *   - Premium Kota
 *   - Swan Jamdani
 * 
 * Appends results to the existing catalog-ingestion-manifest.json.
 * Does NOT touch existing products (prod-1 through prod-39).
 * 
 * Usage: node scripts/ingest-new-categories.mjs
 */

import sharp from "sharp";
import { readdir, stat, mkdir, writeFile, readFile } from "fs/promises";
import { join, extname, basename, relative } from "path";
import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";

// ─── Configuration ───────────────────────────────────────────
const PROJECT_ROOT = process.cwd();

const NEW_CATEGORY_FOLDERS = [
  {
    path: join(PROJECT_ROOT, "Ajarakh ModalSilk-20260730T154352Z-1-001", "Ajarakh ModalSilk"),
    category: "Ajarakh Modal Silk",
  },
  {
    path: join(PROJECT_ROOT, "Jamdani-20260730T154353Z-1-001", "Jamdani"),
    category: "Jamdani",
  },
  {
    path: join(PROJECT_ROOT, "Premium kota-20260730T154351Z-1-001", "Premium kota"),
    category: "Premium Kota",
  },
  {
    path: join(PROJECT_ROOT, "Swan Jamdani-20260730T154353Z-1-001", "Swan Jamdani"),
    category: "Swan Jamdani",
  },
];

const OUTPUT_DIR = join(PROJECT_ROOT, "public", "catalog");
const EXISTING_MANIFEST_PATH = join(PROJECT_ROOT, "catalog-ingestion-manifest.json");
const NEW_MANIFEST_PATH = join(PROJECT_ROOT, "catalog-ingestion-manifest-new.json");
const IMAGE_EXTENSIONS = [".heic", ".heif", ".jpg", ".jpeg", ".png", ".webp"];
const VIDEO_EXTENSIONS = [".mov", ".mp4", ".avi", ".mkv"];
const WEBP_QUALITY = 82;
const HASH_SIZE = 16;
const SIMILARITY_THRESHOLD = 12;
const MAX_VIDEO_DURATION = 10; // seconds — user requested ≤10s

// ─── Perceptual Hashing ──────────────────────────────────────

function heicToJpeg(heicPath) {
  const tmpDir = join(PROJECT_ROOT, "public", "catalog", "_tmp");
  if (!existsSync(tmpDir)) {
    mkdirSync(tmpDir, { recursive: true });
  }
  const safeName = basename(heicPath).replace(/[^a-zA-Z0-9._-]/g, "_");
  const tmpJpeg = join(tmpDir, safeName.replace(/\.heic$/i, ".jpg").replace(/\.heif$/i, ".jpg"));
  
  const relInput = relative(PROJECT_ROOT, heicPath).replace(/\//g, "\\");
  const relOutput = relative(PROJECT_ROOT, tmpJpeg).replace(/\//g, "\\");
  const cmd = `ffmpeg -y -i "${relInput}" -frames:v 1 -update 1 -q:v 2 "${relOutput}"`;
  
  try {
    execSync(cmd, { encoding: "utf8", timeout: 30000, stdio: "pipe" });
    return tmpJpeg;
  } catch (err) {
    if (existsSync(tmpJpeg)) {
      return tmpJpeg;
    }
    console.error(`  ⚠ ffmpeg HEIC conversion failed for ${basename(heicPath)}: ${err.message}`);
    return null;
  }
}

function getProcessablePath(imagePath) {
  const ext = extname(imagePath).toLowerCase();
  if (ext === ".heic" || ext === ".heif") {
    return heicToJpeg(imagePath);
  }
  return imagePath;
}

async function computePerceptualHash(imagePath) {
  try {
    const processable = getProcessablePath(imagePath);
    if (!processable) return null;
    
    const { data } = await sharp(processable)
      .resize(HASH_SIZE, HASH_SIZE, { fit: "fill" })
      .grayscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    const avg = sum / data.length;

    let hash = "";
    for (let i = 0; i < data.length; i++) {
      hash += data[i] >= avg ? "1" : "0";
    }
    return hash;
  } catch (err) {
    console.error(`  ⚠ Failed to hash ${basename(imagePath)}: ${err.message}`);
    return null;
  }
}

function hammingDistance(hash1, hash2) {
  if (!hash1 || !hash2 || hash1.length !== hash2.length) return Infinity;
  let dist = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) dist++;
  }
  return dist;
}

// ─── Image Quality Scoring ───────────────────────────────────

async function scoreImage(imagePath) {
  try {
    const processable = getProcessablePath(imagePath);
    if (!processable) return { width: 0, height: 0, fileSize: 0, totalScore: 0 };
    
    const metadata = await sharp(processable).metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;
    const fileSize = (await stat(imagePath)).size;

    const resScore = Math.min((width * height) / (4000 * 4000), 1.0);
    const sizeScore = Math.min(fileSize / (5 * 1024 * 1024), 1.0);
    const ratio = width / height;
    const aspectScore = (ratio >= 0.5 && ratio <= 2.0) ? 1.0 : 0.5;
    const totalScore = resScore * 0.4 + sizeScore * 0.35 + aspectScore * 0.25;

    return { width, height, fileSize, totalScore };
  } catch (err) {
    console.error(`  ⚠ Failed to score ${basename(imagePath)}: ${err.message}`);
    return { width: 0, height: 0, fileSize: 0, totalScore: 0 };
  }
}

// ─── Video Duration Check ────────────────────────────────────

function getVideoDuration(videoPath) {
  try {
    const relPath = relative(PROJECT_ROOT, videoPath).replace(/\//g, "\\");
    const result = execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${relPath}"`,
      { encoding: "utf8", timeout: 30000 }
    );
    return parseFloat(result.trim());
  } catch (err) {
    console.error(`  ⚠ ffprobe failed for ${basename(videoPath)}: ${err.message}`);
    return -1;
  }
}

// ─── Clustering ──────────────────────────────────────────────

function clusterImages(imageEntries) {
  const clusters = [];

  for (const entry of imageEntries) {
    if (!entry.hash) {
      clusters.push([entry]);
      continue;
    }

    let bestCluster = null;
    let bestDist = Infinity;

    for (const cluster of clusters) {
      for (const member of cluster) {
        if (!member.hash) continue;
        const dist = hammingDistance(entry.hash, member.hash);
        if (dist < bestDist) {
          bestDist = dist;
          bestCluster = cluster;
        }
      }
    }

    if (bestDist <= SIMILARITY_THRESHOLD && bestCluster) {
      bestCluster.push(entry);
    } else {
      clusters.push([entry]);
    }
  }

  return clusters;
}

// ─── Media Conversion ────────────────────────────────────────

async function convertToWebP(inputPath, outputPath) {
  const processable = getProcessablePath(inputPath);
  if (!processable) throw new Error(`Could not process ${basename(inputPath)}`);
  
  await sharp(processable)
    .resize(1600, null, { withoutEnlargement: true })
    .toColorspace('srgb')
    .withMetadata({ icc: 'srgb' })
    .webp({ quality: 80, effort: 6, smartSubsample: true })
    .toFile(outputPath);
}

function transcodeVideo(inputPath, outputPath) {
  try {
    const relInput = relative(PROJECT_ROOT, inputPath).replace(/\//g, "\\");
    const relOutput = relative(PROJECT_ROOT, outputPath).replace(/\//g, "\\");
    execSync(
      `ffmpeg -y -i "${relInput}" -c:v libx264 -preset slow -crf 30 -movflags +faststart -c:a aac -b:a 128k -vf "scale=-2:720" "${relOutput}"`,
      { encoding: "utf8", timeout: 120000, stdio: "pipe" }
    );
    return true;
  } catch (err) {
    console.error(`  ⚠ Video transcode failed for ${basename(inputPath)}: ${err.message}`);
    return false;
  }
}

function extractPoster(videoPath, outputPath) {
  try {
    const relInput = relative(PROJECT_ROOT, videoPath).replace(/\//g, "\\");
    const relOutput = relative(PROJECT_ROOT, outputPath).replace(/\//g, "\\");
    execSync(
      `ffmpeg -y -i "${relInput}" -ss 00:00:01 -vframes 1 -vf "scale='min(720,iw)':-2" "${relOutput}"`,
      { encoding: "utf8", timeout: 30000, stdio: "pipe" }
    );
    return true;
  } catch (err) {
    console.error(`  ⚠ Poster extraction failed for ${basename(videoPath)}: ${err.message}`);
    return false;
  }
}

// ─── Slug Generation ─────────────────────────────────────────

function generateSlug(category, index) {
  const catSlug = category.toLowerCase().replace(/\s+/g, "-");
  return `${catSlug}-saree-${String(index).padStart(2, "0")}`;
}

function generateName(category, index) {
  return `${category} Saree ${String(index).padStart(2, "0")}`;
}

// ─── Main Pipeline ───────────────────────────────────────────

async function main() {
  console.log("\n╔═══════════════════════════════════════════════════════╗");
  console.log("║  Naini Hanvi Couture — New Categories Ingestion      ║");
  console.log("╚═══════════════════════════════════════════════════════╝\n");

  // Ensure output directory
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  // Load existing manifest to get the current product count
  let existingProducts = [];
  let existingCategories = [];
  try {
    const existingManifest = JSON.parse(await readFile(EXISTING_MANIFEST_PATH, "utf8"));
    existingProducts = existingManifest.products || [];
    existingCategories = existingManifest.categories || [];
    console.log(`  📋 Loaded existing manifest: ${existingProducts.length} products\n`);
  } catch {
    console.log("  ⚠ No existing manifest found, starting fresh\n");
  }

  // Start product IDs after the existing ones
  let globalProductIndex = existingProducts.length;

  const newProducts = [];
  const newCategories = [];

  // Track files already used by Swan Jamdani (to de-dup from Jamdani)
  const swanJamdaniFiles = new Set();
  
  // Process Swan Jamdani first to know which files it uses
  const swanFolder = NEW_CATEGORY_FOLDERS.find(f => f.category === "Swan Jamdani");
  if (swanFolder && existsSync(swanFolder.path)) {
    const files = await readdir(swanFolder.path);
    files.forEach(f => swanJamdaniFiles.add(f));
    console.log(`  📋 Swan Jamdani claims ${swanJamdaniFiles.size} files\n`);
  }

  for (const folder of NEW_CATEGORY_FOLDERS) {
    console.log(`\n━━━ Processing: ${folder.category} ━━━`);
    console.log(`    Path: ${folder.path}\n`);

    if (!existsSync(folder.path)) {
      console.error(`  ✗ Folder not found: ${folder.path}`);
      continue;
    }

    // Create category output dir
    const catSlug = folder.category.toLowerCase().replace(/\s+/g, "-");
    const catOutputDir = join(OUTPUT_DIR, catSlug);
    if (!existsSync(catOutputDir)) {
      await mkdir(catOutputDir, { recursive: true });
    }

    // 1. Inventory files
    let files = await readdir(folder.path);
    
    // De-duplicate files with (1) suffix (e.g., IMG_5970(1).HEIC)
    const dupPattern = /\(\d+\)/;
    const beforeDedup = files.length;
    files = files.filter(f => !dupPattern.test(f));
    if (files.length < beforeDedup) {
      console.log(`  🔄 Removed ${beforeDedup - files.length} duplicate files with (1) suffix`);
    }

    // For Jamdani: exclude files that are also in Swan Jamdani
    if (folder.category === "Jamdani") {
      const beforeExclude = files.length;
      files = files.filter(f => !swanJamdaniFiles.has(f));
      if (files.length < beforeExclude) {
        console.log(`  🔄 Excluded ${beforeExclude - files.length} files shared with Swan Jamdani`);
      }
    }
    
    const imageFiles = files.filter(f => IMAGE_EXTENSIONS.includes(extname(f).toLowerCase()));
    const videoFiles = files.filter(f => VIDEO_EXTENSIONS.includes(extname(f).toLowerCase()));

    console.log(`  📸 Found ${imageFiles.length} images, 🎬 ${videoFiles.length} videos`);

    // 2. Hash all images
    console.log("  ⏳ Computing perceptual hashes...");
    const imageEntries = [];
    for (const file of imageFiles) {
      const fullPath = join(folder.path, file);
      const hash = await computePerceptualHash(fullPath);
      const score = await scoreImage(fullPath);
      imageEntries.push({ file, fullPath, hash, score });
      process.stdout.write(`    ✓ ${file} (score: ${score.totalScore.toFixed(3)})\n`);
    }

    // 3. Cluster images
    console.log("\n  🔗 Clustering images into product groups...");
    const clusters = clusterImages(imageEntries);
    console.log(`  ✓ Found ${clusters.length} product groups\n`);

    // 4. Process video durations (≤10 seconds)
    console.log("  🎬 Checking video durations...");
    const videoInfo = [];
    for (const vf of videoFiles) {
      const fullPath = join(folder.path, vf);
      const duration = getVideoDuration(fullPath);
      const kept = duration > 0 && duration <= MAX_VIDEO_DURATION;
      videoInfo.push({ file: vf, fullPath, duration, kept });
      console.log(`    ${kept ? "✓" : "✗"} ${vf}: ${duration.toFixed(1)}s ${kept ? "(kept — ≤10s)" : "(discarded — >10s)"}`);
    }

    const keptVideos = videoInfo.filter(v => v.kept);

    // 5. Process each product cluster
    const categoryManifest = { category: folder.category, productCount: 0, products: [] };
    let categoryProductIndex = 0;

    for (let ci = 0; ci < clusters.length; ci++) {
      globalProductIndex++;
      categoryProductIndex++;
      const cluster = clusters[ci];
      const slug = generateSlug(folder.category, categoryProductIndex);
      const name = generateName(folder.category, categoryProductIndex);

      // Sort by quality score, pick top 2
      cluster.sort((a, b) => b.score.totalScore - a.score.totalScore);
      const selectedImages = cluster.slice(0, 2);

      console.log(`\n  📦 Product #${globalProductIndex}: ${name}`);
      console.log(`     Group size: ${cluster.length} images`);
      console.log(`     Selected: ${selectedImages.map(i => i.file).join(", ")}`);

      // Convert selected images to WebP
      const gallery = [];
      for (let imgIdx = 0; imgIdx < selectedImages.length; imgIdx++) {
        const imgEntry = selectedImages[imgIdx];
        const webpName = `${slug}-img${imgIdx + 1}.webp`;
        const webpPath = join(catOutputDir, webpName);

        try {
          await convertToWebP(imgEntry.fullPath, webpPath);
          const publicPath = `/catalog/${catSlug}/${webpName}`;
          gallery.push({
            type: "image",
            src: publicPath,
            thumbnail: publicPath,
            alt: `${name} - View ${imgIdx + 1}`,
          });
          console.log(`     ✓ Converted ${imgEntry.file} → ${webpName}`);
        } catch (err) {
          console.error(`     ✗ Failed to convert ${imgEntry.file}: ${err.message}`);
        }
      }

      // Try to match a kept video to this cluster
      let matchedVideo = null;
      if (keptVideos.length > 0) {
        const clusterNums = cluster.map(e => {
          const m = e.file.match(/(\d+)/);
          return m ? parseInt(m[1]) : 0;
        }).filter(n => n > 0);

        if (clusterNums.length > 0) {
          const minNum = Math.min(...clusterNums);
          const maxNum = Math.max(...clusterNums);

          for (const vid of keptVideos) {
            if (vid.assigned) continue;
            const vidNum = vid.file.match(/(\d+)/);
            if (vidNum) {
              const vn = parseInt(vidNum[1]);
              if (vn >= minNum - 2 && vn <= maxNum + 2) {
                matchedVideo = vid;
                break;
              }
            }
          }
        }

        if (!matchedVideo) {
          for (const vid of keptVideos) {
            if (!vid.assigned) {
              matchedVideo = vid;
              break;
            }
          }
        }
      }

      if (matchedVideo) {
        matchedVideo.assigned = true;
        const vidOutName = `${slug}-video.mp4`;
        const vidOutPath = join(catOutputDir, vidOutName);
        const posterName = `${slug}-poster.webp`;
        const posterPath = join(catOutputDir, posterName);

        console.log(`     🎬 Matched video: ${matchedVideo.file} (${matchedVideo.duration.toFixed(1)}s)`);

        if (transcodeVideo(matchedVideo.fullPath, vidOutPath)) {
          extractPoster(matchedVideo.fullPath, posterPath);
          const publicVidPath = `/catalog/${catSlug}/${vidOutName}`;
          const publicPosterPath = `/catalog/${catSlug}/${posterName}`;
          gallery.push({
            type: "video",
            src: publicVidPath,
            thumbnail: publicPosterPath,
            alt: `${name} - Video`,
          });
          console.log(`     ✓ Transcoded video → ${vidOutName}`);
        }
      }

      // Build product record
      const product = {
        id: `prod-${globalProductIndex}`,
        slug,
        name,
        brand: "Naini Hanvi Couture",
        category: folder.category,
        price: 2000 + Math.floor(Math.random() * 3000),
        inStock: true,
        isBestSeller: false,
        badge: null,
        fabric: folder.category,
        lengthWidth: "5.5 meters, 1.1 meters width",
        blouseDetail: "Unstitched blouse piece included (0.8m)",
        description: `A beautiful ${folder.category} saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.`,
        gallery,
        variants: [],
        tags: [],
        sourceFiles: cluster.map(e => e.file),
        selectionReason: selectedImages.map(e => `${e.file}: score ${e.score.totalScore.toFixed(3)} (res: ${e.score.width}x${e.score.height})`),
        matchedVideo: matchedVideo ? `${matchedVideo.file} (${matchedVideo.duration.toFixed(1)}s)` : null,
      };

      newProducts.push(product);
      categoryManifest.products.push({
        slug,
        name,
        imageCount: cluster.length,
        selectedImages: selectedImages.map(e => e.file),
        matchedVideo: matchedVideo?.file || null,
        galleryItemCount: gallery.length,
      });
      categoryManifest.productCount++;
    }

    newCategories.push(categoryManifest);
  }

  // Write combined manifest (existing + new)
  const combinedManifest = {
    generatedAt: new Date().toISOString(),
    categories: [...existingCategories, ...newCategories],
    products: [...existingProducts, ...newProducts],
    summary: {
      totalProducts: existingProducts.length + newProducts.length,
      existingProducts: existingProducts.length,
      newProducts: newProducts.length,
      totalImages: [...existingProducts, ...newProducts].reduce((s, p) => s + p.gallery.filter(g => g.type === "image").length, 0),
      totalVideos: [...existingProducts, ...newProducts].reduce((s, p) => s + p.gallery.filter(g => g.type === "video").length, 0),
    },
  };

  await writeFile(EXISTING_MANIFEST_PATH, JSON.stringify(combinedManifest, null, 2), "utf8");

  // Also write a separate new-only manifest for review
  const newOnlyManifest = {
    generatedAt: new Date().toISOString(),
    categories: newCategories,
    products: newProducts,
    summary: {
      newProducts: newProducts.length,
      newImages: newProducts.reduce((s, p) => s + p.gallery.filter(g => g.type === "image").length, 0),
      newVideos: newProducts.reduce((s, p) => s + p.gallery.filter(g => g.type === "video").length, 0),
    },
  };

  await writeFile(NEW_MANIFEST_PATH, JSON.stringify(newOnlyManifest, null, 2), "utf8");

  console.log("\n╔═══════════════════════════════════════════════════════╗");
  console.log("║           NEW CATEGORIES INGESTION COMPLETE          ║");
  console.log("╚═══════════════════════════════════════════════════════╝");
  console.log(`\n  📦 New Products: ${newProducts.length}`);
  console.log(`  📸 New Images:   ${newOnlyManifest.summary.newImages}`);
  console.log(`  🎬 New Videos:   ${newOnlyManifest.summary.newVideos}`);
  console.log(`\n  📦 Total Products (old + new): ${combinedManifest.summary.totalProducts}`);
  console.log(`\n  📋 Combined Manifest: ${EXISTING_MANIFEST_PATH}`);
  console.log(`  📋 New-Only Manifest: ${NEW_MANIFEST_PATH}`);
  console.log(`  📁 Output: ${OUTPUT_DIR}`);
  
  // Print product groupings for review
  console.log("\n\n═══ NEW PRODUCT GROUPINGS ═══\n");
  for (const cat of newCategories) {
    console.log(`\n── ${cat.category} (${cat.productCount} products) ──`);
    for (const p of cat.products) {
      console.log(`  ${p.name}: ${p.imageCount} images clustered → ${p.selectedImages.join(", ")}${p.matchedVideo ? ` + video: ${p.matchedVideo}` : ""}`);
    }
  }
}

main().catch(err => {
  console.error("\n✗ Pipeline failed:", err);
  process.exit(1);
});
