# Audit kepatuhan Andong, Berdua — Gerbang 2–4

Tanggal audit: 11 November 2026 (Asia/Jakarta). Repo: `E:\Andong-project`. Commit lokal: `da663fb7ad9aa31c62eac70f4ea09b06841ddefa`. URL: https://album-andong.vercel.app/.

## Dasar, cakupan, dan metode

PRD dibaca sampai akhir, termasuk lampiran A–C. Berkas aktual adalah **`PRD Website Kenangan Gunung Andong.md`**, bukan nama dengan underscore yang disebut dalam permintaan. Working tree sebelum audit: PRD lama `prd_website_kenangan_gunung_andong.md` berstatus dihapus dan PRD baru belum dilacak. Audit memakai isi PRD aktual; tidak mengubah keduanya. Nomor bagian PRD dipakai sebagai referensi persyaratan; path:baris di bawah menunjuk bukti implementasi lokal, bukan jaminan bahwa deployment identik dengan commit lokal.

Semua foto masih placeholder AI. **Seluruh angka performa bersifat sementara.** Persetujuan foto, kebenaran isi caption terhadap kejadian/foto asli, wajah orang asing, dan plat nomor **ditunda**. Gerbang 5 belum diaudit. Rekomendasi bukan keputusan perubahan PRD.

Status: **Sesuai** hanya untuk persyaratan yang bukti cakupannya tersedia; **Menyimpang** untuk perbedaan teridentifikasi; **Belum** untuk implementasi yang belum tersedia; **Tidak bisa diperiksa** untuk pengujian yang tidak berhasil/alat atau bukti tidak tersedia. Fitur opsional yang belum ada tidak otomatis menggagalkan gerbang.

### Inventaris skill dan tool

| Kelompok tersedia | Pemakaian dalam audit |
| --- | --- |
| `agent-skills:frontend-ui-engineering` | Dipakai: komponen, keyboard, bahasa, responsif, ukuran teks, keadaan fallback; instruksi telah dibaca dalam sesi ini. |
| `agent-skills:debugging-and-error-recovery` | Dipakai: build, reproduksi browser, pemisahan hasil gagal dan dugaan; instruksi telah dibaca dalam sesi ini. |
| `agent-skills:browser-testing-with-devtools` | Dipakai: DOM, konsol, emulasi, trace, Lighthouse; dibaca untuk audit ini. |
| `agent-skills:performance-optimization` | Dipakai: ukur sebelum menyimpulkan, bedakan lab dan field; dibaca untuk audit ini. |
| `agent-skills:security-and-hardening` | Dipakai: sumber rahasia, riwayat Git, batas privasi; dibaca untuk audit ini. |
| Code review, investigate-first, RTK/Headroom/Ponytail | Prinsip pemeriksaan bukti dan pembatasan output dipakai. Tidak mengklaim penghematan token terukur atau intersepsi runtime. |
| Skill alternatif UI/UX: design-taste, frontend-design-premium, impeccable, antislop UI/mobile, redesign, design-system | Tersedia; tidak menjalankan workflow desain/implementasi yang tumpang tindih. Acuan visual adalah PRD, bukan selera desain baru. |
| E2E, TDD, shipping, git workflow, migrasi, CI/CD | Tersedia; tidak membuat suite, memperbaiki kode, melakukan commit/push/deploy, atau mengubah konfigurasi. Audit browser dilakukan langsung. |
| CAD/manufaktur, presentasi, imagegen, logo/brand, Cloudflare, OpenAI API/agents, pets, skill installation | Dilewati: tidak berkaitan dengan audit situs Astro yang sudah ada dan tidak perlu membuat aset/layanan baru. |
| Shell melalui `rtk proxy`, Git, Node/npm, rg | Dipakai untuk build, pencarian, data, bundel, dan riwayat. |
| Chrome DevTools MCP | Dipakai: new_page, emulate, evaluate_script, list_console_messages, performance_start_trace, lighthouse_audit. |
| Playwright MCP | Dipakai: browser_run_code_unsafe untuk navigasi, viewport, reduced motion, keyboard, dan konteks tanpa JavaScript. Tidak mengubah source repo. |
| Supabase/database; CAD; document control; Sites; plugin management; layanan akun | Tersedia tetapi dilewati: tidak diperlukan. Proyek tidak memakai database; tidak ada database yang ditambahkan. |
| Collaboration/sub-agent | Tidak dipakai pada audit ini. |

