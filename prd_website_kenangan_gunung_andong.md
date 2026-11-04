# PRD Website Kenangan Gunung Andong

Oct 30, 2026 · @ridho

## 1. Ringkasan Produk

Website ini adalah album digital imersif yang mengubah sekitar 80 foto dan video pendakian Gunung Andong menjadi cerita yang dijelajahi lewat scroll, penuh animasi, dan bisa dibagikan lewat satu tautan.

| Atribut | Keterangan |
| --- | --- |
| Nama kerja | Andong, Berdua (sementara, bisa diganti) |
| Jenis | Website satu halaman panjang bergaya scrollytelling, plus satu halaman pribadi |
| Pembuat | Ridho |
| Audiens | Publik, teman, dan pacar Ridho |
| Isi media | Sekitar 80 item: foto dan video |
| Bahasa | Indonesia |
| Status | Tahap perencanaan |

**Masalah yang diselesaikan.** Album di galeri HP sulit dinikmati dan tidak punya cerita. Dokumentasinya juga hanya ada di momen tertentu, yaitu puncak, sabana, langit cerah, dan sunrise, tanpa footage tracking, sehingga galeri kronologis biasa akan terasa bolong.

**Solusi.** Susun website berdasarkan tempat dan suasana, bukan perjalanan. Tiap tempat menjadi satu bab dengan animasi, caption personal, dan musik. Bagian perjalanan yang tidak terdokumentasi diisi desain (jalur yang tergambar, indikator ketinggian) dan humor ringan, bukan footage.

## 2. Tujuan dan Metrik Keberhasilan

Tujuan utamanya adalah membuat kenangan pendakian terasa seperti pengalaman yang bisa dimasuki, dan menjadi proyek portofolio yang layak dipamerkan.

**Tujuan**

1. Menyajikan seluruh media terbaik dalam empat bab bertema tempat dan satu bagian pribadi.
2. Memberi kesan sinematik lewat animasi scroll dan elemen 3D ringan.
3. Tetap ringan dan lancar di HP kelas menengah dengan koneksi seluler biasa.
4. Menjaga privasi: tanpa data lokasi (GPS) di file publik dan dengan persetujuan pacar atas foto yang tampil.
5. Menjadi proyek portofolio GitHub yang rapi dan terdokumentasi.

**Metrik keberhasilan**

| Metrik | Target | Cara mengukur |
| --- | --- | --- |
| Skor Lighthouse Performance (mobile) | 85 atau lebih | Lighthouse di Chrome DevTools |
| Largest Contentful Paint | Di bawah 2,5 detik (jaringan 4G) | Lighthouse / PageSpeed Insights |
| Berat halaman awal (sebelum scroll) | Di bawah 3 MB | Tab Network di DevTools |
| Frame rate animasi | Stabil sekitar 60 fps di desktop, 30 fps atau lebih di HP | Panel Performance di DevTools |
| Kelengkapan media | 100% item terpilih punya caption | Checklist manual |
| Respons pacar | Menyukai hasil akhir dan menyetujui foto publik | Konfirmasi langsung |

**Non-tujuan (sengaja tidak dikerjakan di versi pertama)**

- Sistem akun, login pengunjung, atau komentar publik.
- Panel admin atau CMS. Konten cukup diedit lewat file di repo.
- Fitur unggah foto oleh pengunjung.
- Aplikasi mobile native.

## 3. Pengguna dan Skenario

Ada tiga kelompok pengunjung, dan masing-masing membuka website dengan tujuan serta perangkat yang berbeda.

| Persona | Tujuan | Perangkat utama | Yang paling dibutuhkan |
| --- | --- | --- | --- |
| Pacar | Menikmati kenangan bersama dan menemukan kejutan pribadi | HP | Bagian pribadi yang terkunci, caption yang jujur, nuansa romantis |
| Teman dan keluarga | Melihat hasil pendakian dan ikut merasakan suasananya | HP lewat tautan di media sosial | Muat cepat, mudah dibagikan, galeri yang enak dibuka |
| Pengunjung publik, termasuk perekrut dan sesama pengembang | Melihat kualitas teknis dan desain | Laptop | Animasi halus, kode rapi di GitHub, performa baik |

**Skenario penggunaan**

1. **Dibuka dari tautan di HP.** Pengunjung masuk, melihat layar pembuka dengan judul dan satu video latar. Mereka scroll ke bawah dan bab demi bab muncul. Mereka mengetuk foto untuk memperbesar, lalu menggeser ke foto berikutnya.
2. **Dibuka di laptop.** Pengunjung mendapat animasi penuh: smooth scroll, efek cahaya 3D di bab langit cerah, dan musik latar yang bisa dinyalakan.
3. **Pacar membuka bagian pribadi.** Di akhir halaman ada tombol menuju bagian rahasia. Setelah memasukkan kata sandi, ia melihat pesan pribadi dan foto yang tidak tampil di versi publik.
4. **Pengunjung dengan koneksi lambat atau pengaturan hemat gerak.** Website tetap terbaca: video diganti gambar poster, animasi berat dimatikan, teks dan foto tetap tampil.

**Kebutuhan lintas persona**

- Bisa dipakai tanpa instruksi: cukup scroll.
- Tidak meminta izin, login, atau data apa pun dari pengunjung publik.
- Tampilan nyaman di layar 360 px sampai 1920 px.

## 4. Konsep Kreatif dan Narasi

Konsepnya "kenangan per tempat": setiap bab adalah satu tempat atau suasana, disusun menurut kekuatan emosinya, bukan menurut jam kejadian.

**Premis cerita.** Naik gunung itu melelahkan sampai tidak sempat memotret, tetapi tiap kali sampai di tempat yang indah, semua capek hilang dan kamera keluar. Website ini hanya menampilkan momen-momen itu, dan jujur soal bagian yang tidak sempat difoto.

**Urutan emosional yang diusulkan**

