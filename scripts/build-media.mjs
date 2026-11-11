import sharp from 'sharp';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const chapters = JSON.parse(await readFile('src/data/media.json', 'utf8'));
const files = new Set(chapters.flatMap(chapter => chapter.items.filter(item => item.publik).map(item => item.jenis === 'foto' ? item.berkas : item.poster)).filter(Boolean));
await mkdir('public/foto/responsive', { recursive: true });
await mkdir('src/generated', { recursive: true });
const manifest = {};
for (const source of files) {
  if (!/^\/foto\/[a-zA-Z0-9_-]+\.(png|jpe?g|webp)$/i.test(source)) throw new Error('Invalid public image path: ' + source);
  const name = source.split('/').pop().replace(/\.[^.]+$/, '');
  const variants = [];
  for (const width of [600, 1200, 1920]) {
    const output = '/foto/responsive/' + name + '-' + width + '.webp';
    const info = await sharp('public' + source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: width === 600 ? 75 : 80 }).toFile('public' + output);
    if (!variants.some(v => v.width === info.width)) variants.push({ image: output, width: info.width, height: info.height });
  }
  const preferred = variants.find(v => v.width >= 1200) || variants.at(-1);
  manifest[source] = { ...preferred, srcSet: variants.map(v => v.image + ' ' + v.width + 'w').join(', ') };
}
await writeFile('src/generated/media.json', JSON.stringify(manifest));
