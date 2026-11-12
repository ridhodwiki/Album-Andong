# Andong, Berdua — Album Kenangan Pendakian Gunung Andong 1.726 mdpl

Website album kenangan pendakian berdua menyusuri Gunung Andong via Basecamp Pendem (1.300 mdpl) hingga Puncak Andong (1.726 mdpl). Dibangun dengan estetika editorial scrollytelling, galeri polaroid tali gantung yang dinamis, latar belakang awan 3D Vanta.js Clouds, dan halaman rahasia terenkripsi WebCrypto AES-GCM.

---

## 🌟 Fitur Utama

1. **Perjalanan Cahaya & Suasana (Scrollytelling 7 Bab)**:
   - **00 Pembuka** (1.300 mdpl): Hening hutan malam di Basecamp Pendem.
   - **01 Sabana** (1.540 mdpl): Desir ilalang dengan Polaroid Line Carousel bergoyang.
   - **02 Tanpa Dokumentasi** (1.680 mdpl): Tanjakan terjal minim foto yang nyata dan jujur.
   - **03 Puncak** (1.726 mdpl): Dingin dan heningnya puncak pertama kali.
   - **04 Langit Cerah** (1.726 mdpl): Hamparan biru lapang 360° menghadap G. Merbabu & Telomoyo.
   - **05 Sunrise** (1.726 mdpl): Hangatnya fajar keemasan yang terbit bersama.
   - **06 Penutup** (1.726 mdpl): Refleksi perjalanan dan tautan ke halaman khusus.

2. **Latar Belakang 3D Awan Interaktif (Vanta.js Clouds + Three.js)**:
   - Efek pergerakan awan 3D halus di seluruh latar website yang merespons pergerakan kursor mouse di desktop dan tetap lancar digeser di mobile.

3. **Polaroid Line Carousel & Asymmetric Grid**:
   - Foto bergaya cetakan polaroid tergantung pada tali jemuran lentur dengan fisika ayunan inersia teredam dan dukungan navigasi keyboard/drag sentuh.
   - Modal dialog pembesar layar penuh (Accessible Lightbox) dengan caption dan navigasi sentuh.

4. **Kriptografi Sisi Klien (`/rahasia`)**:
   - Pesan dan memori tersembunyi yang dienkripsi secara statis dengan **WebCrypto AES-GCM + PBKDF2 (100.000 iterasi)**.
   - Hanya dapat dibuka di browser jika pengunjung memasukkan kata sandi yang sesuai.

5. **Audio Suara Alam**:
   - Pemutar audio ambient pegunungan prosedural berbasis Web Audio API tanpa autoplay paksa.

---

## 🛠️ Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (Static Site Generation / Islands Architecture)
- **Komponen Interaktif**: React 19 (`@astrojs/react`)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Tipografi**: Playfair Display Variable (Editorial Header) & DM Sans Variable (Body/UI)
- **3D Background**: Vanta.js Clouds + Three.js r134
- **Pengujian**: Vitest + Playwright

---

## 🚀 Memulai Pengembangan

### 1. Prasyarat
- Node.js versi 20 ke atas.

### 2. Instalasi & Menjalankan Dev Server
```bash
npm install
npm run dev
```
Buka browser di `http://localhost:4321/`.

### 3. Skrip Perintah Tersedia
| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server pengembangan lokal |
| `npm run build` | Membuat bundel statis siap produksi di folder `dist/` |
| `npm run preview` | Meninjau bundel produksi lokal |
| `npm run check` | Memeriksa integritas tipe dan template Astro (astro check) |
| `npm test` | Menjalankan unit test kriptografi dengan Vitest |
| `npm run check:media` | Memeriksa kesiapan foto asli vs placeholder |

---

## 🔐 Mengganti Sandi Halaman Rahasia
1. Buka berkas `scripts/enkripsi-rahasia.ts`.
2. Ubah isi teks surat atau kata sandi default.
3. Jalankan generator file terenkripsi:
   ```bash
   npx tsx scripts/enkripsi-rahasia.ts
   ```
4. Bangun ulang proyek: `npm run build`.

---

## 📄 Lisensi & Privasi
Dibuat dengan cinta untuk mengenang langkah-langkah kecil di Gunung Andong. Foto asli dan catatan pribadi dilindungi dari pengindeksan mesin pencari via `robots.txt` dan `noindex`.
