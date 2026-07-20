/**
 * Catalog Manifest Consolidator
 * 
 * Reads the RAW catalog-ingestion-manifest.json and writes a consolidated
 * version to catalog-consolidated-manifest.json.
 * 
 * Key changes from raw:
 *   - Moves video from Saree 01 to Saree 05 (as per client instruction)
 *   - Renames categories for display friendliness
 *   - NEVER overwrites the raw manifest
 * 
 * Usage: node scripts/consolidate-manifest.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PROJECT_ROOT = process.cwd();
const RAW_MANIFEST_PATH = join(PROJECT_ROOT, "catalog-ingestion-manifest.json");
const CONSOLIDATED_PATH = join(PROJECT_ROOT, "catalog-consolidated-manifest.json");

// Display-friendly category names
const CATEGORY_DISPLAY = {
  "Malai Cottons": "Malai Cottons",
  "Muslin Sequence": "Muslin Sequence",
  "Silk Kota": "Silk Kota",
};

function run() {
  console.log("\n🔄 Consolidating catalog manifest...");
  console.log(`   Reading from: ${RAW_MANIFEST_PATH}`);
  console.log(`   Writing to:   ${CONSOLIDATED_PATH}`);

  let manifestData;
  try {
    manifestData = JSON.parse(readFileSync(RAW_MANIFEST_PATH, "utf8"));
  } catch (err) {
    console.error(`✗ Failed to read raw manifest: ${err.message}`);
    process.exit(1);
  }

  const rawProducts = manifestData.products;
  if (!rawProducts || rawProducts.length === 0) {
    console.error("✗ No products found in raw manifest");
    process.exit(1);
  }

  console.log(`   Found ${rawProducts.length} raw products`);

  // Deep clone so we don't mutate the original
  const products = JSON.parse(JSON.stringify(rawProducts));

  // === Apply client-requested changes ===

  // 1. Move video from Malai Cottons Saree 01 to Malai Cottons Saree 05
  const saree01 = products.find(p => p.slug === "malai-cottons-saree-01");
  const saree05 = products.find(p => p.slug === "malai-cottons-saree-05");

  if (saree01 && saree05) {
    // Extract video from saree 01
    const videoItem = saree01.gallery.find(g => g.type === "video");
    if (videoItem) {
      // Remove video from saree 01
      saree01.gallery = saree01.gallery.filter(g => g.type !== "video");
      saree01.matchedVideo = null;

      // Add video to saree 05 (if not already there)
      const existingVideo = saree05.gallery.find(g => g.type === "video");
      if (!existingVideo) {
        saree05.gallery.push({
          ...videoItem,
          alt: `${saree05.name} - Video`,
        });
        saree05.matchedVideo = saree01.matchedVideo || videoItem.src;
      }
      console.log(`   ✓ Moved video from Saree 01 → Saree 05`);
    }
  }

  // 2. Apply display-friendly category names
  for (const p of products) {
    if (CATEGORY_DISPLAY[p.category]) {
      p.category = CATEGORY_DISPLAY[p.category];
    }
  }

  // Build output
  const consolidated = {
    generatedAt: new Date().toISOString(),
    consolidatedFrom: RAW_MANIFEST_PATH,
    categories: manifestData.categories,
    products: products,
  };

  writeFileSync(CONSOLIDATED_PATH, JSON.stringify(consolidated, null, 2), "utf8");
  console.log(`\n✓ Successfully consolidated ${products.length} products → ${CONSOLIDATED_PATH}`);
}

run();
