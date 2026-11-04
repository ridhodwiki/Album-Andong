import { describe, it, expect } from "vitest";
import { enkripsi, dekripsi } from "../src/lib/kripto";

describe("kripto", () => {
  it("bisa mengenkripsi dan mendekripsi string dengan sandi yang benar", async () => {
    const pesanRahasia = JSON.stringify({ pesan: "Terima kasih sudah menemani mendaki.", tanggal: "2024-09-14" });
    const sandi = "andong-berdua-2024";

    const terenkripsi = await enkripsi(pesanRahasia, sandi);
    expect(typeof terenkripsi).toBe("string");
    expect(terenkripsi.length).toBeGreaterThan(32);

    const kembali = await dekripsi(terenkripsi, sandi);
    expect(kembali).toBe(pesanRahasia);
    expect(JSON.parse(kembali).pesan).toBe("Terima kasih sudah menemani mendaki.");
  });

  it("gagal mendekripsi jika kata sandi salah", async () => {
    const pesan = "Rahasia kita berdua";
    const terenkripsi = await enkripsi(pesan, "sandi-benar");

    await expect(dekripsi(terenkripsi, "sandi-salah")).rejects.toThrow(/sandi salah/i);
  });

  it("gagal mendekripsi jika format paket rusak", async () => {
    await expect(dekripsi("pendek", "sandi")).rejects.toThrow(/tidak valid/i);
  });
});
