/**
 * Generate separate SQL files for each category.
 * Usage: node scripts/generate-sql-per-category.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PROJECT_ROOT = process.cwd();
const manifest = JSON.parse(readFileSync(join(PROJECT_ROOT, "catalog-consolidated-manifest.json"), "utf8"));

function escapeSql(str) {
  if (str === null || str === undefined) return "NULL";
  return `'${String(str).replace(/'/g, "''")}'`;
}

// Group products by category
const categories = {};
for (const p of manifest.products) {
  if (!categories[p.category]) categories[p.category] = [];
  categories[p.category].push(p);
}

for (const [cat, products] of Object.entries(categories)) {
  const catSlug = cat.toLowerCase().replace(/\s+/g, "-");
  
  let sql = `-- ===================================================\n`;
  sql += `-- ${cat.toUpperCase()} — ${products.length} PRODUCTS\n`;
  sql += `-- Run this in your Supabase SQL Editor\n`;
  sql += `-- ===================================================\n\n`;
  
  // Delete existing products for this category first
  sql += `-- Remove existing ${cat} products (if any)\n`;
  sql += `DELETE FROM public.products WHERE category = ${escapeSql(cat)};\n\n`;
  
  sql += `-- Insert ${cat} products\n`;
  sql += `INSERT INTO public.products (\n`;
  sql += `  id, slug, name, brand, category, price, mrp, in_stock, is_bestseller,\n`;
  sql += `  badge, fabric, length_width, blouse_detail, description, gallery, variants, tags\n`;
  sql += `) VALUES \n`;

  const valueBlocks = products.map((p) => {
    const id = escapeSql(p.id);
    const slug = escapeSql(p.slug);
    const name = escapeSql(p.name);
    const brand = escapeSql(p.brand);
    const category = escapeSql(p.category);
    const price = p.price;
    const mrp = p.mrp ? p.mrp : "NULL";
    const inStock = p.inStock ? "true" : "false";
    const isBestseller = p.isBestSeller ? "true" : "false";
    const badge = escapeSql(p.badge);
    const fabric = escapeSql(p.fabric);
    const lengthWidth = escapeSql(p.lengthWidth);
    const blouseDetail = escapeSql(p.blouseDetail);
    const description = escapeSql(p.description);
    
    const galleryStr = `'${JSON.stringify(p.gallery).replace(/'/g, "''")}'::jsonb`;
    const variantsStr = `'${JSON.stringify(p.variants || []).replace(/'/g, "''")}'::jsonb`;
    
    const tagsArr = p.tags && p.tags.length > 0 
      ? `ARRAY[${p.tags.map(t => escapeSql(t)).join(", ")}]::text[]`
      : `'{}'::text[]`;

    return `(\n` +
      `  ${id}, ${slug}, ${name}, ${brand}, ${category}, ${price}, ${mrp}, ${inStock}, ${isBestseller},\n` +
      `  ${badge}, ${fabric}, ${lengthWidth}, ${blouseDetail}, ${description}, ${galleryStr}, ${variantsStr}, ${tagsArr}\n` +
      `)`;
  });

  sql += valueBlocks.join(",\n") + ";\n";

  const filename = `sql-${catSlug}.sql`;
  writeFileSync(join(PROJECT_ROOT, filename), sql, "utf8");
  console.log(`✓ ${filename} — ${products.length} products`);
}

console.log(`\nDone! Generated ${Object.keys(categories).length} SQL files.`);
