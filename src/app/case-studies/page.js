import CaseStudies from "@/legacy-pages/CaseStudies";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.caseStudies, path: "/case-studies" });

export default function Page() {
  return <CaseStudies />;
}
