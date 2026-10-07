import CaseStudyArticle from "@/legacy-pages/CaseStudyArticle";
import { buildMetadata } from "@/lib/seo";
import { caseStudies, seo } from "@/data/content";

export function generateStaticParams() {
 return caseStudies.map((study) => ({ slug: study.id }));
}

export async function generateMetadata({ params }) {
 const { slug } = await params;
 const study = caseStudies.find((c) => c.id === slug);

 if (!study) {
 return buildMetadata({ ...seo.caseStudies, path: "/case-studies", noIndex: true });
 }

 return buildMetadata({
 title: `${study.title} | me-HR Case Studies`,
 description: study.challenge,
 keywords: seo.caseStudies.keywords,
 path: `/case-studies/${study.id}`,
 });
}

export default function Page() {
 return <CaseStudyArticle />;
}
