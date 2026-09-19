"use client";

import { seo } from "../data/content";
import { retainershipPage } from "../data/servicePages";
import ServiceDetailPage from "../components/templates/ServiceDetailPage";

export default function HRRetainership() {
 return (
 <ServiceDetailPage
 seoData={seo.retainership}
 page={retainershipPage}
 excludePath="/services/hr-retainership"
 />
 );
}
