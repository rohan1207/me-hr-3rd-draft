import OnDemandHR from "@/legacy-pages/OnDemandHR";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.onDemand);

export default function Page() {
  return <OnDemandHR />;
}
