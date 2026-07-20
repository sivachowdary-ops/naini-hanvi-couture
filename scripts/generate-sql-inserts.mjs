/**
 * SQL Inserts Generator
 * 
 * Reads the generated catalog-ingestion-manifest.json and outputs a
 * raw SQL insert file `supabase_insert_products.sql` containing all
 * 39 products formatted for copy-pasting directly into the Supabase SQL editor.
 * 
 * Usage: node scripts/generate-sql-inserts.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PROJECT_ROOT = process.cwd();
const MANIFEST_PATH = join(PROJECT_ROOT, "catalog-consolidated-manifest.json");
const SQL_OUTPUT_PATH = join(PROJECT_ROOT, "supabase_insert_products.sql");

function escapeSqlString(str) {
  if (str === null || str === undefined) return "NULL";
  return `'${String(str).replace(/'/g, "''")}'`;
}

function run() {
  console.log("\n Generating raw SQL insert statements from catalog manifest...");

  let manifestData;
  try {
    manifestData = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  } catch (err) {
    console.error(`✗ Failed to read manifest file: ${err.message}`);
    process.exit(1);
  }

  const { products } = manifestData;
  console.log(`📦 Found ${products.length} products to format.`);

  let sql = `-- ===================================================\n`;
  sql += `-- NAINI HANVI COUTURE - CATALOG INSERT STATEMENTS\n`;
  sql += `-- Copy and run this script in your Supabase SQL Editor\n`;
  sql += `-- ===================================================\n\n`;

  // Start with cleaning up existing items (optional, but keeps catalog clean)
  sql += `-- Clean up old products first\n`;
  sql += `DELETE FROM public.products;\n\n`;

  sql += `-- Insert new products\n`;
  sql += `INSERT INTO public.products (\n`;
  sql += `  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,\n`;
  sql += `  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags\n`;
  sql += `) VALUES \n`;

  const valueBlocks = products.map((p) => {
    const id = escapeSqlString(p.id);
    const slug = escapeSqlString(p.slug);
    const name = escapeSqlString(p.name);
    const brand = escapeSqlString(p.brand);
    const category = escapeSqlString(p.category);
    const price = p.price;
    const mrp = p.mrp ? p.mrp : "NULL";
    const inStock = p.inStock ? "true" : "false";
    const isBestseller = p.isBestSeller ? "true" : "false";
    const badge = escapeSqlString(p.badge);
    const fabric = escapeSqlString(p.fabric);
    const lengthWidth = escapeSqlString(p.lengthWidth);
    const blouseDetail = escapeSqlString(p.blouseDetail);
    const description = escapeSqlString(p.description);
    
    // Gallery and variants as JSON text
    const galleryStr = `'${JSON.stringify(p.gallery).replace(/'/g, "''")}'::jsonb`;
    const variantsStr = `'${JSON.stringify(p.variants || []).replace(/'/g, "''")}'::jsonb`;
    
    // Tags as text array
    const tagsArr = p.tags && p.tags.length > 0 
      ? `ARRAY[${p.tags.map(t => escapeSqlString(t)).join(", ")}]::text[]`
      : `'{}'::text[]`;

    return `(\n` +
      `  ${id}, ${slug}, ${name}, ${brand}, ${category}, ${price}, ${mrp}, ${inStock}, ${isBestseller},\n` +
      `  ${badge}, ${fabric}, ${lengthWidth}, ${blouseDetail}, ${description}, ${galleryStr}, ${variantsStr}, ${tagsArr}\n` +
      `)`;
  });

  sql += valueBlocks.join(",\n") + ";\n";

  writeFileSync(SQL_OUTPUT_PATH, sql, "utf8");
  console.log(`✓ successfully generated SQL statements: ${SQL_OUTPUT_PATH}`);
}

run();
