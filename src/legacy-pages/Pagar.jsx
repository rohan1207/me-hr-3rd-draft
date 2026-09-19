"use client";

import { seo } from "../data/content";
import { pagarPage } from "../data/servicePages";
import ServiceDetailPage from "../components/templates/ServiceDetailPage";
import PagarHero from "../components/sections/pagar/PagarHero";

export default function Pagar() {
 return (
 <ServiceDetailPage
 seoData={seo.pagar}
 page={pagarPage}
 excludePath="/pagar"
 hero={<PagarHero />}
 />
 );
}
