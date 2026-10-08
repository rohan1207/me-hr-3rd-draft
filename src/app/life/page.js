import Life from "@/legacy-pages/Life";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.life);

export default function Page() {
  return <Life />;
}
