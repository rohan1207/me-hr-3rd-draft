import Media from "@/legacy-pages/Media";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.media);

export default function Page() {
  return <Media />;
}
