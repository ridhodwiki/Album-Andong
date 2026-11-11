import * as React from "react";
import { isLightMode } from "../lib/gerak";
import type { Slide } from "./ui/polaroid-line-carousel";

export type LightboxProps = {
  isOpen: boolean;
  slides: Slide[];
  currentIndex: number;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export default function Lightbox({
  isOpen,
  slides,
  currentIndex,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const touchStart = React.useRef<{ x: number; y: number } | null>(null);
  const imageRef = React.useRef<HTMLImageElement>(null);
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;
    const overflow = document.body.style.overflow;
    const trigger = document.activeElement as HTMLElement | null;
    const source = trigger?.querySelector("img")?.getBoundingClientRect();
    dialog.showModal();
    let cancelled = false;
    let stop: (() => void) | undefined;
    if (!isLightMode() && source && imageRef.current) {
      const image = imageRef.current;
      const target = image.getBoundingClientRect();
      void import("motion").then(({ animate }) => {
        if (cancelled || !target.width) return;
        const controls = animate(image, { x: [source.x + source.width / 2 - target.x - target.width / 2, 0], y: [source.y + source.height / 2 - target.y - target.height / 2, 0], scale: [Math.min(source.width / target.width, 1), 1] }, { type: "spring", duration: 0.35, bounce: 0.12 });
        stop = () => controls.stop();
      });
    }
    document.body.style.overflow = "hidden";
    return () => {
      cancelled = true; stop?.();
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, [isOpen]);

  const slide = slides[currentIndex];
  const n = slides.length;

  const prev = React.useCallback(() => {
    onIndexChange((currentIndex - 1 + n) % n);
  }, [currentIndex, n, onIndexChange]);

  const next = React.useCallback(() => {
    onIndexChange((currentIndex + 1) % n);
  }, [currentIndex, n, onIndexChange]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        prev();
      } else if (e.key === "ArrowRight") {
        next();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const dx = e.changedTouches[0].clientX - touchStart.current.x;
    const dy = e.changedTouches[0].clientY - touchStart.current.y;
    touchStart.current = null;

    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) prev();
      else next();
    }
  };

  if (!isOpen || !slide) return null;

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      aria-modal="true"
      className="fixed inset-0 z-[100] m-0 h-full w-full max-w-none max-h-none border-0 bg-black/92 backdrop-blur-md p-0 text-white flex flex-col justify-between overflow-y-auto outline-none"
      data-lenis-prevent
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Penampil Foto Layar Penuh"
    >
      {/* Top Header Controls */}
      <div className="flex items-center justify-between px-6 py-5 z-10">
        <span className="font-mono text-xs uppercase tracking-widest text-white/70">
          Foto {currentIndex + 1} / {n}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 transition text-white outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          aria-label="Tutup penampil foto"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main Photo View Area */}
      <div className="relative flex-1 min-h-48 flex items-center justify-center px-4 md:px-16 overflow-hidden" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        {/* Nav Left */}
        {n > 1 && (
          <button
            type="button"
            onClick={prev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white/90 hover:text-white transition z-10 focus-visible:ring-2 focus-visible:ring-amber-300"
            aria-label="Foto sebelumnya"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        <div className="max-w-4xl max-h-[70vh] flex flex-col items-center select-none">
          <img
            ref={imageRef}
            src={slide.image}
            srcSet={slide.srcSet}
            sizes="90vw"
            alt={slide.alt || slide.title || ""}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded shadow-2xl transition duration-300"
            draggable={false}
          />
        </div>

        {/* Nav Right */}
        {n > 1 && (
          <button
            type="button"
            onClick={next}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 rounded-full w-12 h-12 flex items-center justify-center bg-black/40 hover:bg-black/70 text-white/90 hover:text-white transition z-10 focus-visible:ring-2 focus-visible:ring-amber-300"
            aria-label="Foto berikutnya"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>

      {/* Bottom Caption */}
      <div lang="en" className="px-6 py-6 text-center max-w-2xl mx-auto z-10">
        {slide.title && (
          <h3 className="font-serif text-xl md:text-2xl font-normal text-amber-200 tracking-wide mb-1">
            {slide.title}
          </h3>
        )}
        {slide.caption && (
          <p className="text-base text-white/80 font-light leading-relaxed">
            {slide.caption}
          </p>
        )}
      </div>
    </dialog>
  );
}
