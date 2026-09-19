import Pagar from "@/legacy-pages/Pagar";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.pagar, path: "/pagar" });

export default function Page() {
  return <Pagar />;
}
