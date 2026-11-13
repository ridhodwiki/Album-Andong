import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import Galeri from "../src/components/Galeri";

it("renders every carousel photo in the static fallback before hydration", () => {
  const html = renderToStaticMarkup(createElement(Galeri, { tampil: "carousel", slides: [
    { image: "/one.jpg", title: "Sabana" },
    { image: "/two.jpg", alt: "Puncak" },
  ] }));
  expect(html.match(/<button /g)).toHaveLength(2);
  expect(html).toContain('Sabana');
  expect(html).toContain('alt="Puncak"');
  expect(html).not.toContain('<dialog');
});

it("renders video items in the gallery grid with video preview badge", () => {
  const html = renderToStaticMarkup(createElement(Galeri, { tampil: "keduanya", slides: [
    { jenis: "foto", image: "/one.webp", title: "Foto Sabana" },
    { jenis: "video", videoSrc: "/video/video_sabana1.webm", title: "Video Sabana", tampil: "grid" },
  ] }));
  expect(html).toContain('<video src="/video/video_sabana1.webm"');
  expect(html).toContain('▶ Video');
});
