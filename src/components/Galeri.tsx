import * as React from "react";
import { motion } from "motion/react";
import PolaroidLineCarousel, { type Slide } from "./ui/polaroid-line-carousel";
import Lightbox from "./Lightbox";
import { isLightMode } from "../lib/gerak";

export type GaleriProps = {
  slides: Slide[];
  tampil?: "carousel" | "grid" | "keduanya";
  background?: string;
  ink?: string;
  string?: string;
  ariaLabel?: string;
};

const INITIAL_GRID_COUNT = 6;
const MAX_CAROUSEL_COUNT = 10;

export default function Galeri({
  slides = [],
  tampil = "keduanya",
  background = "transparent",
  ink = "currentColor",
  string = "#8a7f72",
  ariaLabel = "Galeri Kenangan",
}: GaleriProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animated, setAnimated] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimated(!isLightMode());
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    document.dispatchEvent(new Event("galeri-ready"));
  }, [animated, expanded]);

  const handleOpen = (_: Slide, index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const handleClose = () => {
    setLightboxOpen(false);
  };

  if (!slides || slides.length === 0) return null;

  const carouselSlides = slides.slice(0, MAX_CAROUSEL_COUNT);
  const visibleGridSlides = expanded ? slides : slides.slice(0, INITIAL_GRID_COUNT);
  const hiddenCount = Math.max(0, slides.length - INITIAL_GRID_COUNT);

  return (
    <div className="w-full flex flex-col items-center gap-10 my-6">
      {/* 1. Carousel Mode */}
      {(tampil === "carousel" || tampil === "keduanya") && (
        <div className="carousel-slot w-full relative flex flex-col items-center">
          {animated && (
            <PolaroidLineCarousel
              slides={carouselSlides}
              background={background}
              ink={ink}
              string={string}
              ariaLabel={ariaLabel}
              onOpen={handleOpen}
            />
          )}
          <p
            className="mt-3 text-base font-mono tracking-wider opacity-100 text-center select-none"
            style={{ color: ink }}
          >
            ← Geser tali atau gunakan panah · Klik polaroid untuk memperbesar →
          </p>
        </div>
      )}

      {/* 2. Asymmetric Grid Mode */}
      {slides.length > 0 && (
        <div className="w-full max-w-6xl px-4 md:px-8 mt-4">
          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {visibleGridSlides.map((s, idx) => (
              <motion.button
                initial={idx >= INITIAL_GRID_COUNT && animated ? { opacity: 0, scale: 0.9, y: 20 } : false}
                animate={idx >= INITIAL_GRID_COUNT && animated ? { opacity: 1, scale: 1, y: 0 } : undefined}
                whileHover={animated ? { y: -6, rotate: -1, scale: 1.02 } : undefined}
                whileTap={animated ? { scale: 0.96 } : undefined}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                type="button"
                key={idx}
                onClick={() => handleOpen(s, idx)}
                data-gallery-card
                className={`group cursor-pointer bg-[#fbfaf7] p-3 pb-4 rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] ${
                  idx === 0 && tampil === "keduanya" ? "min-[600px]:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-200 rounded-[1px]">
                  {s.image && (
                    <img
                      src={s.image}
                      srcSet={s.srcSet}
                      sizes="(max-width: 599px) 90vw, (max-width: 1023px) 45vw, 600px"
                      width={600}
                      height={600}
                      alt={s.alt || s.title || ""}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      style={{ objectPosition: s.fokus || "center" }}
                    />
                  )}
                </div>
                {s.title && (
                  <p className="mt-3 text-center font-serif italic text-base text-stone-800 tracking-wide">
                    {s.title}
                  </p>
                )}
                {s.caption && (
                  <p className="mt-1 text-center font-sans text-base text-stone-700 px-2">
                    {s.caption}
                  </p>
                )}
              </motion.button>
            ))}
          </div>

          {hiddenCount > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="min-h-11 px-6 py-3 rounded-full bg-[#fbfaf7]/90 hover:bg-[#fbfaf7] text-stone-900 border border-stone-300 shadow-md hover:shadow-lg font-mono text-sm tracking-wide transition cursor-pointer"
              >
                {expanded
                  ? "Sembunyikan sebagian foto ↑"
                  : `Lihat ${hiddenCount} Foto Kenangan Lainnya di Bab Ini ↓`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Shared Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        slides={slides}
        currentIndex={activeIndex}
        onClose={handleClose}
        onIndexChange={setActiveIndex}
      />
    </div>
  );
}
