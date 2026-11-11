import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { isLightMode } from "./gerak";

export function initScroll() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    if (isLightMode()) return;
    const desktop = matchMedia("(min-width: 1024px)").matches;
    const lenis = desktop ? new Lenis({ duration: 1.1, smoothWheel: true }) : null;
    const tick = (time: number) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
    }
    document.querySelectorAll<HTMLElement>(".data-muncul").forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });
    gsap.timeline({ scrollTrigger: { trigger: "#sunset", start: "top bottom", end: "bottom top", scrub: true } })
      .fromTo("#sunset", { backgroundColor: "#F2A65A" }, { backgroundColor: "#8E4585" })
      .to("#sunset", { backgroundColor: "#1A1030" });
    if (desktop) ScrollTrigger.create({ trigger: "#panorama-puncak", start: "top 10%", end: "+=150%", pin: true });
    if (desktop) gsap.fromTo(".sky-light", { yPercent: -5 }, { yPercent: 5, scrollTrigger: { trigger: "#langit-cerah", start: "top bottom", end: "bottom top", scrub: true } });
    return () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
    };
  });
}
