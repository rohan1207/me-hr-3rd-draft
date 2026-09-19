"use client";

import {
 servicesContent,
 homeContent,
 seo,
 ctas,
} from "../data/content";
import PageSEO from "../components/ui/PageSEO";
import ServicesHero from "../components/sections/services/ServicesHero";
import ServicesPreview from "../components/sections/ServicesPreview";
import CapabilitiesGrid from "../components/sections/CapabilitiesGrid";
import PagarPreview from "../components/sections/PagarPreview";
// import ExploreOtherServices from "../components/sections/ExploreOtherServices";
import CTABanner from "../components/ui/CTABanner";

export default function Services() {
 const { capabilitiesEyebrow } = servicesContent;

 return (
 <>
 <PageSEO {...seo.services} path="/services" />
 <ServicesHero />

 <ServicesPreview />

 <CapabilitiesGrid
 eyebrow={homeContent.capabilities.eyebrow}
 title={capabilitiesEyebrow}
 includeAudit
 />

 <PagarPreview />

 {/* Repeated with ServicesPreview model cards — keep on service detail pages only */}
 {/* <ExploreOtherServices /> */}

 <CTABanner cta={ctas.primary} />
 </>
 );
}
