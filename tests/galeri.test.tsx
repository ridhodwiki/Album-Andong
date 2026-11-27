import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, it, vi } from "vitest";
import Galeri from "../src/components/Galeri";
import { openLightboxDialog } from "../src/components/Lightbox";
import PolaroidLineCarousel from "../src/components/ui/polaroid-line-carousel";

afterEach(() => vi.unstubAllGlobals());

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

it("renders video items in both the clothesline carousel and the gallery grid", () => {
  const carouselHtml = renderToStaticMarkup(createElement(PolaroidLineCarousel, { slides: [
    { jenis: "foto", image: "/one.webp", title: "Foto Sabana" },
    { jenis: "video", videoSrc: "/video/video_sabana1.webm", title: "Video Sabana", tampil: "keduanya" },
  ] }));
  expect(carouselHtml).toContain('src="/video/video_sabana1.webm"');
  expect(carouselHtml).toContain('class="pl-badge"');

  const html = renderToStaticMarkup(createElement(Galeri, { tampil: "keduanya", slides: [
    { jenis: "foto", image: "/one.webp", title: "Foto Sabana" },
    { jenis: "video", videoSrc: "/video/video_sabana1.webm", title: "Video Sabana", tampil: "keduanya" },
  ] }));
  expect(html).toContain('<video src="/video/video_sabana1.webm"');
  expect(html).toContain('▶ Video');
});

it("restores focus without scrolling when closing the lightbox", () => {
  const focus = vi.fn();
  const dialog = { showModal: vi.fn(), close: vi.fn() };
  const body = { style: { overflow: "" } };
  vi.stubGlobal("document", { body, activeElement: { focus } });

  const cleanup = openLightboxDialog(dialog);
  expect(dialog.showModal).toHaveBeenCalledOnce();
  expect(body.style.overflow).toBe("hidden");

  cleanup();
  expect(dialog.close).toHaveBeenCalledOnce();
  expect(body.style.overflow).toBe("");
  expect(focus).toHaveBeenCalledWith({ preventScroll: true });
});
