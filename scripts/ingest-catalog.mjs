/**
 * Catalog Ingestion Pipeline for Naini Hanvi Couture
 * 
 * Scans three client-supplied category folders, groups images by visual
 * similarity using perceptual hashing, selects the best 2 images per product,
 * checks video durations, converts media to web-optimized formats, and
 * generates a review manifest.
 * 
 * Usage: node scripts/ingest-catalog.mjs
 */

import sharp from "sharp";
import { readdir, stat, mkdir, writeFile, copyFile } from "fs/promises";
import { join, extname, basename, relative } from "path";
import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";

// ─── Configuration ───────────────────────────────────────────
const PROJECT_ROOT = process.cwd();

const CATEGORY_FOLDERS = [
  {
    path: join(PROJECT_ROOT, "Malai cottons-20260720T093242Z-1-001", "Malai cottons"),
    category: "Malai Cottons",
  },
  {
    path: join(PROJECT_ROOT, "Muslin sequence-20260720T093241Z-1-001", "Muslin sequence"),
    category: "Muslin Sequence",
  },
  {
    path: join(PROJECT_ROOT, "Silk kota-20260720T093241Z-1-001", "Silk kota"),
    category: "Silk Kota",
  },
];

const OUTPUT_DIR = join(PROJECT_ROOT, "public", "catalog");
const MANIFEST_PATH = join(PROJECT_ROOT, "catalog-ingestion-manifest.json");
const IMAGE_EXTENSIONS = [".heic", ".heif", ".jpg", ".jpeg", ".png", ".webp"];
const VIDEO_EXTENSIONS = [".mov", ".mp4", ".avi", ".mkv"];
const WEBP_QUALITY = 82;
const HASH_SIZE = 16; // perceptual hash grid size
const SIMILARITY_THRESHOLD = 12; // max hamming distance for same-product grouping

// ─── Perceptual Hashing ──────────────────────────────────────

/**
 * Convert HEIC to a temporary JPEG using ffmpeg (bypasses libheif security limits).
 * Returns the path to the temporary JPEG file.
 */
