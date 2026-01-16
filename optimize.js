import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'src/assets/Amitesh Maurya.png';
const outputPath = 'src/assets/Amitesh Maurya.webp';

async function optimizeImage() {
  try {
    await sharp(inputPath)
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(outputPath);
    
    console.log('✅ Image optimized successfully!');
    
    // Get file sizes
    const inputStats = fs.statSync(inputPath);
    const outputStats = fs.statSync(outputPath);
    
    console.log(`Original: ${(inputStats.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Optimized: ${(outputStats.size / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Reduced by: ${((1 - outputStats.size / inputStats.size) * 100).toFixed(1)}%`);
    
  } catch (error) {
    console.error('❌ Optimization failed:', error.message);
  }
}

optimizeImage();