1. **Pembuka**: judul, video latar pendek, ajakan untuk scroll.
2. **Sabana**: hangat dan santai, foto berdua, suasana lega setelah menanjak.
3. **Puncak**: pencapaian, foto "akhirnya sampai", pemandangan puncak.
4. **Langit cerah**: bab utama dan paling dramatis dengan pemandangan terbuka yang lapang.
5. **Sunrise**: nuansa fajar hangat dari terang emas ke biru muda, menutup dengan tenang dan penuh harapan.
6. **Penutup dan bagian pribadi**: ucapan terima kasih dan pintu ke halaman rahasia.

**Nada tulisan.** Santai, jujur, sedikit humor, memakai bahasa Indonesia sehari-hari. Caption pendek, satu sampai dua kalimat, dan menyebut perasaan nyata, bukan deskripsi foto. Contoh gaya: "Lima menit setelah aku bilang mau menyerah."

**Bagian "yang tidak terdokumentasi".** Satu section singkat di antara sabana dan puncak berlatar gelap dengan teks seperti "Bagian ini tidak ada dokumentasinya karena kami terlalu capek." Ini mengisi celah tanpa footage dan menambah karakter.

**Aturan konten**

- Tiap foto dan video punya satu caption.
- Satu bab berisi sekitar 15 sampai 22 item, dipilih yang terbaik. Tidak semua dari 80 item wajib tampil.
- Foto yang bersifat sangat pribadi dipindahkan ke bagian rahasia.

## 5. Struktur Halaman dan Spesifikasi Per Bab

Halaman publik berupa satu halaman panjang berisi enam bagian berurutan, ditambah satu halaman terpisah untuk bagian pribadi.

| No | Bagian | Isi media | Animasi utama | Suasana |
| --- | --- | --- | --- | --- |
| 0 | Pembuka (hero) | 1 video pendek, judul | Judul muncul huruf per huruf, video latar, ikon scroll berdenyut | Tenang, penasaran |
| 1 | Sabana | 15 sampai 20 foto | Parallax rumput, foto muncul bergantian saat scroll | Hangat, segar |
| 2 | Bagian tak terdokumentasi | Teks saja | Layar gelap, teks muncul perlahan | Lucu, jujur |
| 3 | Puncak | 12 sampai 18 foto, 1 sampai 2 video | Video layar penuh, angka ketinggian naik | Bangga, lega |
| 4 | Langit cerah | 15 sampai 22 foto, 1 sampai 2 video | Efek cahaya/suasana cerah di belakang galeri, foto melayang | Cerah, lapang, megah |
| 5 | Sunrise | 12 sampai 18 foto, 1 video | Warna latar berubah dari oranye keemasan ke biru muda | Hangat, penuh harapan |
| 6 | Penutup | Teks, satu foto pilihan | Fade-out, tombol menuju bagian pribadi | Haru, hangat |
| P | Bagian pribadi (halaman terpisah) | Foto dan pesan khusus | Kata sandi, pesan muncul bertahap | Intim |

**Detail per bagian**

**0. Pembuka.** Berisi judul, subjudul satu kalimat, tanggal pendakian, dan tombol untuk menyalakan musik. Video latar tanpa suara, berulang, dengan gambar poster sebagai cadangan. Tidak ada menu rumit; navigasi cukup berupa titik penunjuk bab di sisi layar.

**1. Sabana.** Galeri utama berupa polaroid line carousel dengan 6 sampai 8 foto, dilengkapi grid tidak simetris (masonry) sebagai pelengkap. Klik foto membuka lightbox dengan caption. Latar memakai gradien hijau lembut. Tiga atau empat foto terbaik dibuat lebih besar sebagai penekanan.

**2. Bagian tak terdokumentasi.** Satu layar penuh berlatar gelap. Teks humor tampil per baris saat di-scroll. Berfungsi sebagai jeda sebelum puncak dan sebagai garis jalur ilustrasi yang menanjak.

**3. Puncak.** Video mengisi layar dan terkunci (pin) selama beberapa panjang scroll, sementara teks pencapaian muncul di atasnya. Setelah itu galeri foto "akhirnya sampai". Penunjuk ketinggian di sisi layar berhenti di angka puncak.

**4. Langit cerah.** Bab paling menonjol. Latar berisi efek elemen cahaya matahari dan langit cerah yang bereaksi sedikit pada kursor atau kemiringan HP. Foto tampil sebagai kartu yang melayang. Di perangkat lemah, efek diganti latar gambar langit statis.

**5. Sunrise.** Warna latar halaman berubah mengikuti posisi scroll. Foto siluet fajar dan video pemandangan fajar mendapat ruang besar. Bab ini ditutup dengan latar biru terang yang segar.

**6. Penutup.** Ucapan terima kasih, daftar kredit singkat (pembuat, musik, alat yang dipakai), tautan ke GitHub, dan tombol "Buka bagian pribadi".

**P. Bagian pribadi.** Halaman terpisah di alamat sendiri, dilindungi kata sandi sederhana dan tidak diindeks mesin pencari. Isinya pesan untuk pacar, foto yang tidak tampil di publik, dan kejutan kecil di akhir.

## 6. Kebutuhan Fungsional

Fitur dibagi tiga tingkat: wajib (tanpa ini website tidak jadi), sebaiknya ada, dan opsional kalau waktu tersisa.

