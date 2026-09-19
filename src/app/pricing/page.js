import Pricing from "@/legacy-pages/Pricing";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.pricing, path: "/pricing" });

export default function Page() {
  return <Pricing />;
}
