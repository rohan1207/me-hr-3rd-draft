"use client";

import { Link, Navigate, useParams } from "@/components/compat/router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { caseStudies, caseStudiesContent, ctas } from "../data/content";
import { photoAt } from "../data/images";
import PageSEO from "../components/ui/PageSEO";
import Reveal from "../components/ui/Reveal";
import CTABanner from "../components/ui/CTABanner";

function imageForStudy(id) {
  const idx = caseStudies.findIndex((c) => c.id === id);
  return photoAt(idx >= 0 ? idx : 0);
}

export default function CaseStudyArticle() {
  const { slug } = useParams();
  const study = caseStudies.find((c) => c.id === slug);
  const related = caseStudies.filter((c) => c.id !== slug).slice(0, 3);

  if (!study) return <Navigate to="/case-studies" replace />;

  const image = imageForStudy(study.id);

  return (
    <>
      <PageSEO
        title={`${study.title} | me-HR Case Studies`}
        description={study.challenge}
        path={`/case-studies/${study.id}`}
      />

      <article className="bg-white">
        <div className="container-mehr page-gutter pt-6 sm:pt-10 md:px-4 lg:px-5 lg:pt-12">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mehr-deep transition hover:text-mehr-ink sm:text-sm"
          >
            <ArrowLeft size={15} />
            Back to Case Studies
          </Link>

          <Reveal>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-deep sm:mt-6 sm:text-[11px]">
              Case study
            </p>
            <h1 className="mt-2.5 max-w-[22ch] font-sans text-[clamp(1.55rem,6.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-mehr-ink sm:mt-3 sm:leading-[1.08]">
              {study.title}
            </h1>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-6 overflow-hidden rounded-[1.25rem] sm:mt-10 sm:rounded-[1.75rem]">
              <img
                src={image}
                alt=""
                className="aspect-[16/10] min-h-[160px] w-full object-cover sm:aspect-[21/9] sm:min-h-[260px]"
              />
            </div>
          </Reveal>

          <div className="mx-auto mt-7 max-w-3xl space-y-8 pb-8 sm:mt-12 sm:space-y-10 sm:pb-12">
            <Reveal delay={0.1}>
              <section>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-deep sm:text-[11px]">
                  {caseStudiesContent.challengeLabel}
                </p>
                <p className="mt-3 text-[14px] leading-[1.7] text-mehr-mist sm:text-[16px] sm:leading-[1.75]">
                  {study.challenge}
                </p>
              </section>
            </Reveal>

            <Reveal delay={0.12}>
              <section>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-deep sm:text-[11px]">
                  {caseStudiesContent.didLabel}
                </p>
                <ul className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
                  {(study.actions || []).map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-[14px] leading-[1.65] text-mehr-mist sm:text-[16px] sm:leading-[1.7]"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mehr-deep"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>

            <Reveal delay={0.14}>
              <section className="rounded-[1.25rem] bg-mehr-deep p-5 text-white sm:rounded-[1.5rem] sm:p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/65 sm:text-[11px]">
                  {caseStudiesContent.impactLabel}
                </p>
                <p className="mt-3 text-[14px] leading-[1.7] text-white/95 sm:text-[16px] sm:leading-[1.75]">
                  {study.impact}
                </p>
              </section>
            </Reveal>
          </div>
        </div>
      </article>

      <section className="border-t border-mehr-deep/8 bg-mehr-panel/40 py-9 sm:py-14">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:text-left">
            <h2 className="font-sans text-[clamp(1.3rem,5.5vw,1.85rem)] font-semibold tracking-[-0.03em] text-mehr-ink">
              {caseStudiesContent.peopleAlsoRead}
            </h2>
            <Link
              to="/case-studies"
              className="inline-flex items-center gap-1 text-sm font-semibold text-mehr-deep"
            >
              {caseStudiesContent.viewAllCta}
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-7 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-5 [&::-webkit-scrollbar]:hidden">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/case-studies/${item.id}`}
                className="group w-[min(78vw,18.5rem)] shrink-0 snap-center overflow-hidden rounded-[1.25rem] border border-mehr-deep/8 bg-white shadow-soft transition hover:-translate-y-1 hover:border-mehr-deep/18 hover:shadow-float sm:w-auto sm:rounded-[1.5rem]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={imageForStudy(item.id)}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3.5 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-mehr-deep">
                    Case study
                  </p>
                  <h3 className="mt-2 font-sans text-[14px] font-semibold leading-snug text-mehr-ink sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-[12px] leading-relaxed text-mehr-mist">
                    {item.impact}
                  </p>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-mehr-deep sm:mt-3">
                    {caseStudiesContent.readCta}
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Talk to me-HR"
        title="Facing a similar people challenge?"
        body="Share your current HR priority and we'll help you identify the right next step."
        cta={ctas.discussChallenge}
      />
    </>
  );
}
