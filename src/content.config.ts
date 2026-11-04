import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { file } from "astro/loaders";

const mediaItemSchema = z.object({
  id: z.string(),
  jenis: z.enum(["foto", "video"]).default("foto"),
  berkas: z.string(),
  poster: z.string().optional(),
  judul: z.string().optional(),
  caption: z.string(),
  alt: z.string(),
  ukuran: z.enum(["besar", "sedang"]).default("sedang"),
  fokus: z.string().optional(),
  tampil: z.enum(["carousel", "grid", "keduanya"]).default("keduanya"),
  publik: z.boolean().default(true),
  placeholder: z.boolean().default(false),
});

const babSchema = z.object({
  id: z.string(),
  nomor: z.string(),
  nama: z.string(),
  subjudul: z.string().optional(),
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
