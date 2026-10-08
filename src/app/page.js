import Home from "@/legacy-pages/Home";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.home);

export default function Page() {
  return <Home />;
}
