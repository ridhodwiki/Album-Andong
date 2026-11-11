import sharp from 'sharp';
import { readFile, mkdir } from 'node:fs/promises';
const chapters = JSON.parse(await readFile('src/data/media.json', 'utf8'));
const files = new Set(chapters.flatMap(chapter => chapter.items.filter(item => item.publik && item.jenis === 'foto').map(item => item.berkas.replace('/foto/', ''))));
await mkdir('public/foto/responsive', { recursive: true });
for (const file of files) {
  if (!/\.(png|jpe?g)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, '');
  for (const width of [600, 1200, 1920]) {
    await sharp(`public/foto/${file}`).rotate().resize({ width })
      .webp({ quality: 80 }).toFile(`public/foto/responsive/${name}-${width}.webp`);
  }
}