| Kode | Fitur | Penjelasan singkat | Prioritas |
| --- | --- | --- | --- |
| F1 | Scroll bab berurutan | Halaman panjang dengan enam bagian dan titik penunjuk bab | Wajib |
| F2 | Galeri foto per bab | Polaroid line carousel per bab (digeser, diklik, atau lewat keyboard), ditambah grid foto, lazy loading, ukuran gambar responsif | Wajib |
| F3 | Lightbox | Perbesar foto, geser kiri-kanan, caption, tombol tutup, dukung gestur di HP | Wajib |
| F4 | Pemutar video | Video muted, playsinline, poster, hanya satu video aktif per bagian | Wajib |
| F5 | Caption per media | Dibaca dari satu file data (JSON), bukan ditulis di kode | Wajib |
| F6 | Responsif | Nyaman dari 360 px sampai 1920 px | Wajib |
| F7 | Smooth scroll | Gerakan scroll halus dengan Lenis | Sebaiknya ada |
| F8 | Animasi scroll | Teks, foto, dan latar bereaksi pada scroll dengan GSAP ScrollTrigger | Sebaiknya ada |
| F9 | Garis jalur dan indikator ketinggian | Jalur SVG tergambar dan angka mdpl naik saat scroll | Sebaiknya ada |
| F10 | Latar berubah (sunrise) | Warna halaman berubah bertahap mengikuti scroll fajar | Sebaiknya ada |
| F11 | Musik latar | Tombol nyala atau mati, tidak putar otomatis dengan suara | Sebaiknya ada |
| F12 | Efek 3D bab langit cerah | Partikel cahaya/awan cerah dengan React Three Fiber dan Drei, dimuat hanya saat terlihat | Sebaiknya ada |
| F13 | Bagian pribadi dengan kata sandi | Halaman terpisah, tidak diindeks | Sebaiknya ada |
| F14 | Mode hemat gerak | Menghormati pengaturan prefers-reduced-motion | Sebaiknya ada |
| F15 | Tombol bagikan dan kartu pratinjau | Open Graph untuk WhatsApp dan media sosial | Sebaiknya ada |
| F16 | Layar pemuatan | Animasi singkat saat aset awal dimuat | Opsional |
| F17 | Efek shader cahaya | Sinar matahari bergerak halus dengan GLSL | Opsional |
| F18 | Efek kursor | Cahaya atau jejak mengikuti kursor di desktop | Opsional |
| F19 | Peta jalur interaktif | Titik pos Gunung Andong yang bisa diklik | Opsional |
| F20 | Hitung mundur tanggal spesial | Di bagian pribadi | Opsional |

**Kriteria penerimaan fitur wajib**

- **F2 dan F3.** Foto pertama muncul tanpa lompatan tata letak (layout shift). Lightbox bisa ditutup dengan tombol Esc, tombol silang, dan ketukan di luar gambar.
- **F4.** Video tidak berputar otomatis dengan suara. Video di luar layar dihentikan agar hemat baterai.
- **F5.** Menambah media baru cukup dengan menambah satu entri di file data, tanpa mengubah komponen.
- **F6.** Tidak ada scroll horizontal dan tidak ada teks terpotong di layar 360 px.

## 7. Desain Visual dan Animasi

Gaya visualnya sinematik dan hangat, dengan warna yang berubah mengikuti suasana tiap bab, mirip pergantian cahaya fajar hingga pagi hari.

**Palet warna per bab (usulan, bisa disesuaikan dengan foto asli)**

| Bagian | Warna latar | Warna aksen | Warna teks |
| --- | --- | --- | --- |
| Pembuka | #0F1A14 (hijau tua kehitaman) | #E8C872 (emas lembut) | #F4F1E8 |
| Sabana | #DCE8C8 (hijau muda) | #3E6B3A (hijau daun) | #1E2B1C |
| Tak terdokumentasi | #0A0A0A (hitam) | #888888 (abu) | #CCCCCC |
| Puncak | #BFD7E8 (biru langit) | #1F4E79 (biru tua) | #10233A |
| Langit cerah | #E0F2FE (biru cerah segar) | #0284C7 (biru laut cerah) | #0F172A |
| Sunrise | #FFEDD5 lalu #FDBA74 lalu #38BDF8 | #F97316 (oranye terbit) | #431407 |
| Penutup dan pribadi | #1E1B4B (biru keunguan fajar) | #F59E0B (kuning fajar) | #FEF3C7 |

**Tipografi**

- **Judul**: font serif ekspresif (misalnya Fraunces atau Playfair Display) untuk kesan hangat dan sinematik.
- **Isi dan caption**: font sans-serif yang mudah dibaca (misalnya Inter atau DM Sans).
- **Angka ketinggian**: font monospace atau sans tebal supaya terasa seperti papan penunjuk.
- Ukuran teks isi minimal 16 px di HP. Font dimuat sendiri (self-host) dan hanya dua keluarga font dipakai.

**Prinsip tata letak**

- Foto adalah bintang utama; teks pendek dan diberi ruang kosong yang lega.
- Grid galeri tidak seragam: beberapa foto besar, sisanya sedang, agar tidak terasa seperti katalog.
- Margin samping 16 px di HP dan 48 px atau lebih di desktop.
- Kontras teks terhadap latar minimal 4,5 banding 1.

**Spesifikasi animasi**

| Animasi | Bagian | Alat | Perilaku |
| --- | --- | --- | --- |
| Smooth scroll | Seluruh halaman | Lenis | Scroll halus dengan durasi sekitar 1,1 detik |
| Judul muncul | Pembuka | GSAP | Huruf muncul bergantian, total di bawah 1,5 detik |
| Foto fade dan geser naik | Semua galeri | GSAP ScrollTrigger | Muncul saat masuk 15% layar, geser 40 px, durasi 0,6 detik |
| Parallax | Sabana, puncak | GSAP | Lapisan latar bergerak 10% sampai 30% lebih lambat dari foto |
| Video terkunci (pin) | Puncak | GSAP ScrollTrigger | Video terkunci layar penuh selama sekitar 150% tinggi layar |
| Jalur SVG tergambar | Antar bab | GSAP (stroke-dashoffset) | Garis menanjak tergambar sesuai posisi scroll |
| Angka ketinggian naik | Sisi layar | GSAP | Dari angka basecamp ke angka puncak mengikuti scroll |
| Efek Langit Cerah 3D | Langit cerah | React Three Fiber, Drei | Partikel cahaya langit cerah, bergerak pelan, jumlah dikurangi di HP |
| Perubahan warna latar | Sunrise | GSAP | Interpolasi warna fajar mengikuti progres scroll |
| Lightbox | Galeri | Motion | Foto membesar dari posisi aslinya, transisi pegas ringan |
| Hover kartu foto | Desktop | Motion | Sedikit miring dan terangkat, durasi 0,25 detik |
| Polaroid line carousel | Galeri tiap bab | Komponen sendiri, tanpa library | Foto menggantung di tali melengkung, bergoyang mengikuti kecepatan geser, foto di tengah menjadi aktif; berhenti saat keluar layar |

**Aturan gerak**

