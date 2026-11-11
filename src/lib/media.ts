import images from '../generated/media.json';
export function responsiveImage(path: string) {
  const image = images[path as keyof typeof images];
  if (!image) throw new Error('Public image missing from generated manifest: ' + path);
  return image;
}
