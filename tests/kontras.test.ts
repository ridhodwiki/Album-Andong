import { expect, it } from "vitest";
import { contrast, sunriseText } from "../src/lib/kontras";

it("keeps text above 4.5:1 throughout both sunrise color transitions", () => {
  const stops = [[43, 34, 80], [217, 98, 122], [255, 217, 160]];
  for (let leg = 0; leg < 2; leg++) {
    for (let i = 0; i <= 100; i++) {
      const rgb = stops[leg].map((v, j) => Math.round(v + (stops[leg + 1][j] - v) * i / 100));
      const color = sunriseText(`rgb(${rgb.join(",")})`);
      const text = color.slice(1).match(/../g)!.map(v => parseInt(v, 16));
      expect(contrast(rgb, text)).toBeGreaterThanOrEqual(4.5);
    }
  }
});