Skill yang memuat langkah perbaikan dipakai hanya bagian analisisnya. Satu-satunya berkas laporan yang dibuat di repo adalah dokumen ini. Build menghasilkan artefak normal `dist/` dan cache; Lighthouse menyimpan laporan otomatis di direktori temp sistem, bukan sebagai berkas tambahan repo.

## 1. Matriks kepatuhan

| Kode / PRD | Status | Bukti | Saran singkat |
| --- | --- | --- | --- |
| F1 — urutan bab | Menyimpang | DOM deploy: pembuka, sabana, tanpa-dokumentasi, puncak, langit-cerah, **sunrise**, penutup. `src/pages/index.astro:57`; PRD §5 meminta Sunset. | Laporkan perubahan Sunrise/Sunset untuk keputusan pemilik PRD. |
| F2 — galeri | Menyimpang | Empat island `client:visible` pada komponen bab; carousel berisi 4/2/3/4 foto. DOM deploy 26 img, **0 srcset**. `src/components/Galeri.tsx:58` grid; `src/components/ui/polaroid-line-carousel.tsx:75` kartu absolut. | Terapkan ukuran responsif dan jumlah/komposisi sesuai PRD setelah kurasi. |
| F3 — lightbox | Tidak bisa diperiksa | Klik kartu berhasil: dialog=1, fokus “Tutup penampil foto”; Esc menghasilkan dialog=0. `src/components/Lightbox.tsx:27` showModal, :90 backdrop. Pengujian Enter awal menghasilkan dialog=0, tetapi pemeriksaan terlalu cepat dan tidak menunggu state React; bukan bukti final kegagalan keyboard. Swipe, panah, siklus Tab, ketuk luar, dan pemulihan fokus setelah dialog nyata belum diuji lengkap. | Ulangi matriks input dengan penantian state; jangan menganggap semua kriteria terpenuhi dari Esc saja. |
| F4 — video | Belum | Deploy memiliki **0 video**. `src/components/bab/Puncak.astro:56` hanya poster; `src/components/Video.astro:62` play, :64 pause. Komponen belum punya kontrol jeda yang terlihat. | Sediakan media video lalu uji satu video aktif, pause, poster, dan autoplay ditolak. |
| F5 — satu sumber caption | Menyimpang | `src/pages/index.astro:24` membaca JSON, tetapi `src/components/bab/Puncak.astro:58` caption hardcoded dan quote pada komponen bab juga hardcoded. | Jadikan data sumber tunggal; validasi menambah item cukup lewat JSON. |
| F6 — responsif | Menyimpang | Pengukuran 360–1440 px tanpa overflow halaman; pada 600 px masih 1 kolom (PRD §10: 2). Caption carousel 13 px, sedangkan §7 minimum isi 16 px. | Sesuaikan breakpoint dan ukuran teks; uji pemotongan teks secara visual. |
| F7 — Lenis | Sesuai | `src/lib/scroll.ts:13` guard reduced motion, :14 inisialisasi Lenis, durasi 1,1; :23 ticker RAF. | Pertahankan jalur native ketika reduced motion. Ini bukti implementasi, bukan klaim FPS. |
| F8 — animasi scroll | Menyimpang | `src/lib/scroll.ts:40` y=32, durasi 0,8, trigger top 88%; PRD §7 meminta foto geser 40 px/0,6 detik, pin/parallax. Implementasi reveal terutama `.data-muncul`. | Cocokkan perilaku per bab; catat bagian yang belum terimplementasi. |
| F9 — jalur/elevasi | Menyimpang | `src/components/RelKetinggian.astro:63`–:67 memakai progres seluruh dokumen, sehingga puncak tercapai di ujung halaman; bukan saat bab Puncak. SVG jalur bersifat statis. | Kaitkan elevasi dengan bab dan jalur dengan scroll sesuai PRD. |
| F10 — warna Sunset | Belum | Bab Sunrise pada `src/pages/index.astro:57`; tema `src/styles/global.css:82`. Tidak ditemukan implementasi interpolasi tiga warna Sunset. | Implementasikan hanya setelah keputusan penyimpangan bab jelas. |
| F11 — musik | Belum | `public/audio/musik.mp3` tidak ada. Tombol dan suara angin prosedural tersedia pada `src/components/MusikToggle.astro`; musik memang belum disediakan pemilik. | Tambahkan musik berizin dan bukti lisensi; jangan menyamakan suara sintetis dengan musik final. |
| F12 — cahaya Langit Cerah | Menyimpang | `src/components/VantaCloudsGlobal.astro:11` memuat Three.js global sinkron; :28 Vanta CLOUDS. PRD F12 meminta CSS/SVG/GSAP tanpa library 3D dan hanya saat terlihat. | Catat global Vanta sebagai penyimpangan, bukan pengganti yang otomatis diterima. |
| F13 — pribadi | Tidak bisa diperiksa | `src/pages/rahasia.astro:5`, `src/layouts/Layout.astro:32`, `public/robots.txt:3`: halaman terpisah, noindex, disallow. Dekripsi login end-to-end tidak dijalankan karena sandi aktif tidak diberikan. | Verifikasi dengan sandi pemilik tanpa menuliskannya di laporan. |
| F14 — reduced motion | Menyimpang | Runtime: Vanta tidak aktif, tetapi **4 animasi CSS masih running**. `src/components/ui/polaroid-line-carousel.tsx:95` hanya mematikan sebagian animasi; `src/styles/global.css` smooth scroll tidak memiliki override reduced motion. | Terapkan hemat gerak menyeluruh dan latar statis yang terbaca. |
| F15 — bagikan/OG | Belum | `src/layouts/Layout.astro:35` dst. memuat OG/Twitter; tombol bagikan tidak ditemukan pada UI yang diperiksa. | Lengkapi tombol dan uji pratinjau berbagi; OG saja belum memenuhi seluruh F15. |
| F16 — loading screen | Belum | Tidak ditemukan pada layout/halaman yang diperiksa. | Opsional; tidak menghalangi gerbang sendiri. |
| F17 — shader cahaya | Belum | Vanta awan tersedia, tetapi bukan efek shader cahaya lokal Langit Cerah sebagaimana PRD. | Jangan menganggap awan global memenuhi fitur ini. Opsional. |
| F18 — efek kursor | Belum | `VantaCloudsGlobal.astro:30` mouseControls mengendalikan awan; tidak ada jejak/cahaya kursor sesuai deskripsi F18. | Opsional. |
| F19 — peta interaktif | Belum | `src/components/bab/Puncak.astro:29` checkpoint berupa kartu statis. | Opsional; tidak perlu ditambahkan untuk kelulusan fitur wajib. |
| F20 — countdown | Belum | Template pribadi dan sumber konten `scripts/enkripsi-rahasia.ts` tidak mengimplementasikan countdown. | Opsional. |
| §2/§10 — Performance mobile ≥85 | Tidak bisa diperiksa | Tool Lighthouse MCP mengecualikan Performance; `npm ls lighthouse --depth=0` kosong. Runner Performance mandiri tidak tersedia dalam dependensi proyek. | Jalankan Lighthouse Performance terpisah; skor Accessibility bukan penggantinya. |
| §2/§10 — LCP <2,5 s | Menyimpang | Trace deploy cold load: **5.248 ms**, Slow 4G, CPU 4×, viewport 390×844. | Periksa render delay dan aset awal. Angka sementara, satu sampel. |
| §2/§10 — awal <3 MB | Menyimpang | Navigation + resource transferSize sebelum scroll: **3.187.406 byte**, 11 resource entries. | Turunkan transfer awal; angka sementara, lihat metode di bawah. |
| §10 — CLS <0,1 | Sesuai | Trace yang sama: **CLS 0,00**, hanya initial-load window. | Sementara; bukan bukti CLS sepanjang semua interaksi. |
| §10 — INP <200 ms | Tidak bisa diperiksa | Tidak tersedia CrUX untuk URL dalam trace; INP interaksi tidak dihasilkan oleh run yang dilakukan. | Ukur interaksi/field secara terpisah; jangan substitusi TBT. |
| §2/§10 — ≥30 FPS HP | Tidak bisa diperiksa | HP fisik kelas menengah tidak tersedia; emulasi CPU 4× tidak membuktikan FPS perangkat nyata. | Profilkan scroll/galeri di perangkat nyata. |
| §2 — media terpilih bercaption | Sesuai | Pemeriksaan JSON: 15 item, semua caption dan alt tidak kosong; 15 ID unik, 0 rujukan file hilang. | Kebenaran caption terhadap media asli ditunda. |
| §2 — persetujuan dan portofolio | Tidak bisa diperiksa | Persetujuan media asli ditunda; tautan footer `src/components/bab/Penutup.astro` menuju github.com generik. | Konfirmasi persetujuan saat media asli tersedia; tautkan repo yang benar. |
| §5 — pembuka/puncak/langit | Menyimpang | Hero berisi teks, runtime hero tanpa video; `Pembuka.astro` tidak merender foto panorama. Puncak memakai poster biasa; tidak ada pin 150vh. Langit memakai panorama skematis dan awan global. | Bandingkan tiap spesifikasi bab, termasuk tanggal hero dan quote penutup Langit Cerah. |
| §7 — tipografi/palet | Menyimpang | Caption carousel 13 px; `Galeri.tsx:87` text-xs. Latar global transparan/Vanta berbeda dari palet per bab. | Palet PRD bersifat usulan, tetapi penyimpangan tetap dicatat; ukuran minimum bukan sekadar pilihan palet. |
| §9 — skema/rujukan | Sesuai | Build memvalidasi collection `src/content.config.ts:5`–:35; pemeriksaan tambahan menemukan 15 item foto valid, ID unik, alt/caption terisi, file ada, publik boolean. | JSON memakai array bab/id dan path penuh, berbeda representasi dari contoh PRD; tidak otomatis merupakan cacat. |
| §9 — WebP/tiga ukuran | Menyimpang | `public/foto`: 16 berkas, **0 WebP**. `scripts/siapkan-foto.mjs:35` satu ukuran 2400 px, :36 quality 82; PRD meminta 600/1200/1920. | Selaraskan pipeline sebelum media final; ukuran placeholder bukan hasil media final. |
| §9 — video eksternal | Tidak bisa diperiksa | Tidak ada video aktif pada deploy. | Verifikasi format, durasi, hosting, poster, audio saat media tersedia. |
| §9/§11 — media pribadi | Menyimpang | Git melacak `public/foto/rahasia-cover.jpg` dan `public/rahasia.bin`; `scripts/enkripsi-rahasia.ts:20` menunjuk cover publik, :26 menunjuk sabana-01 yang juga publik. | JSON terenkripsi tidak menyembunyikan file gambar publik; putuskan konten non-sensitif sesuai tingkat sederhana PRD. |
| §10 — lazy/island/bundel | Menyimpang | Galeri client:visible dan img lazy ada; semua gambar deploy tanpa srcset; Three/Vanta dimuat global, bukan chunk lokal saat Langit Cerah terlihat. | Pertahankan island/lazy, perbaiki strategi aset sesuai PRD. |
| §10 — tanpa JS | Menyimpang | Konteks JS off: 6 section, 26 img, 4 carousel; `polaroid-line-carousel.tsx:75` kartu absolut left:0/top:0 dan posisi dihitung JS. Fallback grid tidak ada di Puncak (`Puncak.astro:67` carousel). | Sediakan susunan statis agar semua foto tetap dapat dinikmati. Kehadiran img di DOM tidak membuktikan terlihat semuanya. |
| §10 — WebGL/autoplay/hemat data | Tidak bisa diperiksa | Skenario WebGL null + play ditolak dicoba, tetapi goto timeout 30 detik sebelum observasi. Pencarian saveData/effectiveType tidak menemukan guard. | Ulangi kasus terpisah; poster tanpa WebGL dan koneksi hemat data belum terbukti. |
| §10 — kontras | Menyimpang | Lighthouse mobile: 18 node kontras rendah; judul Tanpa Dokumentasi **1,04:1**, badge **1,53:1**, petunjuk galeri **4,07:1**. | Perbaiki latar statis dan warna teks; target PRD 4,5:1. |
| §10 — lang caption | Menyimpang | DOM deploy memiliki **0 elemen lang=en**. `Layout.astro:24` lang=id; caption Inggris mewarisinya. | Tandai fragmen Inggris, bukan mengganti seluruh bahasa situs. |
| §10 — accessible name | Menyimpang | Lighthouse: 12 node label-content-name-mismatch, termasuk musik dan tombol grid. `Galeri.tsx:62` aria-label memakai alt Indonesia, bukan judul/caption terlihat. | Selaraskan nama aksesibel dengan teks terlihat. |
| §11 — metadata GPS | Tidak bisa diperiksa | Skrip sharp ada, tetapi pemeriksaan EXIF seluruh foto/video tidak dijalankan; bukti pipeline bukan bukti berkas bebas GPS. | Audit metadata hasil final dan placeholder bila tetap dipublikasikan. |
| §11 — persetujuan/wajah/plat/caption sensitif | Tidak bisa diperiksa | **Ditunda**: semua media placeholder AI, tidak ada persetujuan media asli yang diaudit. | Periksa setiap media final sebelum rilis. |
| §11 — rahasia riwayat | Menyimpang | Dua commit lama memiliki sandi default literal dan petunjuk UI: `81f4aa3:scripts/enkripsi-rahasia.ts:10`, `81f4aa3:src/pages/rahasia.astro:62`, juga `2bcddce`. | Rotasi bila masih dipakai; penghapusan dari HEAD tidak menghapus riwayat. Nilai disamarkan. |
| §11 — HTTPS/noindex/robots | Sesuai | URL deploy terbuka melalui HTTPS; sumber `Layout.astro:32`, `rahasia.astro:5`, `public/robots.txt:3`. Bukti noindex adalah source/build lokal, belum fetch halaman pribadi deploy. | Verifikasi header/meta deploy pribadi sebelum rilis. |
| §11 — lisensi/dependensi/header | Tidak bisa diperiksa | Musik belum tersedia; font self-host lewat paket. Bukti lisensi, npm audit terbaru, dan header keamanan deploy tidak diperiksa dalam run ini. | Lengkapi bukti; jangan menyimpulkan aman dari build berhasil. |