- Durasi animasi UI antara 0,2 dan 0,8 detik; hanya animasi dekoratif besar yang boleh lebih lama.
- Animasikan hanya transform dan opacity agar tetap lancar.
- Jika pengunjung memilih hemat gerak, matikan parallax, efek 3D, dan animasi pin; ganti dengan fade sederhana.

**Referensi desain: Polaroid Line Carousel**

Galeri tiap bab mengambil gaya polaroid yang digantung di tali melengkung: foto digeser, bergoyang di jepitannya, dan foto di tengah menjadi yang aktif, dengan bar caption, penghitung "03 / 08", dan tombol panah di bawah. Komponennya sudah dicoba berjalan di proyek Vite React TypeScript pada lebar 1440 px dan 390 px tanpa error di konsol. Uji itu memakai lanskap lukisan bawaan komponen, bukan foto asli.

| Aspek | Keputusan |
| --- | --- |
| Lokasi berkas | `src/components/ui/polaroid-line-carousel.tsx`, dimuat sebagai island React dengan `client:visible` |
| Dependensi | Hanya React. Animasinya simulasi sendiri, bukan GSAP atau Motion |
| Data | Daftar slide dibaca dari `media.json`: `image`, `title` (di polaroid), `caption` (di bar bawah), `alt` |
| Props awal | `height` sekitar 70svh, `cardWidth` 300, `sag` 46, `swing` 1, `autoplay` 0 (pengunjung yang mengatur geser) |
| Warna | `background`, `ink`, dan `string` mengikuti palet tiap bab di tabel palet di atas |
| Jumlah slide | 6 sampai 12 per carousel, satu carousel per bab |
| Aksesibilitas | Panah kiri-kanan, pengumuman posisi untuk pembaca layar, dan `prefers-reduced-motion` sudah bawaan; `alt` tetap diisi per foto |

**Penyesuaian wajib sebelum dipakai**

1. Baris penyambung CSS di akhir `PL_CSS` harus `.join("\n")` dalam satu baris. Pada kode yang ditempel, `"` terputus ke baris baru dan itu error sintaks.
2. Hapus `"use client"` (arahan Next.js, tidak berguna di Astro) dan ganti impor `@/components/ui/...` dengan impor relatif atau atur alias di `tsconfig`.
3. Tambahkan `loading="lazy"` dan `decoding="async"` pada tag `<img>`, supaya foto yang jauh dari layar tidak langsung terunduh.
4. Fitur lanskap lukisan (canvas) hanya berjalan untuk slide tanpa `image`. Karena semua slide akan memakai foto asli, bagian itu boleh dihapus agar berkas lebih ringan.
5. Ganti `height` bawaan 100svh dengan sekitar 70svh agar carousel tidak memakan satu layar penuh di halaman panjang.
6. Cetakan polaroid berbentuk kotak (rasio 1:1) dengan `object-fit: cover`, jadi foto lanskap terpotong di sisinya. Pilih atau potong foto dengan objek utama di tengah.

Desain halaman lainnya (pembuka, bagian tak terdokumentasi, penutup, bagian pribadi) dikembangkan di Google Stitch dengan satu prompt induk dan satu prompt per halaman, memakai tangkapan layar carousel ini sebagai gambar referensi.

## 8. Arsitektur dan Stack Teknis

Situs dibangun sebagai situs statis dengan Astro, dan hanya bagian yang interaktif yang memuat JavaScript, sehingga halaman awal tetap ringan.

Foto dan video diolah di komputer, Astro membangun situs statis dari caption dan komponen, hosting mengirim halaman, dan video dialirkan dari penyimpanan terpisah.

**Stack yang dipilih**

| Lapisan | Pilihan | Fungsi | Alasan |
| --- | --- | --- | --- |
| Kerangka | Astro | Halaman statis dan island interaktif | Ringan, optimasi gambar bawaan |
| UI interaktif | React (lewat integrasi Astro) | Galeri, lightbox, pemutar video, musik | Sudah dikuasai |
| Styling | Tailwind CSS | Tata letak dan tema | Cepat dan konsisten |
| Animasi terikat scroll | GSAP dan ScrollTrigger | Pin video, jalur SVG, warna sunrise, angka ketinggian | Standar untuk animasi scroll |
| Smooth scroll | Lenis | Gerak scroll halus | Pasangan umum GSAP |
| Animasi komponen | Motion (dulu Framer Motion) | Lightbox, hover kartu foto | Cocok untuk komponen React |
| 3D | Three.js lewat React Three Fiber dan Drei | Cahaya dan elemen langit di bab langit cerah | Sudah pernah dipakai di proyek lain |
| Pengolahan gambar | sharp dan komponen Image Astro | WebP, ukuran responsif, buang EXIF | Otomatis dan cepat |
| Pengolahan video | ffmpeg | Kompres, poster, hapus audio | Alat standar |
| Hosting | Vercel atau Cloudflare Pages | Deploy otomatis | Mudah untuk situs statis |
| Penyimpanan video | Cloudinary, Cloudflare R2, atau Vercel Blob | Video di luar repo | Menjaga repo kecil |
| Versi kode | Git dan GitHub | Riwayat dan portofolio | Bagian dari tujuan proyek |

GSAP dan Motion sebagian tumpang tindih. Aturannya: GSAP untuk semua yang terikat scroll, Motion hanya untuk interaksi komponen kecil. Periksa ketentuan lisensi terbaru GSAP di situs resminya sebelum rilis.

**Perintah pemasangan awal**

```bash
npm create astro@latest andong-berdua
cd andong-berdua
npx astro add react tailwind
npm install gsap lenis motion
npm install three @react-three/fiber @react-three/drei
npm install -D sharp
```

**Struktur folder**

