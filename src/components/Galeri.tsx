import * as React from "react";
import PolaroidLineCarousel, { type Slide } from "./ui/polaroid-line-carousel";
import Lightbox from "./Lightbox";

export type GaleriProps = {
  slides: Slide[];
  tampil?: "carousel" | "grid" | "keduanya";
  background?: string;
  ink?: string;
  string?: string;
  ariaLabel?: string;
};

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

  const handleOpen = (_: Slide, index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const handleClose = () => {
    setLightboxOpen(false);
  };

  if (!slides || slides.length === 0) return null;

  return (
    <div className="w-full flex flex-col items-center gap-10 my-6">
      {/* 1. Carousel Mode */}
      {(tampil === "carousel" || tampil === "keduanya") && (
        <div className="w-full relative flex flex-col items-center">
          <PolaroidLineCarousel
            slides={slides}
            background={background}
            ink={ink}
            string={string}
            ariaLabel={ariaLabel}
            onOpen={handleOpen}
          />
          <p className="mt-3 text-[11px] md:text-xs font-mono tracking-wider opacity-60 text-center select-none" style={{ color: ink }}>
            ← Geser tali atau gunakan panah · Klik polaroid untuk memperbesar →
          </p>
        </div>
      )}

      {/* 2. Asymmetric Grid Mode */}
      {(tampil === "grid" || tampil === "keduanya") && slides.length > 1 && (
        <div className="w-full max-w-6xl px-4 md:px-8 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {slides.map((s, idx) => (
              <button
                type="button"
                aria-label={`Perbesar ${s.alt || s.title || `foto ${idx + 1}`}`}
                key={idx}
                onClick={() => handleOpen(s, idx)}
                className={`group cursor-pointer bg-[#fbfaf7] p-3 pb-4 rounded-sm shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.22)] ${
                  idx === 0 && tampil === "keduanya" ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-stone-200 rounded-[1px]">
                  {s.image && (
                    <img
                      src={s.image}
                      alt={s.alt || s.title || ""}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      style={{ objectPosition: s.fokus || "center" }}
                    />
                  )}
                </div>
                {s.title && (
                  <p className="mt-3 text-center font-serif italic text-sm md:text-base text-stone-800 tracking-wide line-clamp-1">
                    {s.title}
                  </p>
                )}
                {s.caption && (
                  <p className="mt-1 text-center font-sans text-xs text-stone-500 line-clamp-2 px-2">
                    {s.caption}
                  </p>
                )}
              </button>
            ))}
          </div>
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
