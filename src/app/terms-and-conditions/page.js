import TermsAndConditions from "@/legacy-pages/TermsAndConditions";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.terms, path: "/terms-and-conditions" });

export default function Page() {
  return <TermsAndConditions />;
}
