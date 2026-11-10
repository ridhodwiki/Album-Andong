import * as React from "react";

export type Slide = {
  image?: string;
  title?: string;
  caption?: string;
  alt?: string;
  fokus?: string;
  width?: number;
  height?: number;
};

export type PolaroidLineCarouselProps = {
  slides?: Slide[];
  /** Any CSS length. Default 70svh. */
  height?: number | string;
  /** Width of a print in px (it shrinks on narrow screens). */
  cardWidth?: number;
  /** How far the string sags in the middle, px. */
  sag?: number;
  /** How much the prints swing; 0 holds them still. */
  swing?: number;
  /** ms per print; 0 turns autoplay off. */
  autoplay?: number;
  /** Colour of the string and pegs. */
  string?: string;
  background?: string;
  ink?: string;
  onChange?: (index: number) => void;
  onOpen?: (slide: Slide, index: number) => void;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

// #region math logic
export function wrap(i: number, n: number): number {
  return n ? ((i % n) + n) % n : 0;
}

export function clamp(v: number, a: number, b: number): number {
  return Math.min(b, Math.max(a, v));
}

export function stringY(x: number, w: number, y0: number, sag: number): number {
  const t = clamp(x / w, 0, 1);
  return y0 + 4 * sag * t * (1 - t);
}

export function springStep(x: number, v: number, target: number, dt: number, k = 70): [number, number] {
  const c = 2 * Math.sqrt(k);
  const nv = v + (k * (target - x) - c * v) * dt;
  return [x + nv * dt, nv];
}

export function swingStep(a: number, w: number, lineVel: number, dt: number, gain: number): [number, number] {
  const nw = w + (-38 * a - 4.2 * w + lineVel * 0.0034 * gain) * dt;
  return [clamp(a + nw * dt, -0.6, 0.6), nw];
}

export function nearestAt(off: number, spacing: number, n: number): number {
  return clamp(Math.round(off / spacing), 0, Math.max(0, n - 1));
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n);
}
// #endregion math logic

