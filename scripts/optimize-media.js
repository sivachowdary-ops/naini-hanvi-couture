const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const RAW_DIR = path.join(__dirname, '../raw_assets');
const OUT_DIR = path.join(__dirname, '../public/assets');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function optimizeImage(inputFile, outputFile) {
  return sharp(inputFile)
    .webp({ quality: 80 })
    .toFile(outputFile)
    .then(() => console.log(`Optimized image: ${path.basename(outputFile)}`))
    .catch((err) => console.error(`Error processing image ${inputFile}:`, err));
}

async function processAll() {
  if (!fs.existsSync(RAW_DIR)) {
    console.error(`Directory not found: ${RAW_DIR}`);
    return;
  }
  const files = fs.readdirSync(RAW_DIR);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file, ext);
    const inputPath = path.join(RAW_DIR, file);

    if (ext === '.jpeg' || ext === '.jpg' || ext === '.png') {
      const outputPath = path.join(OUT_DIR, `${basename}.webp`);
      await optimizeImage(inputPath, outputPath);
    } else if (ext === '.mp4' || ext === '.mov') {
      console.log(`Processing video: ${file}... this may take a while.`);
      const mp4Output = path.join(OUT_DIR, `${basename}.mp4`);
      
      const processMp4 = new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .outputOptions(['-vcodec libx264', '-crf 28', '-preset veryfast', '-movflags +faststart', '-acodec aac', '-b:a 128k'])
          .save(mp4Output)
          .on('end', () => resolve())
          .on('error', (err) => reject(err));
      });

      const createThumb = new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .screenshots({ timestamps: ['00:00:00.500'], filename: `${basename}-thumb.png`, folder: OUT_DIR })
          .on('end', async () => {
             const pngPath = path.join(OUT_DIR, `${basename}-thumb.png`);
             if (fs.existsSync(pngPath)) {
               await sharp(pngPath).webp({ quality: 80 }).toFile(path.join(OUT_DIR, `${basename}-thumb.webp`));
               fs.unlinkSync(pngPath);
             }
             resolve();
          })
          .on('error', (err) => reject(err));
      });

      await Promise.all([processMp4, createThumb]);
      console.log(`Finished ${file}`);
    }
  }
}

processAll().catch(console.error);
