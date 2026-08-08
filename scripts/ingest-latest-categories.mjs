import sharp from "sharp";
import { readdir, stat, mkdir, writeFile, readFile } from "fs/promises";
import { join, extname, basename, relative } from "path";
import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";

const PROJECT_ROOT = process.cwd();
const OUTPUT_DIR = join(PROJECT_ROOT, "public", "catalog");
const CONSOLIDATED_MANIFEST_PATH = join(PROJECT_ROOT, "catalog-consolidated-manifest.json");

// Define product mappings explicitly for absolute control and correctness
const PENDING_PRODUCTS = [
  {
    id: "prod-43",
    slug: "matka-silk-saree-01",
    name: "Matka Silk Saree 01",
    category: "Matka Silk",
    fabric: "Matka Silk",
    price: 3250,
    description: "A premium Matka Silk saree featuring rich woven texture with traditional motifs and a contrasting border. Exquisite handloom quality from Naini Hanvi Couture.",
    sourceFiles: [
      join("Matka silk-20260808T064403Z-1-001", "Matka silk", "IMG_6221.HEIC"),
      join("Matka silk-20260808T064403Z-1-001", "Matka silk", "IMG_6222.HEIC")
    ]
  },
  {
    id: "prod-44",
    slug: "matka-silk-saree-02",
    name: "Matka Silk Saree 02",
    category: "Matka Silk",
    fabric: "Matka Silk",
    price: 3450,
    description: "An elegant Matka Silk saree featuring a beautifully textured body and intricate borders. Lightweight, comfortable, and perfect for ethnic occasions.",
    sourceFiles: [
      join("Matka silk-20260808T064403Z-1-001", "Matka silk", "IMG_6223.HEIC")
    ]
  },
  {
    id: "prod-45",
    slug: "pocket-sequins-mulberry-saree-01",
    name: "Pocket Sequins Mulberry Saree 01",
    category: "Pocket Sequins Mulberry",
    fabric: "Pocket Sequins Mulberry",
    price: 4250,
    description: "A stunning yellow Pocket Sequins Mulberry saree with delicate sequin embellishments. Offers a beautiful drape and contemporary appeal.",
    sourceFiles: [
      join("Pocket sequins mulberry -20260808T064404Z-1-001", "Pocket sequins mulberry", "IMG_6216.HEIC"),
      join("Pocket sequins mulberry -20260808T064404Z-1-001", "Pocket sequins mulberry", "IMG_6217.HEIC"),
      join("Pocket sequins mulberry -20260808T064404Z-1-001", "Pocket sequins mulberry", "IMG_6218.HEIC")
    ]
  },
  {
    id: "prod-46",
    slug: "pocket-sequins-mulberry-saree-02",
    name: "Pocket Sequins Mulberry Saree 02",
    category: "Pocket Sequins Mulberry",
    fabric: "Pocket Sequins Mulberry",
    price: 4500,
    description: "An attractive green Pocket Sequins Mulberry saree adorned with shimmering sequins in neat lines. Ideal for evening wear and special celebrations.",
    sourceFiles: [
      join("Pocket sequins mulberry -20260808T064404Z-1-001", "Pocket sequins mulberry", "IMG_6219.HEIC"),
      join("Pocket sequins mulberry -20260808T064404Z-1-001", "Pocket sequins mulberry", "IMG_6220.HEIC")
    ]
  }
];

