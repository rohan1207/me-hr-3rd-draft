"use client";

import { seo } from "../data/content";
import { onDemandHrPage } from "../data/servicePages";
import ServiceDetailPage from "../components/templates/ServiceDetailPage";

export default function OnDemandHR() {
 return (
 <ServiceDetailPage
 seoData={seo.onDemand}
 page={onDemandHrPage}
 excludePath="/services/on-demand-hr"
 />
 );
}