function heicToJpeg(heicPath) {
  const tmpDir = join(PROJECT_ROOT, "public", "catalog", "_tmp");
  if (!existsSync(tmpDir)) {
    mkdirSync(tmpDir, { recursive: true });
  }
  // Use a safe temp filename based on the original
  const safeName = basename(heicPath).replace(/[^a-zA-Z0-9._-]/g, "_");
  const tmpJpeg = join(tmpDir, safeName.replace(/\.heic$/i, ".jpg").replace(/\.heif$/i, ".jpg"));
  
  const relInput = relative(PROJECT_ROOT, heicPath).replace(/\//g, "\\");
  const relOutput = relative(PROJECT_ROOT, tmpJpeg).replace(/\//g, "\\");
  const cmd = `ffmpeg -y -i "${relInput}" -frames:v 1 -update 1 -q:v 2 "${relOutput}"`;
  
  try {
    console.log(`    [Exec] ${cmd}`);
    execSync(cmd, { encoding: "utf8", timeout: 30000, stdio: "pipe" });
    return tmpJpeg;
  } catch (err) {
    if (existsSync(tmpJpeg)) {
      console.log(`    [Notice] ffmpeg returned error but output file exists. Proceeding.`);
      return tmpJpeg;
    }
    console.error(`  ⚠ ffmpeg HEIC conversion failed for ${basename(heicPath)}: ${err.message}`);
    if (err.stdout) console.error("FFMPEG STDOUT:", err.stdout.toString());
    if (err.stderr) console.error("FFMPEG STDERR:", err.stderr.toString());
    return null;
  }
}

/**
 * Get a processable image path - converts HEIC via ffmpeg if needed.
 */
function getProcessablePath(imagePath) {
  const ext = extname(imagePath).toLowerCase();
  if (ext === ".heic" || ext === ".heif") {
    return heicToJpeg(imagePath);
  }
  return imagePath;
}

/**
 * Compute a simple average-hash (aHash) for an image buffer.
 * Returns a binary string of length HASH_SIZE * HASH_SIZE.
 */
async function computePerceptualHash(imagePath) {
  try {
    const processable = getProcessablePath(imagePath);
    if (!processable) return null;
    
    const { data } = await sharp(processable)
      .resize(HASH_SIZE, HASH_SIZE, { fit: "fill" })
      .grayscale()
      .raw()
      .toBuffer({ resolveWithObject: true });

    // Compute average pixel value
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
      sum += data[i];
    }
    const avg = sum / data.length;

    // Build hash: 1 if pixel >= avg, 0 otherwise
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

/**
 * Hamming distance between two binary hash strings.
 */
function hammingDistance(hash1, hash2) {
  if (!hash1 || !hash2 || hash1.length !== hash2.length) return Infinity;
  let dist = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) dist++;
  }
  return dist;
}

// ─── Image Quality Scoring ───────────────────────────────────

/**
 * Score an image for quality: resolution, sharpness (entropy proxy), file size.
 * Higher is better.
 */
async function scoreImage(imagePath) {
  try {
    const processable = getProcessablePath(imagePath);
    if (!processable) return { width: 0, height: 0, fileSize: 0, resScore: 0, sizeScore: 0, aspectScore: 0, totalScore: 0 };
    
    const metadata = await sharp(processable).metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;
    const fileSize = (await stat(imagePath)).size;

    // Resolution score (normalize to 4000px as max useful)
    const resScore = Math.min((width * height) / (4000 * 4000), 1.0);

    // File size as a rough proxy for detail/sharpness (larger HEIC = more detail)
    // Normalize around 5MB
    const sizeScore = Math.min(fileSize / (5 * 1024 * 1024), 1.0);

    // Aspect ratio — prefer standard portrait or landscape, penalize extreme crops
    const ratio = width / height;
    const aspectScore = (ratio >= 0.5 && ratio <= 2.0) ? 1.0 : 0.5;

    const totalScore = resScore * 0.4 + sizeScore * 0.35 + aspectScore * 0.25;

    return {
      width,
      height,
      fileSize,
      resScore,
      sizeScore,
      aspectScore,
      totalScore,
    };
  } catch (err) {
    console.error(`  ⚠ Failed to score ${basename(imagePath)}: ${err.message}`);
    return { width: 0, height: 0, fileSize: 0, resScore: 0, sizeScore: 0, aspectScore: 0, totalScore: 0 };
  }
}

// ─── Video Duration Check ────────────────────────────────────

/**
 * Get video duration in seconds using ffprobe.
 */
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

/**
 * Cluster images into product groups using perceptual hash similarity.
 * Uses single-linkage: an image joins a cluster if it's within threshold
 * of ANY existing member.
 */
function clusterImages(imageEntries) {
  const clusters = [];

  for (const entry of imageEntries) {
    if (!entry.hash) {
      // Couldn't hash — put in its own cluster
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
  console.log("║   Naini Hanvi Couture — Catalog Ingestion Pipeline   ║");
  console.log("╚═══════════════════════════════════════════════════════╝\n");

  // Ensure output directory
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    categories: [],
    products: [],
    summary: { totalProducts: 0, totalImages: 0, totalVideos: 0 },
  };

  let globalProductIndex = 0;

  for (const folder of CATEGORY_FOLDERS) {
    console.log(`\n━━━ Processing: ${folder.category} ━━━`);
    console.log(`    Path: ${folder.path}\n`);

    if (!existsSync(folder.path)) {
      console.error(`  ✗ Folder not found: ${folder.path}`);
      continue;
    }

    // Create category output dir
    const catOutputDir = join(OUTPUT_DIR, folder.category.toLowerCase().replace(/\s+/g, "-"));
    if (!existsSync(catOutputDir)) {
      await mkdir(catOutputDir, { recursive: true });
    }

    // 1. Inventory files
    const files = await readdir(folder.path);
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

    // 4. Process video durations
    console.log("  🎬 Checking video durations...");
    const videoInfo = [];
    for (const vf of videoFiles) {
      const fullPath = join(folder.path, vf);
      const duration = getVideoDuration(fullPath);
      const kept = duration >= 3 && duration <= 5;
      videoInfo.push({ file: vf, fullPath, duration, kept });
      console.log(`    ${kept ? "✓" : "✗"} ${vf}: ${duration.toFixed(1)}s ${kept ? "(kept)" : "(discarded — outside 3-5s range)"}`);
    }

    // 5. Match videos to product clusters (using frame comparison)
    // For simplicity with HEIC/MOV, we'll match by file naming proximity
    // (IMG_5810 video likely pairs with IMG_5807-5809 images)
    const keptVideos = videoInfo.filter(v => v.kept);

    // 6. Process each product cluster
    const categoryManifest = { category: folder.category, productCount: 0, products: [] };

    for (let ci = 0; ci < clusters.length; ci++) {
      globalProductIndex++;
      const cluster = clusters[ci];
      const slug = generateSlug(folder.category, globalProductIndex);
      const name = generateName(folder.category, globalProductIndex);

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
          const publicPath = `/catalog/${folder.category.toLowerCase().replace(/\s+/g, "-")}/${webpName}`;
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

      // Try to match a kept video to this cluster by filename proximity
      let matchedVideo = null;
      if (keptVideos.length > 0) {
        // Extract numeric IDs from cluster filenames
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
              // Video number should be close to or within the image number range
              if (vn >= minNum - 2 && vn <= maxNum + 2) {
                matchedVideo = vid;
                break;
              }
            }
          }
        }

        // For non-IMG-named videos (UUID names), assign to first unassigned cluster
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
          const publicVidPath = `/catalog/${folder.category.toLowerCase().replace(/\s+/g, "-")}/${vidOutName}`;
          const publicPosterPath = `/catalog/${folder.category.toLowerCase().replace(/\s+/g, "-")}/${posterName}`;
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
        price: 2000 + Math.floor(Math.random() * 3000), // Placeholder price
        mrp: undefined, // No fake discounts per spec
        inStock: true,
        isBestSeller: false,
        badge: null, // No badge per spec — client will set later
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

      manifest.products.push(product);
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

    manifest.categories.push(categoryManifest);
  }

  // Summary
  manifest.summary.totalProducts = manifest.products.length;
  manifest.summary.totalImages = manifest.products.reduce((s, p) => s + p.gallery.filter(g => g.type === "image").length, 0);
  manifest.summary.totalVideos = manifest.products.reduce((s, p) => s + p.gallery.filter(g => g.type === "video").length, 0);

  // Write manifest
  await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf8");

  console.log("\n╔═══════════════════════════════════════════════════════╗");
  console.log("║                 INGESTION COMPLETE                   ║");
  console.log("╚═══════════════════════════════════════════════════════╝");
  console.log(`\n  📦 Products: ${manifest.summary.totalProducts}`);
  console.log(`  📸 Images:   ${manifest.summary.totalImages}`);
  console.log(`  🎬 Videos:   ${manifest.summary.totalVideos}`);
  console.log(`\n  📋 Manifest: ${MANIFEST_PATH}`);
  console.log(`  📁 Output:   ${OUTPUT_DIR}`);
  console.log("\n  ⚠ REVIEW THE MANIFEST before finalizing the catalog!");
  console.log("    Check that product groupings and image selections look correct.\n");
}

main().catch(err => {
  console.error("\n✗ Pipeline failed:", err);
  process.exit(1);
});
