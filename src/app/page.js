import Home from "@/legacy-pages/Home";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.home, path: "/" });

export default function Page() {
  return <Home />;
}