function heicToJpeg(heicPath) {
  const tmpDir = join(OUTPUT_DIR, "_tmp");
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

async function run() {
  console.log("🚀 Starting Ingestion of Matka Silk and Pocket Sequins Mulberry...");

  // Load existing consolidated manifest
  let consolidatedManifest;
  try {
    consolidatedManifest = JSON.parse(await readFile(CONSOLIDATED_MANIFEST_PATH, "utf8"));
  } catch (err) {
    console.error(`✗ Failed to read consolidated manifest: ${err.message}`);
    process.exit(1);
  }

  const newProducts = [];

  for (const prod of PENDING_PRODUCTS) {
    console.log(`\n📦 Processing: ${prod.name} (${prod.id})`);
    
    // Create output category directory
    const catSlug = prod.category.toLowerCase().replace(/\s+/g, "-");
    const catOutputDir = join(OUTPUT_DIR, catSlug);
    if (!existsSync(catOutputDir)) {
      mkdirSync(catOutputDir, { recursive: true });
    }

    const gallery = [];
    
    for (let i = 0; i < prod.sourceFiles.length; i++) {
      const srcFile = join(PROJECT_ROOT, prod.sourceFiles[i]);
      if (!existsSync(srcFile)) {
        console.error(`  ✗ Source file not found: ${srcFile}`);
        continue;
      }

      console.log(`  Converting HEIC: ${basename(srcFile)}...`);
      const jpegPath = heicToJpeg(srcFile);
      if (!jpegPath) {
        console.error(`  ✗ HEIC to JPEG conversion failed for ${basename(srcFile)}`);
        continue;
      }

      const outName = `${prod.slug}-img${i + 1}.webp`;
      const outPath = join(catOutputDir, outName);
      const publicPath = `/catalog/${catSlug}/${outName}`;

      console.log(`  Compressing WebP: ${outName}...`);
      await sharp(jpegPath)
        .resize(1600, null, { withoutEnlargement: true })
        .toColorspace('srgb')
        .withMetadata({ icc: 'srgb' })
        .webp({ quality: 80, effort: 6, smartSubsample: true })
        .toFile(outPath);

      const stats = await stat(outPath);
      console.log(`  ✓ Compressed WebP: ${outName} (${(stats.size / 1024).toFixed(1)} KB)`);

      gallery.push({
        type: "image",
        src: publicPath,
        thumbnail: publicPath,
        alt: `${prod.name} - View ${i + 1}`
      });
    }

    // Build the final product object matching database format
    const productRecord = {
      id: prod.id,
      slug: prod.slug,
      name: prod.name,
      brand: "Naini Hanvi Couture",
      category: prod.category,
      price: prod.price,
      inStock: true,
      isBestSeller: false,
      badge: null,
      fabric: prod.fabric,
      lengthWidth: "5.5 meters, 1.1 meters width",
      blouseDetail: "Unstitched blouse piece included (0.8m)",
      description: prod.description,
      gallery: gallery,
      variants: [],
      tags: [],
      sourceFiles: prod.sourceFiles.map(f => basename(f)),
      selectionReason: prod.sourceFiles.map(f => `${basename(f)}: converted to sRGB WebP`),
      matchedVideo: null
    };

    newProducts.push(productRecord);
  }

  // Update manifest categories metadata
  for (const prod of PENDING_PRODUCTS) {
    let catEntry = consolidatedManifest.categories.find(c => c.category === prod.category);
    if (!catEntry) {
      catEntry = {
        category: prod.category,
        productCount: 0,
        products: []
      };
      consolidatedManifest.categories.push(catEntry);
    }

    catEntry.productCount++;
    catEntry.products.push({
      slug: prod.slug,
      name: prod.name,
      imageCount: prod.sourceFiles.length,
      selectedImages: prod.sourceFiles.map(f => basename(f)),
      matchedVideo: null,
      galleryItemCount: prod.sourceFiles.length
    });
  }

  // Append new products to manifest
  consolidatedManifest.products = [...consolidatedManifest.products, ...newProducts];
  consolidatedManifest.generatedAt = new Date().toISOString();

  // Write updated manifest back to disk
  await writeFile(CONSOLIDATED_MANIFEST_PATH, JSON.stringify(consolidatedManifest, null, 2), "utf8");
  console.log(`\n✓ Consolidated manifest updated with ${newProducts.length} new products!`);

  // Run downstream updates
  console.log("\n🔄 Running downstream updates...");
  try {
    execSync("node scripts/update-local-mock-products.mjs", { stdio: "inherit" });
    execSync("node scripts/generate-sql-inserts.mjs", { stdio: "inherit" });
    console.log("✓ Downstream updates completed successfully!");
  } catch (err) {
    console.error(`✗ Downstream updates failed: ${err.message}`);
  }
}

run();
