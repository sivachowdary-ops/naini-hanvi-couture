/**
 * Analyze new products and group by consecutive IMG numbers.
 * This helps determine which raw products are actually the same saree.
 */
import { readFileSync } from "fs";
import { join } from "path";

const manifest = JSON.parse(readFileSync(join(process.cwd(), "catalog-ingestion-manifest-new.json"), "utf8"));

const categories = {};
for (const p of manifest.products) {
  if (!categories[p.category]) categories[p.category] = [];
  // Extract IMG number from sourceFiles
  const imgNums = p.sourceFiles.map(f => {
    const m = f.match(/IMG_(\d+)/i);
    return m ? parseInt(m[1]) : 0;
  }).filter(n => n > 0);
  categories[p.category].push({ id: p.id, name: p.name, imgNums, sourceFiles: p.sourceFiles });
}

const GAP_THRESHOLD = 2; // gap of 2+ between IMG numbers means different product

for (const [cat, products] of Object.entries(categories)) {
  console.log(`\n═══ ${cat} ═══`);
  
  // Sort all products by their first IMG number
  products.sort((a, b) => (a.imgNums[0] || 0) - (b.imgNums[0] || 0));
  
  // Group consecutive IMG numbers
  const groups = [];
  let currentGroup = [products[0]];
  
  for (let i = 1; i < products.length; i++) {
    const prevMax = Math.max(...currentGroup[currentGroup.length - 1].imgNums);
    const currMin = Math.min(...products[i].imgNums);
    
    if (currMin - prevMax < GAP_THRESHOLD) {
      // Same product group
      currentGroup.push(products[i]);
    } else {
      // New product group
      groups.push(currentGroup);
      currentGroup = [products[i]];
    }
  }
  groups.push(currentGroup);
  
  console.log(`  Raw products: ${products.length} → Grouped into: ${groups.length} products`);
  
  let prodIdx = 0;
  for (const group of groups) {
    prodIdx++;
    const allIds = group.map(p => p.id);
    const allFiles = group.flatMap(p => p.sourceFiles);
    const allNums = group.flatMap(p => p.imgNums).sort((a, b) => a - b);
    console.log(`  Product ${String(prodIdx).padStart(2)}: [${allIds.join(", ")}] → IMG ${allNums.join(", ")} (${allFiles.length} images)`);
  }
}
