import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import Galeri from "../src/components/Galeri";

it("renders each grid photo as a named native button", () => {
  const html = renderToStaticMarkup(createElement(Galeri, { tampil: "grid", slides: [
    { image: "/one.jpg", title: "Sabana" },
    { image: "/two.jpg", alt: "Puncak" },
  ] }));
  expect(html.match(/<button /g)).toHaveLength(2);
  expect(html).toContain('aria-label="Perbesar Sabana"');
  expect(html).toContain('aria-label="Perbesar Puncak"');
  expect(html).not.toContain('<dialog');
});
