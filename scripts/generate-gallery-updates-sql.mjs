import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const ROOT = process.cwd();
const PRODUCTS_TS = join(ROOT, "src", "lib", "products.ts");

const productsTsContent = readFileSync(PRODUCTS_TS, "utf8");

// Locate MOCK_PRODUCTS array
const mockProductsStart = productsTsContent.indexOf("export const MOCK_PRODUCTS: Product[] = [");
const mockProductsEnd = productsTsContent.indexOf("// Helper to map DB columns to TS types");

if (mockProductsStart === -1 || mockProductsEnd === -1) {
  console.error("✗ Failed to locate mock products section");
  process.exit(1);
}

const mockArrayString = productsTsContent.substring(mockProductsStart + "export const MOCK_PRODUCTS: Product[] = ".length, mockProductsEnd).trim().replace(/;$/, "");
const products = JSON.parse(mockArrayString);

let sqlStatements = `-- ==========================================
-- SQL to update products gallery with videos
-- Run this in your Supabase SQL Editor
-- ==========================================\n\n`;

for (const p of products) {
  const videoItem = p.gallery.find(item => item.type === "video");
  if (videoItem) {
    const galleryJson = JSON.stringify(p.gallery);
    // Double escape single quotes for SQL
    const safeGalleryJson = galleryJson.replace(/'/g, "''");
    sqlStatements += `UPDATE public.products \nSET gallery = '${safeGalleryJson}'::jsonb \nWHERE slug = '${p.slug}';\n\n`;
  }
}

writeFileSync(join(ROOT, "update-videos-gallery.sql"), sqlStatements, "utf8");
console.log("✓ Generated update-videos-gallery.sql successfully!");
