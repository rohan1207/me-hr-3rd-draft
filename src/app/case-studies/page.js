import CaseStudies from "@/legacy-pages/CaseStudies";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.caseStudies);

export default function Page() {
  return <CaseStudies />;
}
