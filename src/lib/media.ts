export function responsiveImage(path: string) {
  const base = path.replace(/^\/foto\//, '').replace(/\.[^.]+$/, '');
  return {
    image: `/foto/responsive/${base}-1200.webp`,
    srcSet: [600, 1200, 1920].map(width => `/foto/responsive/${base}-${width}.webp ${width}w`).join(', '),
  };
}
