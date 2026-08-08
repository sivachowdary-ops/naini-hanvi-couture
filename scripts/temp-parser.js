
    const fs = require("fs");
    let code = fs.readFileSync("C:\\Users\\sivap\\OneDrive\\Documents\\Desktop\\hanvi-couture\\src\\lib\\products.ts", "utf8");
    const mockProductsIndex = code.indexOf("export const MOCK_PRODUCTS");
    if (mockProductsIndex === -1) {
      console.error("MOCK_PRODUCTS not found");
      process.exit(1);
    }
    let mockProductsCode = code.slice(mockProductsIndex);
    let bracketCount = 0;
    let endIndex = 0;
    let started = false;
    for (let i = 0; i < mockProductsCode.length; i++) {
      if (mockProductsCode[i] === '[') {
        bracketCount++;
        started = true;
      } else if (mockProductsCode[i] === ']') {
        bracketCount--;
        if (started && bracketCount === 0) {
          endIndex = i;
          break;
        }
      }
    }
    const arrayStr = mockProductsCode.slice(0, endIndex + 1).replace(/export const MOCK_PRODUCTS:\s*Product\[\]\s*=\s*/, "");
    const mockProducts = eval(arrayStr);
    console.log(JSON.stringify(mockProducts));
  