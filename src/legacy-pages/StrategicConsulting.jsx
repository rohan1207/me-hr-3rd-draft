"use client";

import { seo } from "../data/content";
import { strategicPage } from "../data/servicePages";
import ServiceDetailPage from "../components/templates/ServiceDetailPage";

export default function StrategicConsulting() {
 return (
 <ServiceDetailPage
 seoData={seo.strategic}
 page={strategicPage}
 excludePath="/services/strategic-consulting"
 />
 );
}
