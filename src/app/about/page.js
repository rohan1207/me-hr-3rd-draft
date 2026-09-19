import About from "@/legacy-pages/About";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.about, path: "/about" });

export default function Page() {
  return <About />;
}