## 2. Gerbang 2 — build dan deploy

- `rtk proxy npm run build`: **exit 0**, Astro static output, **2 halaman**, `/` dan `/rahasia/`, selesai **8,29 detik**. Log yang dikembalikan tidak memuat warning/error. Node yang digunakan: **v24.21.0**.
- URL Vercel dapat dibuka tanpa login melalui Chrome DevTools dan Playwright; judul halaman “Andong, Berdua — Album Kenangan Pendakian”. Tidak terjadi pengalihan login.
- Konsol initial load pada run DevTools: **0 error/warning**. Ini tidak mencakup seluruh interaksi dan kasus gagal.
- Log build Vercel, deployment ID/commit, serta URL preview PR yang berbeda dari alias publik **tidak dijalankan/diperiksa**: tidak tersedia akses log atau URL preview terpisah. Situs yang hidup tidak membuktikan build Vercel terbaru berasal dari commit lokal.
- Artefak JS lokal (byte tidak terkompresi): React client **212.853**, Layout/scroll **132.598**, Galeri **15.290**, React shared **8.412**. Total empat chunk **369.153 byte**; tidak termasuk vendor di public, CSS, gambar, dan font. Angka bundel bukan berat transfer halaman.

## 3. Pengukuran deploy — sementara

Trace initial load dilakukan dengan Chrome **157.0.0.0**, host Windows, viewport **390×844**, DPR 1, mobile/touch emulation, CPU slowdown **4×**, jaringan **Slow 4G**, reload dengan **ignoreCache=true**, sebelum scroll. Trace sekitar 13,36 detik. Hanya **satu sampel**; bukan median tiga run dan bukan pengukuran HP fisik.

