export function luminance(rgb: number[]) {
  const linear = rgb.map(value => {
    const channel = value / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}

export function contrast(a: number[], b: number[]) {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

export function sunriseText(background: string) {
  const rgb = background.match(/[\d.]+/g)!.slice(0, 3).map(Number);
  // Keep the PRD palette where possible; the transition also needs AA contrast.
  for (const [color, channels] of [
    ["#FFF4E0", [255, 244, 224]], ["#2A1B3D", [42, 27, 61]],
    ["#FFFFFF", [255, 255, 255]], ["#000000", [0, 0, 0]],
  ] as const) {
    if (contrast(rgb, [...channels]) >= 4.5) return color;
  }
  return "#000000";
}
