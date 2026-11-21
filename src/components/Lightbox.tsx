import * as React from "react";
import { motion } from "motion/react";
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
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
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

  const calm = typeof window !== "undefined" && isLightMode();

  return (
    <dialog
      ref={dialogRef}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      aria-modal="true"
      className="fixed inset-0 z-[100] m-0 h-full w-full max-w-none max-h-none border-0 bg-black/90 backdrop-blur-md p-0 text-white flex flex-col justify-between overflow-y-auto outline-none"
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
        <span className="font-mono text-xs uppercase tracking-widest text-white/80">
          Foto {currentIndex + 1} / {n}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full w-11 h-11 flex items-center justify-center bg-white/15 hover:bg-white/25 transition text-white outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
          aria-label="Tutup penampil foto"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main Photo View Area with Spring Pop-Up Animation */}
      <div
        className="relative flex-1 min-h-48 flex items-center justify-center px-4 md:px-16 overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Nav Left */}
        {n > 1 && (
          <button
            type="button"
            onClick={prev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/65 hover:bg-black/85 backdrop-blur-xs text-white transition z-10 focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
            aria-label="Foto sebelumnya"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        )}

        <motion.div
          key={currentIndex}
          initial={calm ? false : { opacity: 0, scale: 0.78, y: 28, rotate: -1.5 }}
          animate={calm ? undefined : { opacity: 1, scale: 1, y: 0, rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22, mass: 0.85 }}
          className="max-w-[calc(100vw-2rem)] sm:max-w-4xl max-h-[72vh] flex flex-col items-center select-none bg-[#fbfaf7] p-2.5 sm:p-3 pb-4 sm:pb-5 rounded-sm shadow-2xl"
        >
          {slide.jenis === "video" && slide.videoSrc ? (
            <video
              src={slide.videoSrc}
              poster={slide.image}
              controls
              autoPlay
              playsInline
              aria-label={slide.alt || slide.title || ""}
              className="max-h-[58vh] w-auto max-w-full object-contain rounded-[1px] bg-stone-950"
            />
          ) : (
            <img
              ref={imageRef}
              src={slide.image}
              srcSet={slide.srcSet}
              sizes="90vw"
              alt={slide.alt || slide.title || ""}
              className="max-h-[58vh] w-auto max-w-full object-contain rounded-[1px]"
              draggable={false}
            />
          )}
          {slide.title && (
            <p className="mt-3 font-serif italic text-base sm:text-lg text-stone-900 tracking-wide text-center px-1">
              {slide.title}
            </p>
          )}
        </motion.div>

        {/* Nav Right */}
        {n > 1 && (
          <button
            type="button"
            onClick={next}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-black/65 hover:bg-black/85 backdrop-blur-xs text-white transition z-10 focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer"
            aria-label="Foto berikutnya"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        )}
      </div>

      {/* Bottom Caption */}
      <motion.div
        key={`cap-${currentIndex}`}
        initial={calm ? false : { opacity: 0, y: 12 }}
        animate={calm ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="px-6 py-6 text-center max-w-2xl mx-auto z-10"
      >
        {slide.caption && (
          <p className="text-base sm:text-lg text-amber-100 font-normal leading-relaxed">
            {slide.caption}
          </p>
        )}
      </motion.div>
    </dialog>
  );
}
