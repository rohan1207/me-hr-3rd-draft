"use client";

import { useCallback, useEffect, useState } from "react";
import { Link } from "@/components/compat/router";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  TrendingUp,
  Users,
  Heart,
  BookOpen,
  Calendar,
  Bell,
  X,
} from "lucide-react";
import { careersContent, mediaContent, ctas, seo } from "../data/content";
import Reveal, { RevealItem, RevealStagger } from "../components/ui/Reveal";
import SpecularButton from "../components/ui/SpecularButton";
import CTABanner from "../components/ui/CTABanner";
import PageSEO from "../components/ui/PageSEO";
import SectionHeading from "../components/ui/SectionHeading";

const galleryImages = [
  "/me-hr_team.jpg",
  "/me-hr_meeting.jpeg",
  "/team_meet.jpeg",
  "/img.jpg",
  "/img3.jpg",
  "/patra.jpg",
  "/img2.jpg",
  "/img1.jpeg",
];

const whyIcons = [Lightbulb, TrendingUp, Users, Heart];
const categoryIcons = [BookOpen, Calendar, Bell];
const bandImage = "/me-hr_team.jpg";

function GalleryLightbox({ items, index, onClose, onPrev, onNext }) {
  const item = items[index];
  if (!item) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.label} — image ${index + 1} of ${items.length}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <button
        type="button"
        aria-label="Close gallery"
        className="absolute inset-0 cursor-default bg-mehr-ink/88 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X size={22} strokeWidth={1.75} />
      </button>

      {items.length > 1 && (
        <>
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6 sm:h-11 sm:w-11"
          >
            <ChevronLeft size={22} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:h-11 sm:w-11"
          >
            <ChevronRight size={22} strokeWidth={1.75} />
          </button>
        </>
      )}

      <motion.div
        key={item.img}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-3 flex max-h-[min(88vh,920px)] w-full max-w-5xl flex-col sm:mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-[1.1rem] bg-mehr-ink shadow-float sm:rounded-[1.5rem]">
          <img
            src={item.img}
            alt={item.label}
            className="mx-auto max-h-[min(72vh,820px)] w-full object-contain sm:max-h-[min(78vh,820px)]"
          />
        </div>
        <div className="mt-3 flex items-end justify-between gap-3 px-1 text-white sm:mt-4 sm:gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55 sm:text-[11px]">
              {item.label}
            </p>
            <p className="mt-1 line-clamp-2 text-[12px] text-white/75 sm:truncate sm:text-sm">
              {item.desc}
            </p>
          </div>
          <p className="shrink-0 font-sans text-[12px] font-semibold tabular-nums text-white/70 sm:text-[13px]">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Life() {
  const [activeShot, setActiveShot] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const { hero, why, openingsTitle, openingsNote, experienceEyebrow, experienceTitle } =
    careersContent;
  const { categories } = mediaContent;

  const gallery = galleryImages.map((img, i) => {
    const cat = categories[i % categories.length];
    return {
      label: cat.title,
      desc: cat.desc,
      img,
    };
  });

  const shot = gallery[activeShot] ?? gallery[0];
  const lightboxOpen = lightboxIndex !== null;

  const openLightbox = useCallback((i) => {
    setActiveShot(i);
    setLightboxIndex(i);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      const next = (i - 1 + gallery.length) % gallery.length;
      setActiveShot(next);
      return next;
    });
  }, [gallery.length]);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => {
      if (i === null) return i;
      const next = (i + 1) % gallery.length;
      setActiveShot(next);
      return next;
    });
  }, [gallery.length]);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.classList.add("lenis-stopped");

    const onKey = (e) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.classList.remove("lenis-stopped");
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxOpen, closeLightbox, goPrev, goNext]);

  return (
    <>
      <PageSEO {...seo.life} path="/life" />

      {/* Image hero */}
      <section className="relative overflow-hidden bg-white pt-7 pb-0 sm:pt-16 lg:pt-10">
        <div className="page-gutter relative z-10 mx-auto w-full max-w-[1680px] sm:px-3 md:px-4 lg:px-5">
          <div className="grid items-end gap-6 sm:gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
            <Reveal className="pb-6 text-center sm:pb-14 lg:pb-20 lg:text-left">
              <nav className="mb-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-mehr-muted sm:mb-6 lg:justify-start">
                <Link to="/" className="transition hover:text-mehr-ink">
                  Home
                </Link>
                <span className="text-mehr-deep/20">/</span>
                <span className="text-mehr-mist">Life at me-HR</span>
              </nav>
              <p className="eyebrow">{experienceEyebrow}</p>
              <h1 className="mx-auto mt-2.5 max-w-lg font-sans text-[clamp(1.7rem,7vw,3.35rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-mehr-ink sm:mt-3 sm:leading-[1.1] lg:mx-0">
                {hero.title}
              </h1>
              <p className="mx-auto mt-3.5 max-w-md text-[13px] leading-relaxed text-mehr-mist sm:mt-5 sm:text-[15px] lg:mx-0">
                {hero.body}
              </p>
              <div className="mt-5 flex w-full flex-col items-stretch gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-start">
                <SpecularButton
                  to="/careers"
                  variant="brand"
                  size="md"
                  className="w-full justify-center sm:w-auto"
                >
                  {ctas.viewOpenings}
                  <ArrowUpRight size={15} />
                </SpecularButton>
                <SpecularButton
                  to="/media"
                  variant="light"
                  size="md"
                  className="w-full justify-center sm:w-auto"
                >
                  {ctas.exploreMedia}
                </SpecularButton>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="relative">
              <div className="relative overflow-hidden rounded-t-[1.5rem] sm:rounded-t-[2.5rem] lg:rounded-t-[3rem]">
                <div className="grid grid-cols-2 gap-1.5 sm:gap-2.5">
                  {galleryImages.slice(0, 4).map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => openLightbox(i)}
                      className={`block overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehr-deep ${
                        i % 2 === 0
                          ? "aspect-[4/5]"
                          : "aspect-[4/5] translate-y-3 sm:translate-y-6"
                      }`}
                    >
                      <img
                        src={src}
                        alt=""
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        <svg
          aria-hidden
          className="relative z-0 -mt-px block w-full text-white"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,32 C360,64 1080,0 1440,32 L1440,64 L0,64 Z"
          />
        </svg>
      </section>

      {/* Culture pillars */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <SectionHeading
            align="center"
            eyebrow={experienceEyebrow}
            title={experienceTitle}
          />

          <div className="-mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-10 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
            {why.map((item, i) => {
              const Icon = whyIcons[i];
              return (
                <article
                  key={item.title}
                  className="group flex h-full w-[78vw] max-w-[280px] shrink-0 snap-center flex-col rounded-[1.25rem] border border-mehr-deep/8 bg-mehr-panel/50 p-4 transition hover:-translate-y-1 hover:border-mehr-deep/18 hover:bg-white hover:shadow-float sm:w-auto sm:max-w-none sm:shrink sm:rounded-[1.5rem] sm:p-6"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mehr-deep text-white transition group-hover:scale-105 sm:h-11 sm:w-11">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-3.5 font-sans text-[15px] font-semibold tracking-tight text-mehr-ink sm:mt-4 sm:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-mehr-mist sm:mt-2">
                    {item.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-mehr-panel/40 py-8 sm:py-12 lg:py-16">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <div className="mb-5 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title={mediaContent.hero.title}
              body={mediaContent.hero.body}
            />
            <Reveal delay={0.08}>
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
                {categories.map((cat, i) => {
                  const Icon = categoryIcons[i];
                  return (
                    <span
                      key={cat.title}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-mehr-ink shadow-soft"
                    >
                      <Icon size={12} className="text-mehr-deep" />
                      {cat.title}
                    </span>
                  );
                })}
              </div>
            </Reveal>
          </div>

          <Reveal>
            <AnimatePresence mode="wait">
              <motion.button
                key={shot.img}
                type="button"
                onClick={() => openLightbox(activeShot)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="group relative block w-full overflow-hidden rounded-[1.15rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehr-deep focus-visible:ring-offset-2 sm:rounded-[1.5rem] lg:rounded-[1.75rem]"
              >
                <span className="relative block aspect-[16/11] sm:aspect-[21/9]">
                  <img
                    src={shot.img}
                    alt={shot.label}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-mehr-ink/70 via-transparent to-transparent" />
                  <span className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6">
                    <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">
                      {String(activeShot + 1).padStart(2, "0")} /{" "}
                      {String(gallery.length).padStart(2, "0")}
                    </span>
                    <span className="mt-1 block font-sans text-lg font-semibold text-white sm:text-2xl">
                      {shot.label}
                    </span>
                    <span className="mt-1 line-clamp-2 block max-w-xl text-[12px] leading-relaxed text-white/70 sm:text-[13px]">
                      {shot.desc}
                    </span>
                  </span>
                </span>
              </motion.button>
            </AnimatePresence>
          </Reveal>

          <RevealStagger
            className="mt-2.5 grid grid-cols-2 gap-1.5 sm:mt-4 sm:grid-cols-4 sm:gap-3"
            stagger={0.04}
          >
            {gallery.map((item, i) => {
              const isOn = activeShot === i;
              return (
                <RevealItem key={`${item.label}-${i}`}>
                  <button
                    type="button"
                    onClick={() => openLightbox(i)}
                    onMouseEnter={() => setActiveShot(i)}
                    onFocus={() => setActiveShot(i)}
                    aria-label={`Open ${item.label} image`}
                    className={`group relative aspect-[4/3] w-full overflow-hidden rounded-[0.85rem] text-left transition sm:rounded-[1.25rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mehr-deep ${
                      isOn
                        ? "ring-2 ring-mehr-deep ring-offset-1 ring-offset-mehr-panel sm:ring-offset-2"
                        : "hover:opacity-95"
                    }`}
                  >
                    <img
                      src={item.img}
                      alt={item.label}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 transition ${
                        isOn ? "bg-mehr-deep/35" : "bg-mehr-ink/20"
                      }`}
                    />
                    <span className="absolute inset-x-2 bottom-2 font-sans text-[10px] font-semibold text-white drop-shadow sm:inset-x-2.5 sm:bottom-2.5 sm:text-xs">
                      {item.label}
                    </span>
                  </button>
                </RevealItem>
              );
            })}
          </RevealStagger>
        </div>
      </section>

      {/* Openings CTA band */}
      <section className="bg-white py-8 sm:py-12 lg:py-16">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <Reveal>
            <div className="grid overflow-hidden rounded-[1.35rem] border border-mehr-deep/10 bg-mehr-teal-soft sm:rounded-[2.25rem] lg:grid-cols-2 lg:rounded-[2.75rem]">
              <div className="flex flex-col justify-center px-4 py-8 text-center text-mehr-ink sm:px-10 sm:py-12 sm:text-left lg:px-12 lg:py-14">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-deep/70 sm:text-[11px]">
                  {openingsTitle}
                </p>
                <h2 className="mx-auto mt-2.5 max-w-md font-sans text-[clamp(1.35rem,6vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em] sm:mx-0 sm:mt-3">
                  {experienceTitle}
                </h2>
                <p className="mx-auto mt-3 max-w-sm text-[13px] leading-relaxed text-mehr-mist sm:mx-0 sm:text-[14px]">
                  {openingsNote}
                </p>
                <div className="mt-5 flex w-full flex-col items-stretch gap-2.5 sm:mt-6 sm:flex-row sm:flex-wrap sm:gap-3">
                  <SpecularButton
                    to="/careers"
                    variant="brand"
                    size="md"
                    className="w-full justify-center sm:w-auto"
                  >
                    {ctas.viewOpenings}
                    <ArrowUpRight size={15} />
                  </SpecularButton>
                  <SpecularButton
                    to="/contact"
                    variant="light"
                    size="md"
                    className="w-full justify-center sm:w-auto"
                  >
                    {ctas.primary}
                  </SpecularButton>
                </div>
              </div>
              <div className="relative min-h-[180px] sm:min-h-[240px] lg:min-h-0">
                <img
                  src={bandImage}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-mehr-deep/15" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABanner cta={ctas.primary} />

      <AnimatePresence>
        {lightboxOpen && (
          <GalleryLightbox
            items={gallery}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  );
}
