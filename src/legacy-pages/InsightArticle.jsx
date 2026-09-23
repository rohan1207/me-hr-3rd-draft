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
        <div className="container-mehr page-gutter pt-6 sm:pt-10 md:px-4 lg:px-5 lg:pt-12">
          <Link
            to="/media"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-mehr-deep transition hover:text-mehr-ink sm:text-sm"
          >
            <ArrowLeft size={15} />
            Back to Insights
          </Link>

          <Reveal>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-mehr-deep sm:mt-6 sm:text-[11px]">
              {post.category}
              {post.readTime ? ` · ${post.readTime}` : ""}
            </p>
            <h1 className="mt-2.5 max-w-[20ch] font-sans text-[clamp(1.55rem,6.5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-0.035em] text-mehr-ink sm:mt-3 sm:leading-[1.08]">
              {post.title}
            </h1>
            <p className="mt-3.5 max-w-2xl text-[13px] leading-relaxed text-mehr-mist sm:mt-4 sm:text-[15px] md:text-base">
              {post.excerpt}
            </p>
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

          <Reveal delay={0.12}>
            <div className="mx-auto mt-7 max-w-3xl space-y-4 pb-5 sm:mt-12 sm:space-y-5 sm:pb-8">
              {(post.body || []).map((para) => (
                <p
                  key={para.slice(0, 48)}
                  className="text-[14px] leading-[1.7] text-mehr-mist sm:text-[16px] sm:leading-[1.75]"
                >
                  {para}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </article>

      <section className="border-t border-mehr-deep/8 bg-mehr-panel/40 py-9 sm:py-14">
        <div className="container-mehr page-gutter sm:px-3 md:px-4 lg:px-5">
          <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:text-left">
            <h2 className="font-sans text-[clamp(1.3rem,5.5vw,1.85rem)] font-semibold tracking-[-0.03em] text-mehr-ink">
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

          {/* Phone: snap carousel · sm+: grid */}
          <div className="-mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:mx-0 sm:mt-7 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-5 [&::-webkit-scrollbar]:hidden">
            {related.map((item) => (
              <Link
                key={item.id}
                to={`/media/${item.id}`}
                className="group w-[min(78vw,18.5rem)] shrink-0 snap-center overflow-hidden rounded-[1.25rem] border border-mehr-deep/8 bg-white shadow-soft transition hover:-translate-y-1 hover:border-mehr-deep/18 hover:shadow-float sm:w-auto sm:rounded-[1.5rem]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={imageForPost(item.id)}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-3.5 sm:p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-mehr-deep">
                    {item.category}
                  </p>
                  <h3 className="mt-2 font-sans text-[14px] font-semibold leading-snug text-mehr-ink sm:text-base">
                    {item.title}
                  </h3>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-mehr-deep sm:mt-3">
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
