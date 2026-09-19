import Media from "@/legacy-pages/Media";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.media, path: "/media" });

export default function Page() {
  return <Media />;
}
