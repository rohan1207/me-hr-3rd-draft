"use client";

import { Link } from "@/components/compat/router";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { aboutContent } from "../../../data/content";
import Reveal from "../../ui/Reveal";
import "./AboutTestimonials.css";

function TestimonialCard({ item }) {
  return (
    <article className="about-tcard">
      <p className="about-tcard__tag">{item.tag}</p>
      <h3 className="about-tcard__headline">{item.headline}</h3>
      <p className="about-tcard__quote">{item.quote}</p>
      <div className="about-tcard__foot">
        <ArrowUpRight size={16} strokeWidth={1.75} className="about-tcard__arrow" aria-hidden />
        <p className="about-tcard__byline">
          <span className="about-tcard__name">{item.name}</span>
          <span className="about-tcard__meta">
            {item.role} · {item.place}
          </span>
        </p>
      </div>
    </article>
  );
}

function Track({ items }) {
  return (
    <div className="about-testimonials__track" aria-hidden>
      {items.map((item, i) => (
        <TestimonialCard key={`${item.id}-${i}`} item={item} />
      ))}
    </div>
  );
}

export default function AboutTestimonials() {
  const { testimonials } = aboutContent;
  const reduce = useReducedMotion();
  const items = testimonials.items;
  const loop = [...items, ...items];

  return (
    <section className="about-testimonials section-pad">
      <div className="container-mehr page-gutter relative z-10 sm:px-3 md:px-4 lg:px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{testimonials.eyebrow}</p>
          <h2 className="mt-3 font-sans text-[clamp(1.7rem,3.4vw,2.65rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-mehr-ink">
            {testimonials.title}
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-mehr-mist sm:text-[15px]">
            {testimonials.body}
          </p>
        </Reveal>
      </div>

      <div
        className={`about-testimonials__ribbon${reduce ? " is-static" : ""}`}
        role="region"
        aria-label="Client testimonials"
      >
        <div className="about-testimonials__fade about-testimonials__fade--left" aria-hidden />
        <div className="about-testimonials__fade about-testimonials__fade--right" aria-hidden />

        <div className="about-testimonials__scroller">
          <Track items={reduce ? items : loop} />
          {!reduce && <Track items={loop} />}
        </div>
      </div>

      <div className="container-mehr page-gutter mt-8 text-center sm:px-3 md:px-4 lg:px-5">
        <Link
          to="/case-studies"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-mehr-deep transition hover:text-mehr-teal"
        >
          Read case studies
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </section>
  );
}
