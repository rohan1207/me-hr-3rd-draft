import PrivacyPolicy from "@/legacy-pages/PrivacyPolicy";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.privacy);

export default function Page() {
  return <PrivacyPolicy />;
}
