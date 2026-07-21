/**
 * Catalog Manifest Consolidator
 * 
 * Consolidates the 39 ingested products into 15 grouped products based on the
 * client's instructions.
 * 
 * Usage: node scripts/consolidate-manifest.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PROJECT_ROOT = process.cwd();
const RAW_MANIFEST_PATH = join(PROJECT_ROOT, "catalog-ingestion-manifest.json");
const CONSOLIDATED_PATH = join(PROJECT_ROOT, "catalog-consolidated-manifest.json");

// Define groups
const groups = [
  // Malai Cottons
  {
    newId: "prod-1",
    name: "Malai Cottons Saree 01",
    slug: "malai-cottons-saree-01",
    category: "Malai Cottons",
    oldIds: ["prod-1", "prod-2", "prod-3", "prod-4", "prod-5"],
    maxImages: 2
  },
  {
    newId: "prod-2",
    name: "Malai Cottons Saree 02",
    slug: "malai-cottons-saree-02",
    category: "Malai Cottons",
    oldIds: ["prod-6", "prod-7"],
    maxImages: 2
  },
  {
    newId: "prod-3",
    name: "Malai Cottons Saree 03",
    slug: "malai-cottons-saree-03",
    category: "Malai Cottons",
    oldIds: ["prod-8", "prod-9"],
    maxImages: 2
  },
  {
    newId: "prod-4",
    name: "Malai Cottons Saree 04",
    slug: "malai-cottons-saree-04",
    category: "Malai Cottons",
    oldIds: ["prod-10", "prod-11"],
    maxImages: 2
  },
  {
    newId: "prod-5",
    name: "Malai Cottons Saree 05",
    slug: "malai-cottons-saree-05",
    category: "Malai Cottons",
    oldIds: ["prod-12", "prod-13"],
    maxImages: 2
  },
  {
    newId: "prod-6",
    name: "Malai Cottons Saree 06",
    slug: "malai-cottons-saree-06",
    category: "Malai Cottons",
    oldIds: ["prod-14", "prod-15"],
    maxImages: 2
  },
  {
    newId: "prod-7",
    name: "Malai Cottons Saree 07",
    slug: "malai-cottons-saree-07",
    category: "Malai Cottons",
    oldIds: ["prod-16", "prod-17"],
    maxImages: 2
  },
  {
    newId: "prod-8",
    name: "Malai Cottons Saree 08",
    slug: "malai-cottons-saree-08",
    category: "Malai Cottons",
    oldIds: ["prod-18", "prod-19"],
    maxImages: 2
  },
  // Muslin Sequence
  {
    newId: "prod-9",
    name: "Muslin Sequence Saree 01",
    slug: "muslin-sequence-saree-01",
    category: "Muslin Sequence",
    oldIds: ["prod-20", "prod-21", "prod-22"],
    maxImages: 2
  },
  {
    newId: "prod-10",
    name: "Muslin Sequence Saree 02",
    slug: "muslin-sequence-saree-02",
    category: "Muslin Sequence",
    oldIds: ["prod-23", "prod-24", "prod-25"],
    maxImages: 2
  },
  {
    newId: "prod-11",
    name: "Muslin Sequence Saree 03",
    slug: "muslin-sequence-saree-03",
    category: "Muslin Sequence",
    oldIds: ["prod-26", "prod-27", "prod-28"],
    maxImages: 2
  },
  // Silk Kota
  {
    newId: "prod-12",
    name: "Silk Kota Saree 01",
    slug: "silk-kota-saree-01",
    category: "Silk Kota",
    oldIds: ["prod-29", "prod-30", "prod-31"],
    maxImages: 2
  },
  {
    newId: "prod-13",
    name: "Silk Kota Saree 02",
    slug: "silk-kota-saree-02",
    category: "Silk Kota",
    oldIds: ["prod-32", "prod-33", "prod-34"],
    maxImages: 2
  },
  {
    newId: "prod-14",
    name: "Silk Kota Saree 03",
    slug: "silk-kota-saree-03",
    category: "Silk Kota",
    oldIds: ["prod-35", "prod-36", "prod-37"],
    maxImages: 2
  },
  {
    newId: "prod-15",
    name: "Silk Kota Saree 04",
    slug: "silk-kota-saree-04",
    category: "Silk Kota",
    oldIds: ["prod-38", "prod-39"],
    maxImages: 2
  }
];

// Explicitly assign videos to groups based on user request
const explicitVideoMapping = {
  "malai-cottons-saree-02": {
    src: "/catalog/malai-cottons/malai-cottons-saree-03-video.mp4",
    thumbnail: "/catalog/malai-cottons/malai-cottons-saree-03-poster.webp"
  },
  "malai-cottons-saree-04": {
    src: "/catalog/malai-cottons/malai-cottons-saree-04-video.mp4",
    thumbnail: "/catalog/malai-cottons/malai-cottons-saree-04-poster.webp"
  },
  "malai-cottons-saree-05": {
    src: "/catalog/malai-cottons/malai-cottons-saree-05-video.mp4",
    thumbnail: "/catalog/malai-cottons/malai-cottons-saree-05-poster.webp"
  },
  "malai-cottons-saree-06": {
    src: "/catalog/malai-cottons/malai-cottons-saree-02-video.mp4",
    thumbnail: "/catalog/malai-cottons/malai-cottons-saree-02-poster.webp"
  }
};

function run() {
  console.log("\n🔄 Consolidating catalog manifest...");

  let manifestData;
  try {
    manifestData = JSON.parse(readFileSync(RAW_MANIFEST_PATH, "utf8"));
  } catch (err) {
    console.error(`✗ Failed to read manifest file: ${err.message}`);
    process.exit(1);
  }

  const oldProducts = manifestData.products;
  const newProducts = [];

  for (const group of groups) {
    // Find all matching old products
    const matchedProducts = oldProducts.filter(p => group.oldIds.includes(p.id));
    if (matchedProducts.length === 0) {
      console.warn(`⚠️ Warning: No products found for group ${group.name} (${group.oldIds.join(",")})`);
      continue;
    }

    // Base properties from the first matched product
    const base = matchedProducts[0];

    // Combine gallery items (images only)
    const combinedGallery = [];
    const imagesOnly = [];

    for (const p of matchedProducts) {
      for (const item of p.gallery) {
        if (item.type === "image") {
          imagesOnly.push(item);
        }
      }
    }

    // De-duplicate images based on src
    const uniqueImages = [];
    const imageSrcs = new Set();
    for (const img of imagesOnly) {
      if (!imageSrcs.has(img.src)) {
        imageSrcs.add(img.src);
        uniqueImages.push(img);
      }
    }

    // Select up to maxImages
    const selectedImages = uniqueImages.slice(0, group.maxImages);

    // Update their image alt texts to use the new name
    selectedImages.forEach((img, idx) => {
      img.alt = `${group.name} - View ${idx + 1}`;
    });

    // Assemble gallery: Images first
    combinedGallery.push(...selectedImages);
    
    // Explicit Video Assignment
    let matchedVideo = null;
    if (explicitVideoMapping[group.slug]) {
      const vidInfo = explicitVideoMapping[group.slug];
      combinedGallery.push({
        type: "video",
        src: vidInfo.src,
        thumbnail: vidInfo.thumbnail,
        alt: `${group.name} - Video`
      });
      matchedVideo = vidInfo.src;
    }

    // Combine source files metadata
    const sourceFiles = [];
    const selectionReason = [];

    for (const p of matchedProducts) {
      if (p.sourceFiles) sourceFiles.push(...p.sourceFiles);
      if (p.selectionReason) selectionReason.push(...p.selectionReason);
    }

    // Create consolidated product
    const consolidatedProduct = {
      id: group.newId,
      slug: group.slug,
      name: group.name,
      brand: "Naini Hanvi Couture",
      category: group.category,
      price: base.price,
      inStock: base.inStock,
      isBestSeller: matchedProducts.some(p => p.isBestSeller),
      badge: base.badge,
      fabric: base.fabric,
      lengthWidth: base.lengthWidth,
      blouseDetail: base.blouseDetail,
      description: `A beautiful ${group.category} saree from Naini Hanvi Couture's curated collection. Perfect for both casual and festive occasions.`,
      gallery: combinedGallery,
      variants: [],
      tags: base.tags || [],
      sourceFiles: [...new Set(sourceFiles)],
      selectionReason: [...new Set(selectionReason)],
      matchedVideo: matchedVideo
    };

    newProducts.push(consolidatedProduct);
  }

  // Update manifest structure
  const consolidated = {
    generatedAt: new Date().toISOString(),
    consolidatedFrom: RAW_MANIFEST_PATH,
    categories: manifestData.categories,
    products: newProducts,
  };

  writeFileSync(CONSOLIDATED_PATH, JSON.stringify(consolidated, null, 2), "utf8");
  console.log(`✓ successfully consolidated into ${newProducts.length} products in ${CONSOLIDATED_PATH}`);
}

run();
