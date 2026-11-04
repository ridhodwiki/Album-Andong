# DESIGN.md — Andong, Berdua

## 1. Visual Identity & Atmosphere
- **Aesthetic**: Warm analog cinematic, 35mm film memory album, scrollytelling visual voyage.
- **Tone**: Jujur, hangat, reflektif, tanpa slop ornamen klise AI.

## 2. Typography
- **Headings & Display**: `Playfair Display Variable` (Serif hangat, ekspresif, elegan).
- **Body & UI**: `DM Sans Variable` (Sans bersih, highly legible pada mobile).
- **Numbers / Elevation**: `DM Sans` dengan OpenType tabular numbers (`tabular-nums font-mono-numbers`) agar stabil saat animasi hitungan ketinggian.

## 3. Palet Bab (Perjalanan Warna)
Setiap bab memiliki atmosfer pencahayaan sendiri:
- **00 Pembuka**: Background `#0F1A14` (Hening Hutan Malam), Aksen `#E8C872` (Emas Lembut), Teks `#F4F1E8`.
- **01 Sabana**: Background `#DCE8C8` (Hijau Rumput Segar), Aksen `#3E6B3A` (Hijau Daun), Teks `#1E2B1C`.
- **02 Tanpa Dokumentasi**: Background `#0A0A0A` (Pekat Malam & Tanjakan), Aksen `#888888`, Teks `#CCCCCC`.
- **03 Puncak**: Background `#BFD7E8` (Kabut & Biru Dingin Puncak), Aksen `#1F4E79`, Teks `#10233A`.
- **04 Langit Cerah**: Background `#E0F2FE` (Biru Terbuka), Aksen `#0284C7`, Teks `#0F172A`.
- **05 Sunrise**: Gradasi fajar `#FFEDD5` → `#FDBA74` → `#38BDF8`, Aksen `#C2410C`, Teks `#431407`.
- **06 Penutup / Rahasia**: Background `#1E1B4B` (Langit Bintang Puncak), Aksen `#F59E0B`, Teks `#FEF3C7`.

## 4. UI Patterns & Anti-Slop Safeguards
- Tidak ada gradient purple/blue AI generik.
- Tidak ada emoji dekoratif pada heading atau tombol.
- Tidak ada floating orbs atau bento-box template tanpa fungsi konten.
- Efek Polaroid: Cetakan berbingkai putih krem (`#fbfaf7`), tekstur kertas, bayangan lembut terarah.
- Kontras teks di atas permukaan warna selalu memenuhi rasio minimal 4.5:1 (WCAG AA).
- Navigasi: Indikator titik bab non-intrusif + elevasi mdpl di sisi viewport.

## 5. Motion Guidelines
- Menggunakan Lenis untuk smooth scrolling disinkronkan dengan GSAP ScrollTrigger.
- `prefers-reduced-motion`: Ketika aktif, matikan efek parallax, 3D/canvas partikel, dan pin scroll; ganti dengan transisi fade murni.
- Durasi animasi interaktif: 0.2s - 0.6s, kurva `power2.out` atau spring teredam.
