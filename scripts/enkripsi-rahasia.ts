/**
 * Skrip pembuatan file terenkripsi `public/rahasia.bin`.
 * Dijalankan dengan Node 22+: `node --loader ts-node/esm scripts/enkripsi-rahasia.ts` atau via vitest/tsx/node.
 */

import { enkripsi } from "../src/lib/kripto.ts";
import fs from "node:fs/promises";
import path from "node:path";


const kontenPribadi = {
  surat: `Mungkin orang lain cuma melihat foto-foto puncak, jalur yang terjal, atau kabut yang dingin. Tapi buat aku, setiap langkah 1.726 meter ini adalah tentang caramu menoleh ke belakang untuk memastikan aku masih ada di sana.

Terima kasih sudah melangkah bersama, menepis lelah dengan tawa, dan berbagi secangkir teh di puncak dingin.`,
  penulis: "Ridho",
  tanggal: "23 September 2024",
  pesanAkhir: "Dan kalau suatu saat nanti kita lupa bagaimana cara bertahan, ingat malam ini: kita pernah sampai di puncak tertinggi bersama-sama.",
  fotos: [
    {
      image: "/foto/rahasia-cover.jpg",
      title: "Hanya Untuk Kita Berdua",
      caption: "Momen tenang saat lampu-lampu kota Magelang terlihat seperti bintang di bawah kaki kita.",
      alt: "Momen pribadi di puncak Andong"
    },
    {
      image: "/foto/sabana-01.png",
      title: "Hangat Berdua",
      caption: "Di balik jaket tebal dan dingin yang membekukan.",
      alt: "Foto pribadi kenangan mendaki bersama"
    }
  ]
};

async function main() {
  const SANDI = process.env.RAHASIA_SANDI;
  if (!SANDI?.trim()) throw new Error("RAHASIA_SANDI wajib diisi sebelum mengenkripsi.");
  const jsonStr = JSON.stringify(kontenPribadi);
  const hasilTerenkripsi = await enkripsi(jsonStr, SANDI);

  const outPath = path.resolve(process.cwd(), "public", "rahasia.bin");
  await fs.writeFile(outPath, hasilTerenkripsi, "utf-8");
  console.log("[SUKSES] Berhasil membuat public/rahasia.bin terenkripsi.");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
