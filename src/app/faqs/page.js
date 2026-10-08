import FAQs from "@/legacy-pages/FAQs";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.faqs);

export default function Page() {
  return <FAQs />;
}
