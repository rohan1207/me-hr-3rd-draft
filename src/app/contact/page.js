import Contact from "@/legacy-pages/Contact";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.contact);

export default function Page() {
  return <Contact />;
}
