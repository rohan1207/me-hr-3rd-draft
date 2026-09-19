import Careers from "@/legacy-pages/Careers";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.careers, path: "/careers" });

export default function Page() {
  return <Careers />;
}
