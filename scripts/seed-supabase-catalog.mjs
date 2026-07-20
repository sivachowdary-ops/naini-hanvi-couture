/**
 * Supabase Catalog Seeder
 * 
 * Reads the generated catalog manifest and inserts all products into
 * the live Supabase "products" table.
 * 
 * Usage: node scripts/seed-supabase-catalog.mjs
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";
import dotenv from "dotenv";

// Load local environment variables
dotenv.config({ path: ".env.local" });

const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = process.env;

if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.error("✗ Error: Supabase credentials not found in .env.local");
  process.exit(1);
}

const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);

const PROJECT_ROOT = process.cwd();
const MANIFEST_PATH = join(PROJECT_ROOT, "catalog-ingestion-manifest.json");

async function seed() {
  console.log("\n🚀 Seeding Supabase database with ingested catalog...");

  let manifestData;
  try {
    manifestData = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  } catch (err) {
    console.error(`✗ Failed to read manifest file: ${err.message}`);
    process.exit(1);
  }

  const { products } = manifestData;
  console.log(`📦 Found ${products.length} products to seed.`);

  // Map to Supabase table format
  const mappedProducts = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    price: p.price,
    mrp: p.mrp || null,
    in_stock: p.inStock,
    is_bestseller: p.isBestSeller,
    badge: p.badge || null,
    fabric: p.fabric || null,
    length_width: p.lengthWidth || null,
    blouse_detail: p.blouseDetail || null,
    description: p.description,
    gallery: p.gallery,
    variants: p.variants || [],
    tags: p.tags || [],
  }));

  try {
    // 1. Delete existing mock/demo products in Supabase to keep catalog clean
    console.log("🧹 Cleaning up old products in database...");
    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .neq("id", "keep-none"); // deletes all items

    if (deleteError) {
      console.warn("⚠️ Warning during delete phase:", deleteError.message);
    }

    // 2. Insert new products in batches
    console.log("📥 Inserting new catalog items...");
    
    // Split into batches of 10
    const batchSize = 10;
    for (let i = 0; i < mappedProducts.length; i += batchSize) {
      const batch = mappedProducts.slice(i, i + batchSize);
      const { error: insertError } = await supabase
        .from("products")
        .insert(batch);

      if (insertError) {
        throw insertError;
      }
      console.log(`   ✓ Seeded batch ${Math.floor(i / batchSize) + 1} (${batch.length} items)`);
    }

    console.log("\n🎉 Database seeding completed successfully!");
  } catch (err) {
    console.error("\n✗ Seeding failed:", err.message);
    process.exit(1);
  }
}

seed();
