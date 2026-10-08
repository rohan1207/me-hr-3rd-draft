import HRRetainership from "@/legacy-pages/HRRetainership";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";

export const metadata = pageMetadata(PAGE_SEO.retainership);

export default function Page() {
  return <HRRetainership />;
}