| Ukuran | Hasil sementara | Target PRD | Kesimpulan terbatas |
| --- | --- | --- | --- |
| Lighthouse Performance mobile | tidak dijalankan: tool MCP tidak menyediakan kategori Performance; dependency lighthouse lokal kosong | ≥85 | Tidak dapat dinilai; tidak memasang dependency baru dalam audit ini. |
| LCP | 5.248 ms; TTFB 569 ms; render delay 4.679 ms | <2.500 ms pada 4G | Melebihi target pada run ini. |
| CLS | 0,00 | <0,1 | Memenuhi pada initial-load window ini. |
| INP | tidak dijalankan sampai memperoleh metrik interaksi; CrUX tidak tersedia menurut trace | <200 ms | Tidak dapat dinilai. |
| Transfer awal | 3.187.406 byte = 3,187 MB desimal / 3,040 MiB | <3 MB | Melebihi kedua interpretasi ambang 3 MB/MiB. |
| FPS | tidak dijalankan pada HP fisik; belum ada angka FPS dari trace | ≥30 HP | Kelancaran tidak terbukti. |

Transfer dihitung dari `performance.getEntriesByType('resource').transferSize` ditambah navigation transferSize; 11 resource entries setelah muat, sebelum scroll. Ini ukuran yang teramati pada Resource Timing, bukan HAR terverifikasi untuk seluruh request yang mungkin tidak terekspos. Tidak memakai ukuran seluruh folder sebagai pengganti transfer awal.

