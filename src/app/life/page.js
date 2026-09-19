import Life from "@/legacy-pages/Life";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.life, path: "/life" });

export default function Page() {
  return <Life />;
}
