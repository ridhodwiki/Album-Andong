import sharp from "sharp";
import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const inputDir = "./foto-asli";
const outputDir = "./public/foto";

async function main() {
  if (!existsSync(inputDir)) {
    console.log(`[INFO] Folder "${inputDir}" belum ada. Membuat folder...`);
    await mkdir(inputDir, { recursive: true });
    console.log(`[PETUNJUK] Masukkan foto kamera / HP asli Anda ke dalam folder "${inputDir}" lalu jalankan skrip ini kembali.`);
    return;
  }

  await mkdir(outputDir, { recursive: true });
  const files = (await readdir(inputDir)).filter(f => /\.(jpe?g|png|webp|heic)$/i.test(f));

  if (files.length === 0) {
    console.log(`[INFO] Folder "${inputDir}" masih kosong. Tidak ada file untuk dikonversi.`);
    return;
  }

  console.log(`[PROSES] Menyiapkan ${files.length} foto: membuang metadata EXIF/GPS & mengonversi ke WebP...`);

  for (const file of files) {
    const name = path.parse(file).name;
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, `${name}.webp`);

    // Sharp strips EXIF/GPS by default unless .withMetadata() is explicitly called
    await sharp(inputPath)
      .rotate() // Apply correct orientation before stripping metadata
      .resize({ width: 2400, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath);

    // Self-check verification: verify EXIF/GPS are completely stripped
    const check = await sharp(outputPath).metadata();
    if (check.exif || check.xmp) {
      throw new Error(`[BAHAYA] Metadata privasi masih ditemukan pada: ${outputPath}`);
    }

    console.log(`✓ Bersih & tersimpan: ${outputPath}`);
  }

  console.log("[SUKSES] Semua foto selesai dikonversi tanpa metadata lokasi.");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
