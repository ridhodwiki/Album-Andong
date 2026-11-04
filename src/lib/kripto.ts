/**
 * Kriptografi sisi klien & build-time berbasis WebCrypto API (AES-GCM + PBKDF2).
 * Berjalan identik di Node 20+ dan peramban modern.
 */

const ITERASI = 100_000;
const PANJANG_GARAM = 16;
const PANJANG_IV = 12;

function bufToBase64(buf: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < buf.byteLength; i++) {
    binary += String.fromCharCode(buf[i]);
  }
  return btoa(binary);
}

function base64ToBuf(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function dapatkanKunci(sandi: string, garam: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const kunciInduk = await crypto.subtle.importKey(
    "raw",
    encoder.encode(sandi),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: garam as BufferSource,
      iterations: ITERASI,
      hash: "SHA-256",
    },
    kunciInduk,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Enkripsi teks rahasia dengan kata sandi.
 * Output: string Base64 yang memuat salt (16B) + IV (12B) + ciphertext + tag.
 */
export async function enkripsi(teks: string, sandi: string): Promise<string> {
  const garam = crypto.getRandomValues(new Uint8Array(PANJANG_GARAM));
  const iv = crypto.getRandomValues(new Uint8Array(PANJANG_IV));
  const kunci = await dapatkanKunci(sandi, garam);
  const data = new TextEncoder().encode(teks);

  const cipherBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    kunci,
    data
  );

  const cipherArray = new Uint8Array(cipherBuffer);
  const hasil = new Uint8Array(PANJANG_GARAM + PANJANG_IV + cipherArray.length);
  hasil.set(garam, 0);
  hasil.set(iv, PANJANG_GARAM);
  hasil.set(cipherArray, PANJANG_GARAM + PANJANG_IV);

  return bufToBase64(hasil);
}

/**
 * Dekripsi string Base64 menggunakan kata sandi.
 * Melempar Error jika kata sandi salah atau isi paket telah rusak.
 */
export async function dekripsi(paketBase64: string, sandi: string): Promise<string> {
  const bytes = base64ToBuf(paketBase64);
  if (bytes.length < PANJANG_GARAM + PANJANG_IV + 16) {
    throw new Error("Paket terenkripsi tidak valid atau terpotong.");
  }

  const garam = bytes.slice(0, PANJANG_GARAM);
  const iv = bytes.slice(PANJANG_GARAM, PANJANG_GARAM + PANJANG_IV);
  const cipher = bytes.slice(PANJANG_GARAM + PANJANG_IV);

  const kunci = await dapatkanKunci(sandi, garam);

  try {
    const hasilBuffer = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      kunci,
      cipher
    );
    return new TextDecoder().decode(hasilBuffer);
  } catch {
    throw new Error("Kata sandi salah atau data rusak.");
  }
}
