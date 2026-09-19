"use client";

import { Link, Navigate, useParams } from "@/components/compat/router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { mediaContent, seo } from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import Reveal from "../components/ui/Reveal";
import CTABanner from "../components/ui/CTABanner";

const POST_IMAGES = {
  "structured-hr": "/insights/structured-hr.png",
  "fractional-hr": "/insights/resident-hr.png",
  "engagement-culture": "/insights/engagement.png",
  "payroll-compliance": "/insights/payroll.png",
  "performance-systems": "/insights/performance.png",
  "on-demand-hr": "/insights/on-demand.png",
  "workplace-moments": "/insights/workplace-moments.png",
  "hr-lifecycle": "/insights/lifecycle.png",
};

function imageForPost(id) {
  return POST_IMAGES[id] || POST_IMAGES["structured-hr"];
}

export default function InsightArticle() {
  const { slug } = useParams();
  const post = mediaContent.posts.find((p) => p.id === slug);
  const related = mediaContent.posts.filter((p) => p.id !== slug).slice(0, 3);

  if (!post) return <Navigate to="/media" replace />;

  const image = imageForPost(post.id);

  return (
    <>
      <PageSEO
        title={`${post.title} | me-HR Insights`}
        description={post.excerpt}
        path={`/media/${post.id}`}
      />

      <article className="bg-white">
        <div className="container-mehr page-gutter pt-8 sm:pt-10 md:px-4 lg:px-5 lg:pt-12">
          <Link
            to="/media"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-mehr-deep transition hover:text-mehr-ink"
          >
            <ArrowLeft size={15} />
            Back to Insights
          </Link>

          <Reveal>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-mehr-deep">
              {post.category}
              {post.readTime ? ` · ${post.readTime}` : ""}
            </p>
            <h1 className="mt-3 max-w-[20ch] font-sans text-[clamp(1.9rem,4.5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-mehr-ink">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-mehr-mist sm:text-base">
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-8 overflow-hidden rounded-[1.5rem] sm:mt-10 sm:rounded-[1.75rem]">
              <img
                src={image}
                alt=""
                className="aspect-[21/9] min-h-[200px] w-full object-cover sm:min-h-[260px]"
              />
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mx-auto mt-10 max-w-3xl space-y-5 pb-6 sm:mt-12 sm:pb-8">
              {(post.body || []).map((para) => (
                <p
                  key={para.slice(0, 48)}
                  className="text-[15px] leading-[1.75] text-mehr-mist sm:text-[16px]"
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </article>

      <section className="border-t border-mehr-deep/8 bg-mehr-panel/40 py-12 sm:py-14">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <div className="flex items-end justify-between gap-4">
            <h2 className="font-sans text-[clamp(1.4rem,2.5vw,1.85rem)] font-semibold tracking-[-0.03em] text-mehr-ink">
              More insights
            </h2>
            <Link
              to="/media"
              className="inline-flex items-center gap-1 text-sm font-semibold text-mehr-deep"
            >
              View all
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/media/${item.id}`}
                className="group overflow-hidden rounded-[1.35rem] border border-mehr-deep/8 bg-white shadow-soft transition hover:-translate-y-1 hover:border-mehr-deep/18 hover:shadow-float sm:rounded-[1.5rem]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={imageForPost(item.id)}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-mehr-deep">
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-sans text-[15px] font-semibold leading-snug text-mehr-ink sm:text-base">
                    {item.title}
                  </h3>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-mehr-deep">
                    Read
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
        title="Need help applying this to your organisation?"
        body="Share your current people challenge and we'll help you identify the right next step."
      />
    </>
  );
}
