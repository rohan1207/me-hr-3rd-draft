import StrategicConsulting from "@/legacy-pages/StrategicConsulting";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.strategic, path: "/services/strategic-consulting" });

export default function Page() {
  return <StrategicConsulting />;
}