```text
andong-berdua/
├─ public/
│  ├─ foto/                 # WebP hasil konversi, tanpa EXIF
│  ├─ audio/                # musik latar berlisensi
│  └─ favicon.svg
├─ scripts/
│  ├─ konversi-foto.mjs
│  └─ kompres-video.sh
├─ src/
│  ├─ data/
│  │  └─ media.json         # caption, alt, bab, status publik
│  ├─ components/
│  │  ├─ Hero.astro
│  │  ├─ Bab.astro
│  │  ├─ Galeri.tsx         # island React
│  │  ├─ Lightbox.tsx
│  │  ├─ VideoPlayer.tsx
│  │  ├─ JalurPendakian.tsx # jalur SVG dan angka ketinggian
│  │  ├─ LangitCerahLayer.tsx # R3F, client:visible
│  │  └─ MusikToggle.tsx
│  ├─ layouts/
│  │  └─ Layout.astro
│  ├─ lib/
│  │  ├─ scroll.ts          # setup Lenis dan GSAP
│  │  └─ gerak.ts           # util prefers-reduced-motion
│  ├─ pages/
│  │  ├─ index.astro
│  │  └─ rahasia.astro
│  └─ styles/
│     └─ global.css
├─ astro.config.mjs
├─ package.json
└─ README.md
```

**Strategi pemuatan komponen**

| Komponen | Cara dimuat | Alasan |
| --- | --- | --- |
| Hero, teks bab | HTML statis tanpa JavaScript | Tampil secepat mungkin |
| Galeri dan Lightbox | `client:visible` | Dimuat saat bab mendekati layar |
| Lenis dan GSAP | Diinisialisasi sekali di Layout | Dipakai di seluruh halaman |
| Efek 3D Langit Cerah | `client:visible` dan impor dinamis | Three.js tidak membebani halaman awal |
| Tombol musik | `client:idle` | Tidak mendesak saat halaman pertama dimuat |

**Prinsip kode**

- Konten (caption, alt, urutan) hanya ada di `media.json`, bukan di komponen.
- Setiap bab memakai komponen yang sama dengan parameter berbeda (tema warna, daftar media, jenis animasi).
- Semua animasi dibungkus pengecekan `prefers-reduced-motion`.
- README menjelaskan cara menambah media baru, menjalankan skrip konversi, dan deploy.

## 9. Manajemen Media

Semua foto dikonversi ke WebP tanpa metadata dan semua video dikompres sebelum masuk proyek, supaya total halaman tetap ringan.

**Alur pengolahan media**

1. **Kurasi.** Pilih media terbaik dari sekitar 80 item. Targetnya 55 sampai 70 item tampil di halaman publik.
2. **Kelompokkan per bab.** Beri nama berpola: `sabana-01`, `puncak-03`, `langit-cerah-12`, `sunrise-05`.
3. **Tulis caption** di file data sebelum coding.
4. **Konversi foto** ke WebP, hapus metadata, buat tiga ukuran.
5. **Kompres video**, buat gambar poster, hapus audio bila tidak dipakai.
6. **Unggah** sesuai aturan hosting di bawah.

**Spesifikasi foto**

| Ukuran | Lebar | Kualitas WebP | Dipakai untuk |
| --- | --- | --- | --- |
| Thumbnail | 600 px | sekitar 75 | Grid galeri |
| Sedang | 1200 px | sekitar 80 | Tampilan di halaman dan HP |
| Besar | 1920 px | sekitar 80 | Lightbox di desktop |

Perkiraan berat foto setelah konversi adalah 80 sampai 300 KB per file untuk ukuran sedang dan besar. Angka ini perlu dicek pada foto asli. Jika memakai Astro, ukuran dan format bisa dihasilkan otomatis oleh komponen gambar bawaannya.

**Contoh skrip konversi (Node dan sharp)**

```javascript
import sharp from "sharp";
import { readdir } from "node:fs/promises";

const sizes = [600, 1200, 1920];
const files = await readdir("./foto-asli");

for (const file of files) {
  const name = file.replace(/\.[^.]+$/, "");
  for (const width of sizes) {
    await sharp(`./foto-asli/${file}`)
      .rotate() // terapkan orientasi EXIF dulu, lalu metadata dibuang
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`./public/foto/${name}-${width}.webp`);
  }
}
```

sharp membuang metadata (termasuk GPS) secara bawaan selama `withMetadata()` tidak dipanggil. Setelah konversi, periksa beberapa file dengan alat EXIF untuk memastikan tidak ada koordinat tersisa.

**Spesifikasi video**

| Jenis | Resolusi | Durasi | Target berat | Audio |
| --- | --- | --- | --- | --- |
| Video latar pembuka | 720p | 8 sampai 15 detik, berulang | Di bawah 4 MB | Tidak ada |
| Video bab | 1080p (720p untuk HP) | 10 sampai 20 detik | Di bawah 10 MB | Tidak ada |
| Video pribadi (bagian rahasia) | 720p | Bebas | Di bawah 15 MB | Opsional |

Contoh perintah ffmpeg (angka CRF bisa disesuaikan setelah melihat hasil):

```bash
# MP4 (H.264), tanpa audio, siap streaming
ffmpeg -i input.mp4 -vf "scale=-2:720" -c:v libx264 -crf 28 -preset veryfast -an -movflags +faststart output.mp4

# WebM (VP9) sebagai alternatif
ffmpeg -i input.mp4 -vf "scale=-2:720" -c:v libvpx-vp9 -crf 34 -b:v 0 -an output.webm

# Gambar poster dari detik pertama
ffmpeg -i input.mp4 -ss 00:00:01 -frames:v 1 poster.png
```

Gambar poster lalu dikonversi ke WebP dengan skrip foto di atas.

**Struktur data media (satu file JSON)**

```json
{
  "bab": "langit-cerah",
  "items": [
    {
      "id": "langit-cerah-01",
      "jenis": "foto",
      "berkas": "langit-cerah-01",
      "caption": "Langit biru membentang tanpa batas, membalas tuntas semua lelah.",
      "alt": "Pemandangan langit cerah dari puncak saat pagi",
      "ukuran": "besar",
      "publik": true
    },
    {
      "id": "langit-cerah-video-01",
      "jenis": "video",
      "berkas": "langit-cerah-video-01",
      "poster": "langit-cerah-video-01-poster",
      "caption": "Momen saat angin berembus kencang di bawah langit terang.",
      "alt": "Video suasana langit cerah di puncak gunung",
      "publik": true
    }
  ]
}
```