Lighthouse MCP **mobile navigation** terpisah pada emulasi 360×800/reduced motion: Accessibility **96**, Best Practices **100**, SEO **100**, Agentic Browsing **100**. **Bukan skor Performance.** Dua audit gagal: color-contrast (18 node) dan label-content-name-mismatch (12 node). Hasil ini juga memperlihatkan reduced motion tidak menyediakan latar statis yang cukup kontras untuk judul bab gelap.

### Responsif dan perilaku

| Viewport CSS | Lebar scroll dokumen | Grid terukur | Catatan |
| --- | --- | --- | --- |
| 360 | 345 | 1 kolom | Tidak overflow dokumen; caption 13 px. |
| 390 | 375 | 1 kolom | Sama. |
| 600 | 585 | 1 kolom | Menyimpang dari 2 kolom PRD. |
| 768 | 753 | 2 kolom | Struktur kolom sesuai rentang ini. |
| 1024 | 1009 | 3 kolom | Struktur kolom sesuai rentang ini. |
| 1440 | 1425 | 3 kolom | Struktur kolom sesuai rentang ini. |

Selisih 15 px berasal dari ruang scrollbar browser; hasil ini tidak membuktikan semua teks bebas clipping karena overflow hidden/line clamp tetap bisa menyembunyikan isi. Pemeriksaan visual screenshot menyeluruh **tidak dijalankan**; hasil responsif terbatas pada DOM/computed geometry. Lebar 1920 PRD di luar rentang 360–1440 yang diminta audit ini, tidak dijalankan.

