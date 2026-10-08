import TermsAndConditions from "@/legacy-pages/TermsAndConditions";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.terms);

export default function Page() {
  return <TermsAndConditions />;
}
