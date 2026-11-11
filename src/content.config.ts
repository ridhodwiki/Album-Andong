import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file } from "astro/loaders";

const mediaItemSchema = z.object({
  id: z.string(),
  jenis: z.enum(["foto", "video"]).default("foto"),
  berkas: z.string(),
  poster: z.string().optional(),
  judul: z.string().optional(),
  caption: z.string().trim().min(1),
  alt: z.string().trim().min(1),
  ukuran: z.enum(["besar", "sedang"]).default("sedang"),
  fokus: z.string().optional(),
  tampil: z.enum(["carousel", "grid", "keduanya"]).default("keduanya"),
  publik: z.boolean().default(true),
  placeholder: z.boolean().default(false),
}).refine(item => item.jenis !== "video" || !!item.poster?.trim(), {
  message: "Video wajib mempunyai poster", path: ["poster"],
});

const babSchema = z.object({
  id: z.string(),
  nomor: z.string(),
  nama: z.string(),
  subjudul: z.string().optional(),
  judul: z.string().optional(),
  narasi: z.array(z.string().min(1)).optional(),
  tanggal: z.iso.date().nullable().optional(),
  elevasi: z.string().optional(),
  suasana: z.string().optional(),
  kutipan: z.string().optional(),
  items: z.array(mediaItemSchema),
});

export const collections = {
  bab: defineCollection({
    loader: file("src/data/media.json"),
    schema: babSchema,
  }),
};
