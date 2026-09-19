const fs = require("fs");
const path = require("path");

const APP = path.join(__dirname, "..", "src", "app");

const routes = [
  { dir: "", component: "Home", seoKey: "home", urlPath: "/" },
  { dir: "about", component: "About", seoKey: "about" },
  { dir: "services", component: "Services", seoKey: "services" },
  { dir: "services/on-demand-hr", component: "OnDemandHR", seoKey: "onDemand" },
  { dir: "services/hr-retainership", component: "HRRetainership", seoKey: "retainership" },
  { dir: "services/strategic-consulting", component: "StrategicConsulting", seoKey: "strategic" },
  { dir: "pagar", component: "Pagar", seoKey: "pagar" },
  { dir: "pricing", component: "Pricing", seoKey: "pricing" },
  { dir: "case-studies", component: "CaseStudies", seoKey: "caseStudies" },
  { dir: "life", component: "Life", seoKey: "life" },
  { dir: "careers", component: "Careers", seoKey: "careers" },
  { dir: "media", component: "Media", seoKey: "media" },
  { dir: "faqs", component: "FAQs", seoKey: "faqs" },
  { dir: "contact", component: "Contact", seoKey: "contact" },
];

for (const route of routes) {
  const dir = route.dir ? path.join(APP, route.dir) : APP;
  fs.mkdirSync(dir, { recursive: true });

  const urlPath = route.urlPath ?? `/${route.dir}`;
  const contents = `import ${route.component} from "@/legacy-pages/${route.component}";
import { buildMetadata } from "@/lib/seo";
import { seo } from "@/data/content";

export const metadata = buildMetadata({ ...seo.${route.seoKey}, path: "${urlPath}" });

export default function Page() {
  return <${route.component} />;
}
`;

  fs.writeFileSync(path.join(dir, "page.js"), contents, "utf8");
}

console.log(`generated ${routes.length} route files`);
