import * as React from "react";
import { motion } from "motion/react";
import PolaroidLineCarousel, { type Slide } from "./ui/polaroid-line-carousel";
import Lightbox from "./Lightbox";
import { isLightMode } from "../lib/gerak";
import { getLang, UI, type Lang } from "../lib/i18n";

export type GaleriProps = {
  babId?: string;
  slides: Slide[];
  tampil?: "carousel" | "grid" | "keduanya";
  background?: string;
  ink?: string;
  string?: string;
  ariaLabel?: string;
};

const INITIAL_GRID_COUNT = 6;
const MAX_CAROUSEL_COUNT = 20;

export default function Galeri({
  babId,
  slides: initialSlides = [],
  tampil = "keduanya",
  background = "transparent",
  ink = "currentColor",
  string = "#8a7f72",
  ariaLabel = "Galeri Kenangan",
}: GaleriProps) {
  const [slides, setSlides] = React.useState<Slide[]>(initialSlides);
  const [lang, setLang] = React.useState<Lang>("id");
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animated, setAnimated] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  React.useEffect(() => {
    setLang(getLang());
    const onLang = (e: Event) => setLang((e as CustomEvent).detail?.lang === "en" ? "en" : "id");
    document.addEventListener("lang-change", onLang);
    return () => document.removeEventListener("lang-change", onLang);
  }, []);

  React.useEffect(() => {
    if (!babId) return;
    const applyTranslations = (translations?: Record<string, { items?: Array<{ id: string; judul?: string; caption?: string; alt?: string }> }>) => {
      const items = translations?.[babId]?.items;
      if (!items) return;
      const byId = new Map(items.map((item) => [item.id, item]));
      setSlides(initialSlides.map((s) => {
        const t = s.id ? byId.get(s.id) : undefined;
        return t ? { ...s, title: t.judul || t.caption || s.title, caption: t.caption || s.caption, alt: t.alt || s.alt } : s;
      }));
    };
    applyTranslations((window as unknown as { __andongTranslations?: Record<string, { items?: Array<{ id: string; judul?: string; caption?: string; alt?: string }> }> }).__andongTranslations);
    const onReady = (e: Event) => applyTranslations((e as CustomEvent).detail?.translations);
    document.addEventListener("lang-data-ready", onReady);
    return () => document.removeEventListener("lang-data-ready", onReady);
  }, [babId, initialSlides]);

  React.useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAnimated(!isLightMode());
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  React.useEffect(() => {
    document.dispatchEvent(new Event("galeri-ready"));
  }, []);

  const handleOpen = (_: Slide, index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const handleClose = () => {
    setLightboxOpen(false);
  };

  if (!slides || slides.length === 0) return null;

  const carouselSlides = slides
    .filter((s) => s.tampil !== "grid")
    .slice(0, MAX_CAROUSEL_COUNT);
  const visibleGridSlides = expanded ? slides : slides.slice(0, INITIAL_GRID_COUNT);
  const hiddenCount = Math.max(0, slides.length - INITIAL_GRID_COUNT);

  const handleCarouselOpen = (slide: Slide, carouselIdx: number) => {
    const fullIdx = slides.indexOf(slide);
    handleOpen(slide, fullIdx >= 0 ? fullIdx : carouselIdx);
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 my-6">
      {/* 1. Carousel Mode */}
      {(tampil === "carousel" || tampil === "keduanya") && carouselSlides.length > 0 && (
        <div className="carousel-slot w-full relative flex flex-col items-center">
          {animated && (
            <PolaroidLineCarousel
              slides={carouselSlides}
              background={background}
              ink={ink}
              string={string}
              ariaLabel={ariaLabel}
              onOpen={handleCarouselOpen}
            />
          )}
          <p
            className="mt-3 text-base font-mono tracking-wider opacity-100 text-center select-none"
            style={{ color: ink }}
          >
            {UI[lang].galleryHint}
          </p>
        </div>
      )}

      {/* 2. Asymmetric Grid Mode */}
      {slides.length > 0 && (
        <div className="w-full max-w-6xl px-4 md:px-8 mt-4">
          <div className="grid grid-cols-1 min-[600px]:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-start">
            {visibleGridSlides.map((s, idx) => {
              const isLandscape = s.jenis !== "video" && !!s.width && !!s.height && s.width > s.height;
              const aspectClass = isLandscape
                ? "aspect-[4/3]"
                : "aspect-[3/4] sm:aspect-[4/5]";
              return (
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
                <div className={`relative ${aspectClass} overflow-hidden bg-stone-200 rounded-[1px]`}>
                  {s.jenis === "video" && s.videoSrc ? (
                    <>
                      <video
                        src={s.videoSrc}
                        poster={s.image}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={s.alt || s.title || ""}
                        onMouseEnter={(e) => {
                          void e.currentTarget.play().catch(() => {});
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.pause();
                          e.currentTarget.currentTime = 0;
                        }}
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        style={{ objectPosition: s.fokus || "center" }}
                      />
                      <span className="pointer-events-none absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-stone-950/80 text-amber-200 font-mono text-xs flex items-center gap-1.5 shadow-md">
                        ▶ Video
                      </span>
                    </>
                  ) : (
                    s.image && (
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
                    )
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
              );
            })}
          </div>

          {hiddenCount > 0 && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setExpanded((prev) => !prev)}
                className="min-h-11 px-6 py-3 rounded-full bg-[#fbfaf7]/90 hover:bg-[#fbfaf7] text-stone-900 border border-stone-300 shadow-md hover:shadow-lg font-mono text-sm tracking-wide transition cursor-pointer"
              >
                {expanded
                  ? UI[lang].galleryHide
                  : `${UI[lang].galleryShowMorePrefix}${hiddenCount}${UI[lang].galleryShowMoreSuffix}`}
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
        lang={lang}
        onClose={handleClose}
        onIndexChange={setActiveIndex}
      />
    </div>
  );
}
