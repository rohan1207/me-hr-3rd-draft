import OnDemandHR from "@/legacy-pages/OnDemandHR";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.onDemand, path: "/services/on-demand-hr" });

export default function Page() {
  return <OnDemandHR />;
}
