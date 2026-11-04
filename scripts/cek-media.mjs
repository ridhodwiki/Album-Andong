import fs from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

async function main() {
  const jsonPath = path.resolve("./src/data/media.json");
  const content = await fs.readFile(jsonPath, "utf-8");
  const babList = JSON.parse(content);

  console.log("\n=======================================================");
  console.log("   STATUS KESIAPAN MEDIA — ALBUM KENANGAN GUNUNG ANDONG");
  console.log("=======================================================\n");

  let totalItem = 0;
  let totalPlaceholder = 0;
  let totalAsli = 0;
  let missingFiles = [];

  for (const bab of babList) {
    console.log(`[Bab ${bab.nomor}] ${bab.nama} (${bab.elevasi || '-'})`);
    console.log(`  Suasana: ${bab.suasana || '-'}`);
    console.log(`  Kutipan: "${bab.kutipan || '-'}"`);
    console.log(`  Jumlah Media: ${bab.items.length} item`);

    for (const it of bab.items) {
      totalItem++;
      if (it.placeholder) totalPlaceholder++;
      else totalAsli++;

      // Check if file exists in public/
      const diskPath = path.resolve("./public", it.berkas.replace(/^\//, ""));
      if (!existsSync(diskPath)) {
        missingFiles.push({ id: it.id, berkas: it.berkas, bab: bab.nama });
      }
    }
    console.log("");
  }

  console.log("-------------------------------------------------------");
  console.log(`Total Bab: ${babList.length}`);
  console.log(`Total Item Media: ${totalItem}`);
  console.log(`- Item Masih Placeholder AI : ${totalPlaceholder} item`);
  console.log(`- Item Foto Asli            : ${totalAsli} item`);

  if (missingFiles.length > 0) {
    console.log("\n[PERINGATAN] File berikut tercatat di JSON tapi belum ada di public/:");
    for (const m of missingFiles) {
      console.log(`  - [${m.bab}] ${m.id} -> ${m.berkas}`);
    }
  } else {
    console.log("\n✓ Semua file media yang terdaftar ada di folder public/foto/.");
  }

  if (totalPlaceholder > 0) {
    console.log(`\n[PETUNJUK RILIS] Sebelum dirilis ke publik / pacar, gantilah foto placeholder dengan foto asli:`);
    console.log(`  1. Masukkan foto kamera asli ke folder "foto-asli/"`);
    console.log(`  2. Jalankan "node scripts/siapkan-foto.mjs" (otomatis buang EXIF GPS)`);
    console.log(`  3. Ubah "placeholder: false" pada item terkait di "src/data/media.json".\n`);
  } else {
    console.log("\n★ SELAMAT! Semua media sudah 100% menggunakan foto asli dan siap dipublikasikan.\n");
  }
}

main().catch(console.error);