Bidang `publik: false` menandai media yang hanya muncul di bagian pribadi. Bidang `alt` wajib diisi agar website bisa diakses pembaca layar.

**Aturan hosting**

| Jenis berkas | Lokasi yang disarankan | Alasan |
| --- | --- | --- |
| Foto WebP (total sekitar 15 sampai 25 MB) | Di dalam repo, folder public atau aset Astro | Sederhana, ikut deploy |
| Video | Layanan penyimpanan terpisah (Cloudinary, Cloudflare R2, atau Vercel Blob) | Menjaga repo kecil, ada CDN dan streaming |
| Media pribadi | Penyimpanan terpisah, tidak di repo publik | Hindari terbaca lewat riwayat GitHub |

File asli (resolusi penuh) disimpan di komputer atau penyimpanan pribadi, tidak di repo.

## 10. Performa, Aksesibilitas, dan Responsivitas

Website harus tetap lancar di HP kelas menengah, karena sebagian besar pengunjung akan membukanya dari tautan di aplikasi pesan.

**Target performa**

| Aspek | Target | Strategi |
| --- | --- | --- |
| Lighthouse Performance (mobile) | 85 atau lebih | Astro island, lazy loading, gambar responsif |
| Largest Contentful Paint | Di bawah 2,5 detik | Gambar pembuka di-preload, poster video ringan |
| Cumulative Layout Shift | Di bawah 0,1 | Semua gambar dan video punya width dan height |
| Interaction to Next Paint | Di bawah 200 ms | Hindari kerja JavaScript berat di main thread |
| Berat halaman awal | Di bawah 3 MB | Muat media bab lain saat mendekati viewport |
| Frame rate | 30 fps atau lebih di HP | Kurangi partikel 3D, animasi hanya transform dan opacity |

**Teknik yang dipakai**

- Gambar di bawah layar memakai `loading="lazy"`, dan gambar pembuka memakai `fetchpriority="high"`.
- Gunakan `srcset` dan `sizes` agar HP memuat ukuran 600 atau 1200 px, bukan 1920 px.
- Video memakai `preload="none"` atau `metadata`, dan diputar hanya saat bagiannya terlihat (Intersection Observer).
- Canvas 3D dimuat dengan `client:visible` di Astro dan baru dibuat saat bab langit cerah mendekati layar.
- Library besar seperti Three.js dipisah ke chunk sendiri agar tidak memperlambat halaman awal.
- Di perangkat dengan hemat data atau koneksi lambat, ganti video dengan gambar poster.

**Degradasi di perangkat lemah**

| Kondisi | Perilaku |
| --- | --- |
| Layar sempit atau GPU lemah | Efek langit dikurangi, atau diganti gambar statis |
| prefers-reduced-motion aktif | Parallax, pin video, dan efek 3D mati; foto muncul dengan fade sederhana |
| JavaScript gagal dimuat | Teks dan foto tetap tampil dalam tata letak sederhana |
| WebGL tidak tersedia | Bab langit cerah memakai latar gambar |

**Aksesibilitas**

- Semua foto punya teks alternatif (`alt`) yang menjelaskan isinya.
- Video tidak berputar dengan suara otomatis, dan ada tombol jeda untuk video yang berulang.
- Lightbox bisa dioperasikan dengan keyboard (Tab, panah, Esc) dan fokus kembali ke foto asal saat ditutup.
- Kontras teks minimal 4,5 banding 1, termasuk di bab sunrise yang terang keemasan.
- Struktur judul (h1, h2) berurutan dan masuk akal bagi pembaca layar.
- Teks tidak boleh bergantung hanya pada animasi agar terbaca.

**Responsivitas**

| Lebar layar | Tata letak galeri | Catatan |
| --- | --- | --- |
| 360 sampai 599 px | 1 kolom, foto besar | Fokus HP; gestur geser di lightbox |
| 600 sampai 1023 px | 2 kolom | Tablet dan HP landscape |
| 1024 sampai 1439 px | 3 kolom tidak simetris | Laptop |
| 1440 px atau lebih | 3 sampai 4 kolom, lebar konten dibatasi | Monitor besar |

**Browser yang diuji**

Chrome dan Edge terbaru, Safari iOS terbaru, Firefox terbaru, dan Chrome Android. Uji manual di setidaknya satu HP Android kelas menengah dan satu iPhone bila tersedia.

## 11. Privasi dan Keamanan

Karena website dipublikasikan, aturan privasi ditetapkan sebelum satu pun foto diunggah, dan keputusan akhir soal foto yang tampil dibuat bersama pacar.

| Risiko privasi | Langkah wajib |
| --- | --- |
| Koordinat GPS tersimpan di metadata foto dan video | Buang semua metadata saat konversi; periksa ulang hasil dengan alat EXIF; video juga dicek (metadata lokasi dan waktu) |
| Foto pacar tampil publik tanpa persetujuan | Minta persetujuan tertulis (cukup pesan chat) untuk setiap foto yang tampil, dan hormati bila ada yang ingin disembunyikan |
| Orang lain ikut terekam di foto | Pilih foto tanpa wajah orang asing yang jelas, atau potong dan buramkan |
| Informasi pribadi di caption | Tidak menulis nama lengkap, alamat, tempat tinggal, atau jadwal rutin |
| Plat nomor atau papan identitas terlihat | Buramkan atau jangan tampilkan |
| Musik atau font bermasalah lisensi | Pakai musik dan font berlisensi bebas atau berizin, simpan bukti lisensinya |

**Tentang kata sandi di bagian pribadi**

Kata sandi yang dicek di sisi browser pada website statis hanya memberi rasa privat, bukan keamanan sungguhan. Siapa pun yang membuka kode sumber atau tab jaringan bisa menemukan alamat file jika file itu ada di hosting publik. Karena itu ada dua tingkat pilihan:

1. **Tingkat sederhana (cukup untuk kejutan romantis).** Halaman tersembunyi dengan kata sandi di sisi klien, `noindex`, tidak ditautkan dari menu, dan berisi hanya hal yang tidak sensitif. Foto yang benar-benar pribadi tidak ditaruh di sini.
2. **Tingkat aman.** Cek kata sandi di sisi server (misalnya fungsi serverless) lalu kirim media lewat tautan bertanda tangan yang kedaluwarsa, atau pakai fitur perlindungan kata sandi dari hosting (jika tersedia di paket yang dipakai).

