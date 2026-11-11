import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import mediaData from "../src/data/media.json";

describe("media.json sesuai PRD terbaru (Sunrise)", () => {
  it("memuat urutan 7 bab sesuai PRD dengan bab 05 adalah sunrise, bukan sunset", () => {
    const ids = mediaData.map((b) => b.id);
    expect(ids).toEqual([
      "pembuka",
      "sabana",
      "tanpa-dokumentasi",
      "puncak",
      "langit-cerah",
      "sunrise",
      "penutup",
    ]);
    const bab5 = mediaData.find((b) => b.nomor === "05");
    expect(bab5?.id).toBe("sunrise");
    expect(bab5?.nama).toBe("Sunrise");
    expect(bab5?.subjudul).toBe("First Light");
    expect(bab5?.kutipan).toBe("The day began in colors no camera could get right.");
  });

  it("tidak mengandung kata sunset atau senja di seluruh media.json", () => {
    const raw = JSON.stringify(mediaData);
    expect(raw).not.toMatch(/sunset|senja/i);
  });

  it("setiap item foto publik memiliki alt, caption, dan berkas asli di public/", () => {
    const publicDir = path.resolve(process.cwd(), "public");
    for (const bab of mediaData) {
      for (const item of bab.items) {
        expect(item.alt.trim().length).toBeGreaterThan(5);
        expect(item.caption.trim().length).toBeGreaterThan(5);
        const fullPath = path.join(publicDir, item.berkas.replace(/^\//, ""));
        expect(fs.existsSync(fullPath)).toBe(true);
      }
    }
  });
});