Reduced motion: Vanta nonaktif, 4 animasi CSS tetap running, enam section tetap ada. JavaScript off: enam section dan 26 gambar ada, empat carousel setinggi 560 px dengan jumlah kartu 4/2/3/4. Source menunjukkan posisi absolut bergantung pada JS; fallback belum memenuhi akses semua foto.

Lightbox: klik kartu membuka dialog dan memfokuskan tombol tutup; Esc menutupnya. Uji Enter awal tanpa menunggu update React tidak konklusif. Uji ulang keyboard dan sampling transform offscreen terjadwal setelah eksperimen fallback, tetapi **tidak dijalankan** karena navigasi eksperimen timeout lebih dahulu. Tidak mengklaim animasi bebas kebocoran: hanya ada bukti statis guard IntersectionObserver/cancel RAF pada `polaroid-line-carousel.tsx:224`–:236. Vanta global tidak punya pembatas chapter visibility pada `VantaCloudsGlobal.astro:28`.

WebGL tidak tersedia/autoplay ditolak: percobaan konteks baru memasang getContext WebGL=null dan play() menolak, lalu navigasi timeout **30.000 ms**. Tidak ada kesimpulan fallback runtime. Deploy normal tidak memiliki video aktif, sehingga kasus autoplay video aktual belum dapat diuji. Slow 4G teruji saat trace, tetapi Save-Data tidak diuji runtime. Safari iOS, Firefox, Edge, Android/iPhone fisik **tidak dijalankan** karena perangkat/browser tersebut tidak tersedia dalam pengujian ini.

## 4. Privasi, riwayat, dan data

Build menjalankan validasi collection Astro. Pemeriksaan tambahan terhadap JSON menemukan **15 item foto, 15 ID unik, 0 item publik:false, 0 kesalahan bidang dasar/rujukan file**. Semua rujukan berkas item ada. Pemeriksaan tidak mengubah JSON atau menguji injeksi dengan menambahkan item privat.

Walaupun sekarang tidak ada item privat di JSON, `src/pages/index.astro:24` langsung memetakan seluruh `bab.items` tanpa filter `publik`. Jadi **belum ditemukan kebocoran item publik:false yang ada saat ini**, tetapi mekanisme akan merender item tersebut bila ditambahkan ke bab publik. Ini temuan source, bukan klaim eksploit terhadap data sekarang.

`public/foto/rahasia-cover.jpg` dan `public/rahasia.bin` dilacak Git. Sumber paket pribadi juga menunjuk `/foto/sabana-01.png`, yang terdapat pada JSON publik. Enkripsi surat/JSON tidak mengenkripsi gambar pada URL publik. Persetujuan dan sensitivitas sebenarnya ditunda karena placeholder; lokasi hosting tetap menyimpang dari aturan media pribadi §9.

