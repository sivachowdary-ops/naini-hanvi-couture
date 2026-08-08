import { readdirSync, statSync, writeFileSync, unlinkSync, renameSync } from "fs";
import { join, extname } from "path";
import { execSync } from "child_process";

const CATALOG_DIR = join(process.cwd(), "public", "catalog");

function getWebpFiles(dir, filesList = []) {
  const files = readdirSync(dir);
  for (const file of files) {
    const filePath = join(dir, file);
    if (statSync(filePath).isDirectory()) {
      getWebpFiles(filePath, filesList);
    } else if (extname(file).toLowerCase() === ".webp") {
      filesList.push(filePath);
    }
  }
  return filesList;
}

function run() {
  console.log("🔍 Scanning for WebP files in public/catalog/...");
  const webpFiles = getWebpFiles(CATALOG_DIR);
  console.log(`📦 Found ${webpFiles.length} WebP files to optimize.`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let optimizedCount = 0;

  for (const file of webpFiles) {
    const originalSize = statSync(file).size;
    totalOriginalSize += originalSize;

    // Skip if it's already small (under 150KB) to save time
    if (originalSize < 150 * 1024) {
      totalOptimizedSize += originalSize;
      continue;
    }

    const tempFile = file.replace(".webp", "_temp_opt.webp");
    
    try {
      // Compress with ffmpeg: max width 800px, quality 75
      execSync(`ffmpeg -y -i "${file}" -vf "scale='min(800,iw)':-2" -q:v 75 "${tempFile}"`, { stdio: "ignore" });
      
      const newSize = statSync(tempFile).size;
      
      // Only keep the new file if it actually saved space
      if (newSize < originalSize) {
        unlinkSync(file);
        renameSync(tempFile, file);
        totalOptimizedSize += newSize;
        optimizedCount++;
        const savedPercent = Math.round(((originalSize - newSize) / originalSize) * 100);
        console.log(`✓ Optimized ${file.split(/[\\/]/).pop()}: ${Math.round(originalSize / 1024)}KB → ${Math.round(newSize / 1024)}KB (${savedPercent}% saved)`);
      } else {
        unlinkSync(tempFile);
        totalOptimizedSize += originalSize;
      }
    } catch (err) {
      console.error(`✗ Failed to optimize ${file}: ${err.message}`);
      if (readdirSync(join(file, "..")).includes(tempFile.split(/[\\/]/).pop())) {
        unlinkSync(tempFile);
      }
      totalOptimizedSize += originalSize;
    }
  }

  const savedMb = Math.round((totalOriginalSize - totalOptimizedSize) / (1024 * 1024) * 10) / 10;
  console.log(`\n🎉 Done! Optimized ${optimizedCount} images.`);
  console.log(`📊 Total Size: ${Math.round(totalOriginalSize / (1024 * 1024) * 10) / 10} MB → ${Math.round(totalOptimizedSize / (1024 * 1024) * 10) / 10} MB (${savedMb} MB saved)`);
}

run();
