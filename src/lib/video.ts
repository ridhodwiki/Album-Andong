import { isLightMode } from "./gerak";

export function initVideos() {
  const cleanup: (() => void)[] = [];
  const videos = [...document.querySelectorAll<HTMLVideoElement>("video.lazy-video")];
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  for (const video of videos) {
    const wrapper = video.closest<HTMLElement>(".video-wrapper")!;
    const button = wrapper.querySelector<HTMLButtonElement>(".video-pause-btn");
    let visible = false;
    let pausedByUser = false;
    let autoplayBlocked = false;
    const update = () => {
      if (button) {
        button.textContent = video.paused ? "Putar Video" : "Jeda Video";
        button.setAttribute("aria-pressed", String(!video.paused));
      }
    };
    const play = async () => {
      for (const other of videos) {
        if (other !== video && other.closest("section, header") === video.closest("section, header")) other.pause();
      }
      if (!video.getAttribute("src")) {
        video.src = video.dataset.src!;
        video.load();
      }
      try {
        await video.play();
        if (!visible || document.hidden) video.pause();
        delete wrapper.dataset.fallback;
      } catch {
        autoplayBlocked = true;
        wrapper.dataset.fallback = "poster";
      }
      update();
    };
    const click = () => {
      pausedByUser = !video.paused;
      if (pausedByUser) video.pause(); else void play();
    };
    const pause = () => { if (document.hidden || isLightMode()) video.pause(); };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) video.pause();
      else if (!isLightMode() && !pausedByUser && !autoplayBlocked) void play();
    }, { threshold: 0.25 });
    observer.observe(video);
    button?.addEventListener("click", click);
    video.addEventListener("play", update);
    video.addEventListener("pause", update);
    preference.addEventListener("change", pause);
    document.addEventListener("visibilitychange", pause);
    update();
    cleanup.push(() => {
      observer.disconnect(); video.pause();
      button?.removeEventListener("click", click);
      video.removeEventListener("play", update); video.removeEventListener("pause", update);
      preference.removeEventListener("change", pause);
      document.removeEventListener("visibilitychange", pause);
    });
  }
  const dispose = () => { cleanup.forEach(fn => fn()); };
  window.addEventListener("pagehide", dispose, { once: true });
  window.addEventListener("pageshow", event => { if (event.persisted) initVideos(); }, { once: true });
  return dispose;
}