Pemindaian riwayat mencakup **3 commit reachable dari git rev-list --all**, memakai git grep terhadap indikator variabel sandi, petunjuk sandi, format token OpenAI/GitHub dan private-key marker; lockfile dikecualikan. HEAD menggunakan environment variable dan test sandi kosong, bukan temuan token produksi. Commit `81f4aa3e917fd9b1f1079929852e80cd49e87259` dan `2bcddce1e8582536bd2be3daf4ae3eafa2dcbb38` mengandung sandi default literal dan petunjuk sandi UI. **Nilai tidak dicetak dalam laporan.**

Cakupan pemindaian berbasis pola terbatas: bukan scanner entropi penuh, tidak mencakup unreachable objects, reflog, semua secret format, atau remote ref yang belum tersedia lokal. Karena itu tidak ada klaim “repo bebas rahasia”. Paket terenkripsi lama belum diuji memakai sandi historis dan tidak dibuat ulang. Rotasi/pembersihan riwayat hanya saran, tidak dilakukan.

## 5. Implementasi yang tidak disebut atau berbeda dari PRD

1. **Vanta CLOUDS global** dengan Three.js vendor pada seluruh layout; PRD membahas cahaya Langit Cerah lokal, dengan F12 tanpa library 3D dan opsi 3D terbatas. Ini penyimpangan penempatan/jenis efek, bukan larangan mutlak semua 3D.
2. **Bab Sunrise** menggantikan Sunset. Perbedaan narasi memengaruhi F1/F10 serta spesifikasi §5/§7; tidak diputuskan benar oleh auditor.
3. **Suara angin sintetis Web Audio** sebagai fallback musik. Musik belum ditambahkan, sehingga fitur tambahan ini tidak dianggap memenuhi konten musik final.
4. **Enkripsi AES-GCM/PBKDF2 browser** untuk JSON pribadi. PRD menawarkan password sederhana atau proteksi server, tidak menetapkan mekanisme ini. Tambahan teknis ini tidak menjadikan media publik privat.
5. **Panorama gunung skematis dan dialog percakapan hardcoded** di Langit Cerah serta kartu checkpoint statis Puncak. Jangan disamakan dengan peta interaktif F19.

Tidak menganggap grid+carousel sebagai scope creep: kombinasi tersebut justru disebut PRD §5. Tidak menambahkan fitur/database atau mengubah desain berdasarkan temuan.

## 6. Ringkasan gerbang dan tiga temuan terpenting

| Gerbang | Putusan | Dasar |
| --- | --- | --- |
| 2 — build/deploy pratinjau | **Tidak lulus — bukti pratinjau belum lengkap** | Build lokal berhasil dan alias Vercel yang diberikan terbuka tanpa login. Namun alamat preview terpisah, identitas deployment/commit, dan log build Vercel belum dibuktikan. Ini kekurangan bukti terhadap definisi gerbang, bukan klaim situs gagal deploy. |
| 3 — bab lengkap tanpa animasi, nyaman di HP | **Tidak lulus** | Sunset tidak ada; reduced motion menyisakan animasi dan kontras rendah; fallback carousel tanpa JS bergantung pada posisi absolut; caption 13 px dan grid 600 px belum sesuai PRD. |
| 4 — lancar di HP menengah, versi ringan | **Tidak lulus** | ≥30 FPS pada HP nyata belum terbukti; versi ringan tidak lengkap, Vanta dimuat global, LCP dan transfer awal melewati target pada sampel sementara. |

Tiga temuan terpenting:

1. **Privasi belum dapat dinyatakan aman:** sandi default tetap di riwayat, media “pribadi” berada pada public/repo, dan jalur render tidak menyaring publik:false.
2. **Gerbang konten/aksesibilitas belum terpenuhi:** Sunrise menggantikan Sunset; reduced motion membuat beberapa judul hampir putih di putih (1,04:1), dan caption Inggris tidak diberi lang=en.
3. **Versi ringan/performa belum memenuhi bukti gerbang:** LCP 5,248 detik dan transfer 3,187 MB; Three/Vanta global; FPS/INP dan Lighthouse Performance belum tersedia. Seluruh metrik masih sementara sampai foto asli dipakai.

Audit ini tidak memperbaiki penyimpangan. Pemeriksaan yang ditunda atau tidak dijalankan tercantum di atas; **Gerbang 5 belum diaudit**.
