# PRODUCT.md — Andong, Berdua

## 1. Product Summary
Website album digital kenangan pendakian Gunung Andong (1.726 mdpl) bersama pasangan.
Mengubah kumpulan dokumentasi foto dan video menjadi pengalaman scrollytelling yang imersif, sinematik, dan intim.

## 2. Audiens & Persona
- **Pacar**: Target utama. Menikmati kenangan berdua, mengakses bagian rahasia terkunci (`/rahasia`).
- **Teman & Publik**: Menikmati estetika dan cerita pendakian lewat tautan media sosial.
- **Pengembang & Recruiter**: Proyek portofolio teknis dan UI/UX interaktif berbasis Astro, React Island, Tailwind CSS, dan GSAP.

## 3. Surface Mode
- **Mode**: `Experience` (Pengunjung larut dalam artefak/cerita; navigasi minimalis, konten visual dan cerita memimpin sejak viewport pertama).

## 4. Struktur Halaman
- **Halaman Utama (`/`)**:
  - Bab 00: Pembuka (Hero Sinematik dengan Video / Poster Cover)
  - Bab 01: Sabana (Hamparan Ilalang & Kehangatan Berjalan)
  - Bab 02: Tanpa Dokumentasi (Jeda Gelap & Kejujuran Tanjakan Nyata)
  - Bab 03: Puncak (Pencapaian 1.726 mdpl & Titik Tertinggi)
  - Bab 04: Langit Cerah (Hamparan Biru Tanpa Cela & Canvas Efek Cahaya)
  - Bab 05: Sunrise (Gradasi Fajar Keemasan Menuju Terang)
  - Bab 06: Penutup (Kredit, Catatan Akhir, & Pintu Rahasia)
- **Halaman Pribadi (`/rahasia`)**:
  - Dilindungi dekripsi WebCrypto AES-GCM berbasis sandi pribadi.
  - Pesan khusus, foto pribadi tak terpublikasi, noindex & disallow.

## 5. Non-Goals
- Tidak ada database, backend runtime, komentar publik, atau akun login pengunjung.
- Tidak ada navbar mati atau tautan template kosong.
- Tidak ada data kebugaran/sensor fiktif (detak jantung, UV sensor buatan AI).