Keputusan yang disarankan untuk versi pertama: pakai tingkat sederhana, dan jangan menaruh foto sensitif di bagian pribadi. Pindahkan ke tingkat aman hanya jika ada konten yang tidak boleh terbaca orang lain.

**Keamanan teknis**

- Tidak ada formulir, akun, atau database, sehingga permukaan serangan kecil.
- Jangan menyimpan kunci API atau token di repo; gunakan variabel lingkungan hosting.
- Aktifkan HTTPS (otomatis di hosting umum) dan gunakan header keamanan dasar bila hosting mendukung.
- Jika memakai Cloudinary atau penyimpanan lain, batasi izin unggah hanya untuk pemilik, dan pakai tautan baca publik hanya untuk media yang memang publik.
- Perbarui dependensi secara berkala dan jalankan `npm audit` sebelum rilis.
- Tambahkan `noindex` dan `robots.txt` untuk halaman pribadi.

**Daftar periksa sebelum publikasi**

- [ ] Semua foto dan video sudah bebas metadata dan lokasi
- [ ] Pacar sudah melihat dan menyetujui seluruh foto publik
- [ ] Tidak ada nama lengkap, alamat, atau info sensitif di caption
- [ ] Musik dan font punya lisensi yang jelas
- [ ] Halaman pribadi memakai `noindex` dan tidak ditautkan di menu
- [ ] Tidak ada rahasia (token, kata sandi) di riwayat repo

## 12. Deployment dan SEO

Website dibangun sebagai situs statis dan di-deploy otomatis setiap kali kode di-push ke GitHub, sehingga pembaruan caption atau foto cukup berupa satu commit.

**Pilihan hosting**

| Pilihan | Cocok untuk | Catatan |
| --- | --- | --- |
| Vercel | Deploy otomatis dari GitHub, integrasi Vercel Blob untuk media | Mudah untuk Astro; cek batas paket gratis terbaru sebelum memakai |
| Netlify | Deploy otomatis, form dan proteksi sederhana | Alternatif setara untuk situs statis |
| Cloudflare Pages | CDN luas, bisa dipasangkan dengan R2 untuk video | Baik jika video banyak |
| GitHub Pages | Paling sederhana dan satu tempat dengan repo | Tidak ada fungsi server; cocok untuk tingkat privasi sederhana |

Rekomendasi awal: **Vercel atau Cloudflare Pages** untuk halaman, dan **Cloudinary atau Cloudflare R2** untuk video. Batas gratis tiap layanan bisa berubah, jadi verifikasi di halaman resmi saat akan memilih.

**Alur deployment**

1. Kerja di cabang `main` dan fitur di cabang terpisah.
2. Push ke GitHub memicu build otomatis.
3. Setiap pull request menghasilkan alamat pratinjau untuk diuji di HP.
4. Build ke `main` menjadi versi publik.
5. Jalankan Lighthouse di alamat pratinjau sebelum rilis.

**Domain**

Versi pertama cukup memakai subdomain bawaan hosting. Domain sendiri (misalnya nama pendek yang mudah dibagikan) bisa ditambahkan nanti tanpa mengubah kode.

**SEO dan berbagi**

| Elemen | Isi |
| --- | --- |
| Judul halaman | Pendek dan unik, memuat kata Gunung Andong |
| Deskripsi meta | 120 sampai 155 karakter yang menggambarkan cerita |
| Open Graph dan Twitter Card | Judul, deskripsi, dan gambar pratinjau 1200 x 630 px (foto terbaik) |
| Favicon | Ikon gunung sederhana dalam format SVG dan PNG |
| Bahasa | `lang="id"` di elemen html |
| sitemap dan robots.txt | Sitemap untuk halaman publik; halaman pribadi diberi noindex |
| URL | Bersih dan stabil, misalnya `/` dan `/rahasia` |

Gambar pratinjau Open Graph menentukan seberapa menarik tautan terlihat di WhatsApp, Instagram, dan media sosial lain, jadi pilih foto yang kuat dan uji lewat alat pratinjau tautan.

**Analitik (opsional)**

Pakai analitik yang ramah privasi (misalnya Plausible atau Umami, atau fitur analitik bawaan hosting) untuk melihat jumlah kunjungan dan bab yang paling sering dibuka. Tidak memakai cookie pelacak agar tidak perlu spanduk persetujuan, dan tidak dipasang di halaman pribadi.

**Pemeliharaan**

- Cadangan: seluruh repo di GitHub, file asli di penyimpanan pribadi.
- Pantau uptime sederhana dengan layanan gratis jika diperlukan.
- Tinjau ulang dependensi dan batas hosting setiap beberapa bulan.

## 13. Rencana Kerja dan Milestone

Proyek dikerjakan dalam enam fase selama sekitar delapan minggu, dengan satu gerbang kualitas di setiap pergantian fase.

Estimasi minggu adalah perkiraan untuk ritme paruh waktu di sela kuliah dan boleh digeser, asalkan urutan gerbangnya tetap.

| Fase | Estimasi | Pekerjaan utama | Hasil yang bisa diperiksa |
| --- | --- | --- | --- |
| 0. Persiapan | Minggu 1 | Kumpulkan 5 sampai 8 referensi, tulis dokumen satu halaman, buat storyboard per bab, kurasi media, tulis caption, minta persetujuan pacar | Daftar media final dan caption siap |
| 1. Fondasi | Minggu 2 | Setup Astro, React, Tailwind; buat `media.json`; skrip konversi foto dan video; deploy awal | Halaman kosong berjalan di alamat pratinjau |
| 2. Konten | Minggu 3 sampai 4 | Hero, empat bab, galeri, lightbox, pemutar video, tata letak responsif | Semua media tampil tanpa animasi |
| 3. Animasi | Minggu 5 sampai 6 | Lenis, GSAP, jalur SVG, warna sunrise, musik, efek 3D langit cerah | Animasi lancar di HP |
| 4. Poles dan uji | Minggu 7 | Performa, aksesibilitas, bagian pribadi, pemeriksaan privasi | Skor Lighthouse sesuai target |
| 5. Rilis | Minggu 8 | SEO, Open Graph, domain, README, rilis | Website publik dan tautan dibagikan |

