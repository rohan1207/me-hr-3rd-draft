import Services from "@/legacy-pages/Services";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.services);

export default function Page() {
  return <Services />;
}
