import CaseStudyArticle from "@/legacy-pages/CaseStudyArticle";
import { buildMetadata, pageMetadata, PAGE_SEO, SITE } from "@/lib/seo";
import { caseStudies } from "@/data/content";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.id }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.id === slug);

  if (!study) {
    return pageMetadata({ ...PAGE_SEO.caseStudies, absolute: true });
  }

  const path = `/case-studies/${study.id}`;
  const raw = study.challenge || study.summary || study.title;
  const description = raw.length > 157 ? `${raw.slice(0, 157)}…` : raw;

  return buildMetadata({
    title: study.title,
    description,
    path,
    absolute: false,
    ogType: "article",
    openGraph: {
      type: "article",
      // TODO(client): add datePublished / dateModified on case studies
      authors: [SITE.founder.name],
    },
  });
}

export default function Page() {
  return <CaseStudyArticle />;
}
