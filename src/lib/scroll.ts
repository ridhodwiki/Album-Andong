import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { isLightMode } from "./gerak";

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

      if (isLightMode()) {
        document.documentElement.dataset.ringan = "true";
      }

      // 0. Smooth Scroll (Lenis di desktop saja saat mode penuh)
      const desktop = window.matchMedia("(min-width: 1024px)").matches;
      let lenis: Lenis | null = null;
      let tick: ((time: number) => void) | null = null;

      if (!isCalm && desktop) {
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
            titleEl.appendChild(span);
            return span;
          });
          titleEl.dataset.split = "true";

          gsap.from(chars, {
            opacity: 0,
            y: 35,
            duration: 0.8,
            stagger: 0.04,
            ease: "power3.out",
          });
        }

        gsap.fromTo(
          "#hero-bg",
          { scale: 1.15, opacity: 0 },
          { scale: 1, opacity: 0.35, duration: 1.4, ease: "power2.out" }
        );

        gsap.to("#hero-scroll-dot", {
          y: 8,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }

      // Reveal elemen umum .data-muncul
      const munculElements = document.querySelectorAll<HTMLElement>(".data-muncul");
      if (!isCalm) {
        munculElements.forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
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

      // 3. Bab 02: Tanpa Dokumentasi (Jalur SVG terlukis)
      const pathEl = document.getElementById("tanpa-dok-path") as SVGPathElement | null;
      if (pathEl) {
        const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 200;
        if (!isCalm) {
          gsap.set(pathEl, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(pathEl, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#tanpa-dokumentasi",
              start: "top 75%",
              once: true,
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
        ScrollTrigger.create({
          trigger: "#panorama-puncak",
          start: "top 15%",
          end: "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: true,
          animation: gsap.to("#panorama-puncak video, #panorama-puncak img", {
            scale: 1.08,
            ease: "none",
          }),
        });

        const targetPuncak = document.getElementById("puncak-counter-target");
        if (targetPuncak) {
          const counterObj = { val: 1300 };
          gsap.to(counterObj, {
            val: 1726,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#puncak",
              start: "top 70%",
              once: true,
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

        ScrollTrigger.create({
          trigger: "#langit-cerah",
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => {
            if (self.isActive) rayTween.play();
            else rayTween.pause();
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

      // 6. Bab 05: Sunrise (Interpolasi langit gelap -> fajar -> terang keemasan)
      const sunriseEl = document.getElementById("sunrise");
      if (sunriseEl) {
        if (!isCalm) {
          const sunriseTl = gsap.timeline({
            scrollTrigger: {
              trigger: "#sunrise",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });

          sunriseTl
            .fromTo("#sunrise", { backgroundColor: "#2B2250" }, { backgroundColor: "#D9627A" })
            .to("#sunrise", { backgroundColor: "#FFD9A0" });

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

        gsap.to("#btn-buka-rahasia", {
          scale: 1.02,
          yoyo: true,
          repeat: -1,
          duration: 1.2,
          ease: "power1.inOut",
        });
      }

      // Cleanup function saat matchMedia berganti atau di-revert
      return () => {
        if (tick) gsap.ticker.remove(tick);
        lenis?.destroy();
      };
    }
  );
}

// Jalankan otomatis saat browser siap
if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScroll);
  } else {
    initScroll();
  }
}
