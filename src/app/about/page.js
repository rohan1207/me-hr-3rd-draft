import About from "@/legacy-pages/About";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.about);

export default function Page() {
  return <About />;
}