const PL_CSS = [
  ".pl-root{position:relative;width:100%;overflow:hidden;background:var(--pl-bg);color:var(--pl-ink);user-select:none;-webkit-user-select:none;touch-action:pan-y;outline:none;cursor:grab}",
  ".pl-root[data-drag='1']{cursor:grabbing}",
  ".pl-root:focus-visible{box-shadow:inset 0 0 0 2px var(--pl-ink)}",
  ".pl-string{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}",
  ".pl-card{position:absolute;left:0;top:0;width:var(--pl-cw);transform-origin:50% 0;will-change:transform;cursor:pointer}",
  ".pl-print{margin-top:10px;background:#fbfaf7;padding:10px 10px 0;box-shadow:0 1px 3px rgba(0,0,0,.15),0 16px 28px -12px rgba(0,0,0,.45);transition:transform .4s cubic-bezier(.2,.7,.2,1),filter .4s ease;border-radius:2px}",
  ".pl-card[data-on='0'] .pl-print{transform:scale(.92);filter:saturate(.75) brightness(.92)}",
  ".pl-shot{position:relative;aspect-ratio:1;overflow:hidden;background:#d9d5cc}",
  ".pl-shot img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;pointer-events:none}",
  ".pl-note{height:46px;display:flex;align-items:center;justify-content:center;padding:0 8px;font:italic 400 15px/1.2 var(--font-serif, ui-serif, Georgia, serif);color:#2d2926;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".pl-peg{position:absolute;left:50%;top:0;width:10px;height:26px;margin-left:-5px;border-radius:2px;background:linear-gradient(90deg,#c9a67a,#e3c9a1 45%,#b8915f);box-shadow:0 2px 4px rgba(0,0,0,.3)}",
  ".pl-peg::after{content:'';position:absolute;left:4px;top:8px;width:2px;height:7px;background:rgba(80,60,30,.5);border-radius:1px}",
  ".pl-bar{position:absolute;left:clamp(16px,4vw,56px);right:clamp(16px,4vw,56px);bottom:clamp(16px,3vh,32px);display:flex;align-items:center;gap:clamp(12px,2vw,24px);cursor:default}",
  ".pl-cap{flex:1;min-width:0;overflow:hidden;padding-bottom:.15em}",
  ".pl-cap>*{display:block;animation:pl-in .45s cubic-bezier(.2,.8,.2,1) both}",
  ".pl-title{font:500 clamp(18px,2.2vw,24px)/1.2 var(--font-serif, ui-serif, Georgia, serif);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".pl-sub{margin-top:4px;font:400 13px/1.4 var(--font-sans, ui-sans-serif, system-ui, sans-serif);color:var(--pl-muted);display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}",
  ".pl-count{font:500 13px/1 var(--font-sans, monospace);font-variant-numeric:tabular-nums;letter-spacing:.12em;color:var(--pl-muted)}",
  ".pl-count b{color:var(--pl-ink);font-weight:600}",
  ".pl-btn{appearance:none;width:42px;height:42px;border-radius:50%;border:1px solid var(--pl-line);background:transparent;color:inherit;display:grid;place-items:center;cursor:pointer;transition:background .2s ease,color .2s ease,transform .15s ease}",
  ".pl-btn:hover{background:#fbfaf7;color:#0f172a;transform:scale(1.05)}",
  ".pl-btn:focus-visible{outline:2px solid var(--pl-ink);outline-offset:2px}",
  ".pl-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}",
  "@keyframes pl-in{from{transform:translateY(80%);opacity:0}to{transform:none;opacity:1}}",
  "@media (prefers-reduced-motion:reduce){.pl-cap>*{animation:none}.pl-print{transition:none}}",
].join("\n");

export default function PolaroidLineCarousel({
  slides = [],
  height = "70svh",
  cardWidth = 280,
  sag = 42,
  swing = 1,
  autoplay = 0,
  string = "#8a7f72",
  background = "transparent",
  ink = "currentColor",
  onChange,
  onOpen,
  className,
  style,
  ariaLabel = "Galeri Foto Polaroid",
}: PolaroidLineCarouselProps) {
  const n = slides.length;
  const [active, setActive] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [size, setSize] = React.useState({ w: 1200, h: 600, cw: cardWidth });
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const pathRef = React.useRef<SVGPathElement | null>(null);
  const cards = React.useRef<(HTMLDivElement | null)[]>([]);
  const sim = React.useRef({ off: 0, vel: 0, target: 0, a: [] as number[], w: [] as number[] });
  const drag = React.useRef<null | { x: number; off: number; lx: number; lt: number; v: number; moved: boolean }>(null);
  const lastTouch = React.useRef(0);
  const activeRef = React.useRef(0);
  const opts = React.useRef({ sag, swing });
  opts.current = { sag, swing };

  const spacing = size.cw * 1.08;
  const goTo = React.useCallback(
    (i: number) => {
      sim.current.target = clamp(i, 0, n - 1) * spacing;
    },
    [n, spacing]
  );

  React.useEffect(() => {
    activeRef.current = active;
  }, [active]);

  React.useEffect(() => {
    sim.current.a = new Array(n).fill(0);
    sim.current.w = new Array(n).fill(0);
    goTo(0);
  }, [n, goTo]);

  // Handle Resize
  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth || 1200;
      const h = el.clientHeight || 600;
      const cw = clamp(Math.round(w * 0.65), 220, cardWidth);
      setSize({ w, h, cw });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [cardWidth]);

  // Main Physics / RAF Loop
  React.useEffect(() => {
    let raf: number;
    let lt = performance.now();
    let visible = true;
    const el = rootRef.current;
    if (!el) return;

    const frame = (t: number) => {
      const dt = clamp((t - lt) / 1000, 0.001, 0.05);
      lt = t;
      const o = opts.current;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Autoplay
      if (autoplay > 0 && !drag.current && t - lastTouch.current > autoplay && n > 1) {
        lastTouch.current = t;
        const next = (activeRef.current + 1) % n;
        goTo(next);
      }

      // String sag path update
      const { w, h, cw } = size;
      const y0 = Math.round(h * 0.28);
      if (pathRef.current) {
        pathRef.current.setAttribute("d", `M 0 ${y0} Q ${w / 2} ${y0 + 2 * o.sag} ${w} ${y0}`);
      }

      // Spring tracking to target
      if (!drag.current) {
        const [nx, nv] = springStep(sim.current.off, sim.current.vel, sim.current.target, dt, 75);
        sim.current.off = nx;
        sim.current.vel = nv;
      }

      // Update nearest card index
      const near = nearestAt(sim.current.off, spacing, n);
      if (near !== activeRef.current) {
        setActive(near);
        onChange?.(near);
      }

      // Update Card Positions
      const g = reduce ? 0 : o.swing;
      const mid = w / 2;
      for (let i = 0; i < n; i++) {
        const cardEl = cards.current[i];
        if (!cardEl) continue;
        const x = mid - cw / 2 + (i * spacing - sim.current.off);
        const y = stringY(x + cw / 2, w, y0, o.sag);

        const [na, nw] = swingStep(sim.current.a[i] || 0, sim.current.w[i] || 0, sim.current.vel, dt, g);
        sim.current.a[i] = na;
        sim.current.w[i] = nw;

        const deg = (na * 180) / Math.PI;
        cardEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
      }

      if (visible) {
        raf = requestAnimationFrame(frame);
      }
    };

    raf = requestAnimationFrame(frame);
    const io = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(raf);
      visible = entry.isIntersecting;
      if (visible) {
        lt = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [n, size, spacing, autoplay, goTo, onChange]);

  // Pointer Drag Handlers
  const onDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    lastTouch.current = performance.now();
    drag.current = {
      x: e.clientX,
      off: sim.current.off,
      lx: e.clientX,
      lt: performance.now(),
      v: 0,
      moved: false,
    };
    setDragging(true);
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4 && !d.moved) {
      d.moved = true;
      try {
        rootRef.current?.setPointerCapture(e.pointerId);
      } catch {}
    }

    if (d.moved) {
      sim.current.off = clamp(d.off - dx, -spacing * 0.4, (n - 1) * spacing + spacing * 0.4);

      const now = performance.now();
      const dt = (now - d.lt) / 1000;
      if (dt > 0.015) {
        d.v = (e.clientX - d.lx) / dt;
        d.lx = e.clientX;
        d.lt = now;
        sim.current.vel = -d.v;
      }
    }
  };

  const onUp = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    setDragging(false);
    try {
      if (rootRef.current?.hasPointerCapture(e.pointerId)) {
        rootRef.current?.releasePointerCapture(e.pointerId);
      }
    } catch {}

    if (d.moved) {
      const pred = sim.current.off - d.v * 0.15;
      const targetIdx = nearestAt(pred, spacing, n);
      goTo(targetIdx);
    } else {
      // Direct click / tap without drag
      const targetEl = (e.target as HTMLElement).closest(".pl-card");
      if (targetEl) {
        const iAttr = targetEl.getAttribute("data-i");
        if (iAttr !== null) {
          const idx = parseInt(iAttr, 10);
          handleCardClick(idx);
        }
      }
    }
    drag.current = null;
  };

  const step = (dir: number) => {
    goTo(clamp(activeRef.current + dir, 0, n - 1));
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else if (e.key === "Enter" || e.key === " ") {
      if (slides[active]) onOpen?.(slides[active], active);
    } else return;
    e.preventDefault();
  };

  const handleCardClick = (i: number) => {
    if (i === active) {
      onOpen?.(slides[i], i);
    } else {
      goTo(i);
    }
  };

  const s = slides[active] || {};

  return (
    <div
      ref={rootRef}
      className={["pl-root", className].filter(Boolean).join(" ")}
      style={{
        height,
        ["--pl-bg" as string]: background,
        ["--pl-ink" as string]: ink,
        ["--pl-muted" as string]: "color-mix(in srgb, var(--pl-ink) 70%, transparent)",
        ["--pl-line" as string]: "color-mix(in srgb, var(--pl-ink) 25%, transparent)",
        ["--pl-cw" as string]: size.cw + "px",
        ...style,
      }}
      data-drag={dragging ? "1" : "0"}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <style>{PL_CSS}</style>
      <svg className="pl-string" aria-hidden="true">
        <path ref={pathRef} fill="none" stroke={string} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {slides.map((sl, i) => (
        <div
          key={i}
          className="pl-card"
          data-i={i}
          data-on={i === active ? "1" : "0"}
          ref={(el) => void (cards.current[i] = el)}
          aria-hidden={i === active ? undefined : true}
          onClick={(e) => {
            e.stopPropagation();
            onOpen?.(sl, i);
          }}
        >
          <div className="pl-print">
            <div className="pl-shot">
              {sl.image ? (
                <img
                  src={sl.image}
                  alt={sl.alt || sl.title || ""}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: sl.fokus || "center" }}
                  draggable={false}
                />
              ) : null}
            </div>
            <div className="pl-note">{sl.title || ""}</div>
          </div>
          <div className="pl-peg" />
        </div>
      ))}
      <div className="pl-bar">
        <div className="pl-cap" key={active} aria-hidden="true">
          {s.title ? <span className="pl-title">{s.title}</span> : null}
          {s.caption ? <span className="pl-sub">{s.caption}</span> : null}
        </div>
        <span className="pl-count" aria-hidden="true">
          <b>{pad2(active + 1)}</b> / {pad2(n)}
        </span>
        <button
          type="button"
          className="pl-btn"
          aria-label="Foto sebelumnya"
          onClick={() => step(-1)}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className="pl-btn"
          aria-label="Foto berikutnya"
          onClick={() => step(1)}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <div className="pl-sr" aria-live="polite">
        {"Foto " + (active + 1) + " dari " + n + (s.title ? ": " + s.title : "")}
      </div>
    </div>
  );
}
