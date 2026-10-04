import PrivacyPolicy from "@/legacy-pages/PrivacyPolicy";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.privacy, path: "/privacy-policy" });

export default function Page() {
  return <PrivacyPolicy />;
}
