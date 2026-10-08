import StrategicConsulting from "@/legacy-pages/StrategicConsulting";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.strategic);

export default function Page() {
  return <StrategicConsulting />;
}
