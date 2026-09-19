import HRRetainership from "@/legacy-pages/HRRetainership";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.retainership, path: "/services/hr-retainership" });

export default function Page() {
  return <HRRetainership />;
}
