import Services from "@/legacy-pages/Services";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.services, path: "/services" });

export default function Page() {
  return <Services />;
}
