import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { isLightMode } from "./gerak";
import { sunriseText } from "./kontras";

export function initScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const mm = gsap.matchMedia();

  mm.add(
    {
      full: "(prefers-reduced-motion: no-preference)",
      calm: "(prefers-reduced-motion: reduce)",
    },
    (ctx) => {
      const { full } = ctx.conditions!;
      const isCalm = !full || isLightMode();

      document.documentElement.dataset.ringan = String(isCalm);
      document.documentElement.dataset.motion = isCalm ? "calm" : "full";

      // 0. Smooth Scroll (Lenis di desktop saja saat mode penuh)
      const titleOriginal = document.getElementById("hero-title")?.textContent;
      const loops: gsap.core.Tween[] = [];
      const visibleLoops = new Set<gsap.core.Tween>();
      const loop = (target: string, chapter: string, vars: gsap.TweenVars) => {
        const tween = gsap.to(target, { ...vars, paused: true }); loops.push(tween);
        ScrollTrigger.create({ trigger: chapter, start: "top bottom", end: "bottom top", onToggle: self => {
          if (self.isActive) visibleLoops.add(tween); else visibleLoops.delete(tween);
          tween.paused(!self.isActive || document.hidden);
        } });
      };
      const visibility = () => loops.forEach(t => t.paused(document.hidden || !visibleLoops.has(t)));
      document.addEventListener("visibilitychange", visibility);
      let lenis: Lenis | null = null;
      let tick: ((time: number) => void) | null = null;

      if (!isCalm) {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true });
        tick = (time: number) => lenis?.raf(time * 1000);
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
      }

      // 1. Bab 00: Pembuka
      if (!isCalm) {
        const titleEl = document.getElementById("hero-title");
        if (titleEl && !titleEl.dataset.split) {
          const text = titleEl.textContent?.trim() || "";
          titleEl.textContent = "";
          const chars = text.split("").map((ch) => {
            const span = document.createElement("span");
            span.textContent = ch === " " ? "\u00A0" : ch;
            span.style.display = "inline-block";
            span.setAttribute("aria-hidden", "true");
            titleEl.appendChild(span);
            return span;
          });
          titleEl.dataset.split = "true";

          gsap.from(chars, {
            opacity: 0,
            y: 35,
            duration: 0.8,
            stagger: { amount: 0.5 },
            ease: "power3.out",
          });
        }

        gsap.fromTo(
          "#hero-bg",
          { scale: 1.06, opacity: 0.2 },
          { scale: 1, opacity: 0.35, duration: 1.4, ease: "power2.out" }
        );

        loop("#hero-scroll-dot", "#pembuka", {
          y: 8,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // Reveal elemen umum .data-muncul
      const munculElements = document.querySelectorAll<HTMLElement>(".data-muncul:not(.tanpa-dok-line), [data-gallery-card]");
      if (!isCalm) {
        munculElements.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      } else {
        munculElements.forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
        });
      }

      // 2. Bab 01: Sabana (Parallax rumput 3 lapis)
      if (!isCalm) {
        gsap.to("#sabana-rumput-1", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: "#sabana",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.3,
          },
        });
        gsap.to("#sabana-rumput-2", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: "#sabana",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.2,
          },
        });
        gsap.to("#sabana-rumput-3", {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: "#sabana",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.1,
          },
        });
      }

      if (!isCalm) {
        gsap.timeline({ scrollTrigger: { trigger: "#tanpa-dokumentasi", start: "top 75%", end: "center center", scrub: true } })
          .fromTo("#tanpa-dokumentasi", { backgroundColor: "rgba(30, 36, 27, 0.72)" }, { backgroundColor: "rgba(10, 10, 10, 0.82)" })
          .from(".tanpa-dok-line", { opacity: 0, y: 24, stagger: 0.3 }, 0);
        document.querySelectorAll<SVGPathElement>("[data-trail]").forEach(path => {
          const length = path.getTotalLength();
          gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: path.closest("section")!, start: "top 85%", end: "center center", scrub: true } });
        });
      }
      // 3. Bab 02: Tanpa Dokumentasi (Jalur SVG terlukis)
      const pathEl = document.getElementById("tanpa-dok-path") as SVGPathElement | null;
      if (pathEl) {
        const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 200;
        if (!isCalm) {
          gsap.set(pathEl, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(pathEl, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: "#tanpa-dokumentasi",
              start: "top 80%",
              end: "center center",
              scrub: true,
            },
          });
          gsap.fromTo(
            "#tanpa-dok-dot",
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.4,
              delay: 1.1,
              scrollTrigger: {
                trigger: "#tanpa-dokumentasi",
                start: "top 75%",
                once: true,
              },
            }
          );
        } else {
          gsap.set(pathEl, { strokeDashoffset: 0 });
        }
      }

      // 4. Bab 03: Puncak (Pin panorama + zoom pelan + counter 1.726 mdpl)
      if (!isCalm) {
        const rail = document.getElementById("rel-ketinggian-mobile");
        if (rail) {
          const base = Number(rail.dataset.base), summit = Number(rail.dataset.summit);
          ScrollTrigger.create({ trigger: "#pembuka", start: "top top", endTrigger: "#puncak", end: "top top", onUpdate: self => {
            const label = `${Math.round(base + (summit - base) * self.progress).toLocaleString("id-ID")} mdpl`;
            document.querySelectorAll("#live-elevasi-angka, #live-elevasi-mobile").forEach(el => el.textContent = label);
            gsap.set("#meter-progress-bar", { scaleY: self.progress, transformOrigin: "bottom" });
          } });
        }

        const targetPuncak = document.getElementById("puncak-counter-target");
        if (targetPuncak) {
          const counterObj = { val: 1300 };
          gsap.to(counterObj, {
            val: 1726,
            ease: "none",
            scrollTrigger: {
              trigger: "#puncak",
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
            onUpdate: () => {
              targetPuncak.textContent = `${Math.round(counterObj.val)} mdpl ✓`;
            },
          });
        }
      }

      // 5. Bab 04: Langit Cerah (Sinar berputar loop, jeda saat offscreen)
      const raysEl = document.getElementById("langit-sun-rays");
      if (raysEl && !isCalm) {
        const rayTween = gsap.to(raysEl, {
          rotation: 360,
          transformOrigin: "center center",
          repeat: -1,
          duration: 35,
          ease: "none",
          paused: true,
        });

        loops.push(rayTween);
        ScrollTrigger.create({
          trigger: "#langit-cerah",
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) visibleLoops.add(rayTween); else visibleLoops.delete(rayTween);
            rayTween.paused(!self.isActive || document.hidden);
          },
        });

        gsap.fromTo(
          "#langit-flare",
          { xPercent: -20, yPercent: -10 },
          {
            xPercent: 20,
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
              trigger: "#langit-cerah",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      if (!isCalm) {
        loop("#langit-cerah [data-gallery-card] img", "#langit-cerah", { y: -5, yoyo: true, repeat: -1, duration: 3.5, ease: "sine.inOut", stagger: 0.3 });
      }
      // 6. Bab 05: Sunrise (Interpolasi langit gelap -> fajar -> terang keemasan)
      const sunriseEl = document.getElementById("sunrise");
      if (sunriseEl) {
        if (!isCalm) {
          const sunriseTl = gsap.timeline({
            onUpdate: () => {
              const color = sunriseText(getComputedStyle(sunriseEl).backgroundColor);
              ["--teks", "--teks-muted", "--sunrise-ink"].forEach(key => sunriseEl.style.setProperty(key, color));
            },
            scrollTrigger: {
              trigger: "#sunrise",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          sunriseTl
            .fromTo("#sunrise", { backgroundColor: "rgba(43, 34, 80, 0.72)" }, { backgroundColor: "rgba(217, 98, 122, 0.65)" })
            .to("#sunrise", { backgroundColor: "rgba(255, 217, 160, 0.55)" });

          gsap.fromTo(
            "#sunrise-glow",
            { y: "40%", opacity: 0.3, scale: 0.8 },
            {
              y: "0%",
              opacity: 0.9,
              scale: 1.1,
              ease: "none",
              scrollTrigger: {
                trigger: "#sunrise",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );

          gsap.fromTo(
            "#sunrise-silhouette",
            { x: -20 },
            {
              x: 20,
              ease: "none",
              scrollTrigger: {
                trigger: "#sunrise",
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        } else {
          sunriseEl.style.backgroundColor = "#FFD9A0";
        }
      }

      // 7. Bab 06: Penutup
      if (!isCalm) {
        gsap.from(".penutup-stagger", {
          opacity: 0,
          y: 25,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#penutup",
            start: "top 75%",
            once: true,
          },
        });

        loop("#btn-buka-rahasia", "#penutup", {
          scale: 1.02,
          yoyo: true,
          repeat: -1,
          duration: 1.2,
          ease: "power1.inOut",
        });
      }

      // Cleanup function saat matchMedia berganti atau di-revert
      const refresh = () => ScrollTrigger.refresh();
      document.addEventListener("galeri-ready", refresh);
      return () => {
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
        document.removeEventListener("visibilitychange", visibility);
        document.removeEventListener("galeri-ready", refresh);
        document.querySelectorAll("#live-elevasi-angka, #live-elevasi-mobile").forEach(el => el.textContent = `${document.getElementById("rel-ketinggian-mobile")?.dataset.summit ?? 1726} mdpl`);
        const title = document.getElementById("hero-title");
        if (title && titleOriginal) { title.textContent = titleOriginal; delete title.dataset.split; }
        if (sunriseEl) { ["background-color", "--teks", "--teks-muted", "--sunrise-ink"].forEach(key => sunriseEl.style.removeProperty(key)); }
      };
    }
  );
  return () => mm.revert();
}
