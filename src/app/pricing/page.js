import Pricing from "@/legacy-pages/Pricing";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.pricing);

export default function Page() {
  return <Pricing />;
}
