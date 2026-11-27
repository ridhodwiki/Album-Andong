export type Lang = "id" | "en";

export const STORAGE_KEY = "andong-lang";

export const UI: Record<Lang, Record<string, string>> = {
  id: {
    skipToMain: "Lewati ke konten utama",
    lightMode: "Versi ringan",
    normalMode: "Versi normal",
    langGroup: "Pilih bahasa",
    soundOff: "Suara Alam",
    soundOn: "Suara Aktif",
    summitLabel: "Puncak",
    elevationAria: "Indikator ketinggian pendakian",
    chapterNavAria: "Daftar bab pendakian",
    navPembuka: "00. Pembuka",
    navSabana: "01. Sabana",
    navTanpaDok: "02. Jalur Gelap",
    navPuncak: "03. Puncak",
    navLangit: "04. Langit Cerah",
    navSunrise: "05. Sunrise",
    navPenutup: "06. Penutup",
    chapterPrefix: "Bab",
    scrollCue: "Gulir Untuk Memulai",
    steepClimb: "Tanjakan Terjal",
    nearRidge: "Menjelang Punggung",
    statusJacket: "Status: Saling berpegang jaket",
    distanceLabel: "Jarak: 2,4 km",
    summitCheckpoint: "05. Puncak Andong",
    dirNorth: "Utara",
    dirSouth: "Selatan",
    dirSoutheast: "Tenggara",
    firstLight: "Cahaya Pertama",
    beforeDawn: "Menjelang pagi",
    eastHorizon: "Horison timur",
    privateSectionTitle: "Halaman Khusus",
    openPrivateBtn: "Buka Bagian Pribadi",
    privateHint: "(Khusus untuk kita berdua • Masukkan kata sandi)",
    creditDoc: "Dokumentasi",
    creditDocText: "Album pendakian oleh Ridho.",
    creditTech: "Teknologi",
    creditSource: "Kode Sumber",
    galleryHint: "← Geser tali atau gunakan panah · Klik polaroid untuk memperbesar →",
    galleryHide: "Sembunyikan sebagian foto ↑",
    galleryShowMorePrefix: "Lihat ",
    galleryShowMoreSuffix: " foto lainnya di bab ini ↓",
    lightboxAria: "Penampil foto layar penuh",
    lightboxPhoto: "Foto",
    lightboxClose: "Tutup penampil foto",
    lightboxPrev: "Foto sebelumnya",
    lightboxNext: "Foto berikutnya",
    backToAlbum: "← Kembali ke Album Publik",
    secretDesc: "Bagian ini berisi foto dan pesan pribadi yang dienkripsi di browser. Masukkan kata sandi untuk membuka.",
    secretPassLabel: "Kata Sandi Rahasia",
    secretPassPlaceholder: "Masukkan kata sandi...",
    secretOpenBtn: "Buka Kenangan",
    secretOpeningBtn: "Membuka...",
    secretError: "Kata sandi belum pas. Coba lagi.",
    secretLetterTag: "Surat Terbuka • Gunung Andong",
    secretLetterHeading: "Untuk Kamu,",
    secretPrivateMoments: "Momen di Luar Rekaman Publik",
  },
  en: {
    skipToMain: "Skip to main content",
    lightMode: "Light mode",
    normalMode: "Normal mode",
    langGroup: "Select language",
    soundOff: "Ambient Sound",
    soundOn: "Sound On",
    summitLabel: "Summit",
    elevationAria: "Hike elevation indicator",
    chapterNavAria: "Chapter navigation",
    navPembuka: "00. Opening",
    navSabana: "01. Sabana",
    navTanpaDok: "02. Steep Trail",
    navPuncak: "03. Summit",
    navLangit: "04. Clear Sky",
    navSunrise: "05. Sunrise",
    navPenutup: "06. Closing",
    chapterPrefix: "Chapter",
    scrollCue: "Scroll to start",
    steepClimb: "Steep Climb",
    nearRidge: "Nearing the Ridge",
    statusJacket: "Status: Holding onto each other's jackets",
    distanceLabel: "Distance: 2.4 km",
    summitCheckpoint: "05. Andong Summit",
    dirNorth: "North",
    dirSouth: "South",
    dirSoutheast: "Southeast",
    firstLight: "First Light",
    beforeDawn: "Before dawn",
    eastHorizon: "Eastern horizon",
    privateSectionTitle: "Private Page",
    openPrivateBtn: "Open Private Section",
    privateHint: "(Just for the two of us • Password required)",
    creditDoc: "Documentation",
    creditDocText: "A hiking album by Ridho.",
    creditTech: "Built With",
    creditSource: "Source Code",
    galleryHint: "← Drag string or use arrows · Click polaroid to zoom →",
    galleryHide: "Show fewer photos ↑",
    galleryShowMorePrefix: "Show ",
    galleryShowMoreSuffix: " more photos in this chapter ↓",
    lightboxAria: "Fullscreen photo viewer",
    lightboxPhoto: "Photo",
    lightboxClose: "Close photo viewer",
    lightboxPrev: "Previous photo",
    lightboxNext: "Next photo",
    backToAlbum: "← Back to Public Album",
    secretDesc: "This page holds private photos and a note encrypted in the browser. Enter the password to unlock.",
    secretPassLabel: "Secret Password",
    secretPassPlaceholder: "Enter password...",
    secretOpenBtn: "Unlock",
    secretOpeningBtn: "Unlocking...",
    secretError: "Wrong password. Please try again.",
    secretLetterTag: "Open Letter • Mount Andong",
    secretLetterHeading: "For You,",
    secretPrivateMoments: "Off-Record Moments",
  },
};

export function getLang(): Lang {
  if (typeof window === "undefined") return "id";
  return localStorage.getItem(STORAGE_KEY) === "en" ? "en" : "id";
}

export function applyUiLang(lang: Lang): void {
  const dict = UI[lang] || UI.id;
  document.querySelectorAll<HTMLElement>("[data-ui]").forEach((el) => {
    const val = dict[el.dataset.ui || ""];
    if (val) el.textContent = val;
  });
  document.querySelectorAll<HTMLInputElement>("[data-ui-placeholder]").forEach((el) => {
    const val = dict[el.dataset.uiPlaceholder || ""];
    if (val) el.placeholder = val;
  });
  document.querySelectorAll<HTMLElement>("[data-ui-aria]").forEach((el) => {
    const val = dict[el.dataset.uiAria || ""];
    if (val) el.setAttribute("aria-label", val);
  });
  document.querySelectorAll<HTMLElement>("[data-bab-badge]").forEach((el) => {
    const nomor = el.dataset.babNomor || "";
    const elevasi = el.dataset.babElevasi || "";
    el.textContent = `${dict.chapterPrefix} ${nomor}${elevasi ? ` • ${elevasi}` : ""}`;
  });
}
