/**
 * Update Local Mock Products
 * 
 * Reads the generated catalog manifest and writes the products array
 * directly into src/lib/products.ts, replacing the old 2 mock products
 * with the new 39 sarees.
 * 
 * Usage: node scripts/update-local-mock-products.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const PROJECT_ROOT = process.cwd();
const MANIFEST_PATH = join(PROJECT_ROOT, "catalog-consolidated-manifest.json");
const PRODUCTS_TS_PATH = join(PROJECT_ROOT, "src", "lib", "products.ts");

function run() {
  console.log("\n📝 Updating local mock products in src/lib/products.ts...");

  let manifestData;
  try {
    manifestData = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  } catch (err) {
    console.error(`✗ Failed to read manifest file: ${err.message}`);
    process.exit(1);
  }

  const { products } = manifestData;

  // Read existing products.ts content
  let content = readFileSync(PRODUCTS_TS_PATH, "utf8");

  // Format products array as TS code
  // We need to keep type safety
  const formattedProducts = JSON.stringify(products, null, 2);

  // We find where MOCK_PRODUCTS is declared and replace it
  const mockProductsStartIdx = content.indexOf("export const MOCK_PRODUCTS: Product[] = [");
  if (mockProductsStartIdx === -1) {
    console.error("✗ Error: Could not locate MOCK_PRODUCTS definition in products.ts");
    process.exit(1);
  }

  // Find the closing bracket of MOCK_PRODUCTS array
  // Since we know the file ends after the MOCK_PRODUCTS declaration or has functions after,
  // let's isolate the declaration.
  // A safer way is to split by the comment or declaration, and rewrite the file structure.
  
  const header = content.substring(0, mockProductsStartIdx);
  const footerStartIdx = content.indexOf("// Helper to map DB columns to TS types");
  if (footerStartIdx === -1) {
    console.error("✗ Error: Could not locate mapDbProductToProduct definition in products.ts");
    process.exit(1);
  }
  
  const footer = content.substring(footerStartIdx);

  // Re-assemble content
  const newContent = `${header}export const MOCK_PRODUCTS: Product[] = ${formattedProducts};\n\n${footer}`;

  writeFileSync(PRODUCTS_TS_PATH, newContent, "utf8");
  console.log(`✓ successfully updated ${products.length} products in src/lib/products.ts`);
}

run();