**Jika waktu mepet, potong dari yang paling bawah**

1. Efek kursor (F18) dan hitung mundur (F20)
2. Peta jalur interaktif (F19) dan layar pemuatan (F16)
3. Efek shader cahaya (F17)
4. Efek 3D langit cerah diganti latar gambar langit statis (F12)

Fitur wajib F1 sampai F6 dan privasi tidak boleh dipotong.

**Definisi selesai**

- [ ] Semua fitur wajib (F1 sampai F6) berjalan di HP dan laptop
- [ ] Target performa di bagian 2 dan 10 tercapai di alamat produksi
- [ ] Daftar periksa privasi di bagian 11 lulus seluruhnya
- [ ] Pacar sudah melihat versi akhir dan menyetujuinya
- [ ] README menjelaskan cara menjalankan, menambah media, dan deploy
- [ ] Repo GitHub rapi, berisi tangkapan layar dan tautan demo

## 14. Risiko, Pertanyaan Terbuka, dan Lampiran

Risiko terbesar bukan teknis, melainkan terlalu banyak ambisi animasi dalam waktu terbatas dan keputusan privasi yang terlambat diambil.

**Risiko dan mitigasi**

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Terlalu banyak animasi membuat HP lag | Pengunjung HP keluar sebelum melihat isi | Uji di HP sejak fase awal; animasi hanya transform dan opacity; siapkan versi ringan |
| Berat halaman membengkak karena video | Muat lambat, kuota pengunjung terkuras | Kompres video, muat saat mendekati layar, batasi total video di bawah target |
| Fitur opsional menumpuk (scope creep) | Proyek tidak selesai | Kerjakan fitur wajib dulu; fitur opsional hanya setelah rilis versi pertama |
| Metadata lokasi ikut terpublikasi | Lokasi pribadi terbuka | Buang metadata, periksa ulang dengan alat EXIF, pakai daftar periksa privasi |
| Pacar tidak setuju sebagian foto | Foto harus diganti mendadak | Minta persetujuan sejak tahap kurasi, bukan setelah selesai |
| Waktu terbatas karena kuliah | Jadwal mundur | Pecah menjadi milestone kecil; tentukan batas waktu per fase |
| Autoplay video diblokir (mode hemat daya iOS dan lainnya) | Video latar tidak bergerak | Selalu sediakan poster; jangan bergantung pada autoplay untuk informasi penting |
| Bundel Three.js besar | Halaman awal lambat | Muat hanya di bab langit cerah dan pisahkan sebagai chunk sendiri |
| Batas gratis hosting atau penyimpanan terlampaui | Video tidak tampil | Cek batas layanan sebelum memilih; siapkan layanan alternatif |
| Musik atau font bermasalah lisensi | Konten bisa diturunkan | Pakai sumber berlisensi jelas dan simpan buktinya |

**Pertanyaan terbuka (perlu diputuskan sebelum atau selama pengerjaan)**

- [ ] Nama final website dan alamat yang diinginkan?
- [ ] Tanggal pendakian dan jalur yang dipakai, serta angka ketinggian basecamp dan puncak yang akan ditampilkan (perlu dicek dari sumber resmi)?
- [ ] Apakah pacar sudah setuju fotonya tampil publik, dan foto mana yang tidak boleh?
- [ ] Lagu apa yang ingin dipakai, dan dari sumber berlisensi apa?
- [ ] Tingkat privasi bagian pribadi: sederhana atau aman (lihat bagian 11)?
- [ ] Ada tanggal spesial atau tenggat yang ingin dikejar untuk rilis?
- [ ] Hosting dan penyimpanan video yang akhirnya dipilih?
- [ ] Berapa jumlah media final per bab setelah kurasi?

**Lampiran A. Template caption**

Caption yang baik menyebut perasaan atau cerita di balik foto, bukan isi gambarnya. Gunakan pertanyaan pemantik berikut untuk setiap foto.

| Bab | Pertanyaan pemantik | Contoh gaya |
| --- | --- | --- |
| Sabana | Apa yang kalian rasakan saat akhirnya melihat hamparan terbuka? | "Napas masih ngos-ngosan, tapi pemandangannya bayar semuanya." |
| Puncak | Apa yang dikatakan atau ditertawakan saat sampai? | "Akhirnya. Jangan tanya soal kaki." |
| Langit cerah | Apa yang terjadi di momen diam itu? | "Kami berhenti ngobrol. Menikmati biru yang membentang luas." |
| Sunrise | Apa yang berubah saat cahaya pertama muncul? | "Hari itu dimulai dengan garis emas fajar yang hangat." |
| Foto berdua | Apa yang kalian ingat dari detik sebelum foto diambil? | Satu kalimat pendek dan jujur |

Contoh di tabel hanyalah gaya; tulis ulang dengan kalimat dan kejadian nyata kalian.

**Lampiran B. Daftar periksa media per item**

- [ ] Dipilih sebagai media terbaik di bab tersebut
- [ ] Diberi nama berpola (`bab-nomor`)
- [ ] Caption dan teks alt ditulis
- [ ] Metadata dibuang dan sudah diperiksa
- [ ] Dikonversi ke WebP (foto) atau dikompres (video)
- [ ] Disetujui untuk tampil publik, atau ditandai `publik: false`

**Lampiran C. Istilah**

| Istilah | Arti singkat |
| --- | --- |
| Scrollytelling | Cerita yang berkembang mengikuti gerakan scroll |
| Island (Astro) | Bagian halaman yang memuat JavaScript sendiri, sisanya HTML statis |
| Lazy loading | Memuat gambar atau video hanya saat mendekati layar |
| EXIF | Metadata dalam file foto, termasuk koordinat GPS dan waktu |
| Poster | Gambar pengganti video sebelum diputar atau saat tidak bisa diputar |
| LCP, CLS, INP | Metrik kecepatan dan stabilitas halaman dari Google |