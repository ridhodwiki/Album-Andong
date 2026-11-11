import { afterEach, expect, it, vi } from "vitest";
import { initVideos } from "../src/lib/video";

afterEach(() => vi.unstubAllGlobals());

function fixture(light = false) {
  const chapter = {};
  const observers: ((entries: { isIntersecting: boolean }[]) => void)[] = [];
  const videos = [0, 1].map(() => {
    const button = Object.assign(new EventTarget(), { textContent: "", setAttribute: vi.fn() });
    const wrapper = { dataset: {} as Record<string, string>, querySelector: () => button };
    const video = Object.assign(new EventTarget(), {
      paused: true, src: "", dataset: { src: "https://example.com/test.mp4" },
      load: vi.fn(), getAttribute: () => video.src,
      closest: (selector: string) => selector === ".video-wrapper" ? wrapper : chapter,
      pause: vi.fn(() => { video.paused = true; video.dispatchEvent(new Event("pause")); }),
      play: vi.fn(async () => { video.paused = false; video.dispatchEvent(new Event("play")); }),
    });
    return { video, button, wrapper };
  });
  vi.stubGlobal("document", Object.assign(new EventTarget(), { hidden: false, querySelectorAll: () => videos.map(v => v.video) }));
  vi.stubGlobal("window", new EventTarget());
  vi.stubGlobal("navigator", { connection: { saveData: light } });
  vi.stubGlobal("location", { search: "" });
  vi.stubGlobal("matchMedia", () => Object.assign(new EventTarget(), { matches: false }));
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: typeof observers[number]) { observers.push(callback); }
    observe() {} disconnect() {}
  });
  const dispose = initVideos();
  return { videos, observers, dispose };
}

it("pauses the previous video in a chapter and pauses offscreen video", async () => {
  const { videos, observers, dispose } = fixture();
  observers[0]([{ isIntersecting: true }]); await Promise.resolve();
  observers[1]([{ isIntersecting: true }]); await Promise.resolve();
  expect(videos[0].video.paused).toBe(true);
  expect(videos[1].video.paused).toBe(false);
  observers[1]([{ isIntersecting: false }]);
  expect(videos[1].video.paused).toBe(true); dispose();
});

it("keeps the poster in light mode but supports explicit play", async () => {
  const { videos, observers, dispose } = fixture(true);
  observers[0]([{ isIntersecting: true }]);
  expect(videos[0].video.src).toBe("");
  videos[0].button.dispatchEvent(new Event("click")); await Promise.resolve();
  expect(videos[0].video.play).toHaveBeenCalledOnce(); dispose();
});

it("allows retry after autoplay rejection without hiding the play button", async () => {
  const { videos, observers, dispose } = fixture();
  videos[0].video.play.mockRejectedValueOnce(new Error("NotAllowedError"));
  observers[0]([{ isIntersecting: true }]); await Promise.resolve();
  expect(videos[0].wrapper.dataset.fallback).toBe("poster");
  expect(videos[0].button.textContent).toBe("Putar Video");
  videos[0].button.dispatchEvent(new Event("click")); await Promise.resolve();
  expect(videos[0].video.paused).toBe(false); dispose();
});
