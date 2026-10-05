"use client";

import { useEffect } from "react";
import { useLocation } from "@/components/compat/router";
import { siteName, seo as seoDefaults } from "../../data/content";

function upsertMeta(attr, key, content) {
 if (!content) return;
 let el = document.querySelector(`meta[${attr}="${key}"]`);
 if (!el) {
 el = document.createElement("meta");
 el.setAttribute(attr, key);
 document.head.appendChild(el);
 }
 el.setAttribute("content", content);
}

function upsertLink(rel, href) {
 if (!href) return;
 let el = document.querySelector(`link[rel="${rel}"]`);
 if (!el) {
 el = document.createElement("link");
 el.setAttribute("rel", rel);
 document.head.appendChild(el);
 }
 el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
 let el = document.getElementById(id);
 if (!el) {
 el = document.createElement("script");
 el.type = "application/ld+json";
 el.id = id;
 document.head.appendChild(el);
 }
 el.textContent = JSON.stringify(data);
}

/**
 * Strong client-side SEO: title, description, keywords, canonical,
 * Open Graph, Twitter, and Organization / WebPage JSON-LD.
 */
export default function PageSEO({
 title,
 description,
 keywords,
 path,
 type = "website",
 noIndex = false,
}) {
 const location = useLocation();

 useEffect(() => {
 const origin =
 typeof window !== "undefined" ? window.location.origin : "https://me-hr.com";
 const canonicalPath = path || location.pathname || "/";
 const canonical = `${origin}${canonicalPath === "/" ? "" : canonicalPath}`;
 const fullTitle = title || `${siteName} | HR outsourcing services in Pune`;

 document.title = fullTitle;

 upsertMeta("name", "description", description);
 upsertMeta("name", "keywords", keywords);
 upsertMeta("name", "author", siteName);
 upsertMeta("name", "robots", noIndex ? "noindex,nofollow" : "index,follow,max-image-preview:large");
 upsertMeta("name", "googlebot", noIndex ? "noindex,nofollow" : "index,follow");

 upsertLink("canonical", canonical);

 upsertMeta("property", "og:title", fullTitle);
 upsertMeta("property", "og:description", description);
 upsertMeta("property", "og:type", type);
 upsertMeta("property", "og:url", canonical);
 upsertMeta("property", "og:site_name", siteName);
 upsertMeta("property", "og:locale", "en_IN");

 upsertMeta("name", "twitter:card", "summary_large_image");
 upsertMeta("name", "twitter:title", fullTitle);
 upsertMeta("name", "twitter:description", description);

 upsertJsonLd("mehr-org-jsonld", {
 "@context": "https://schema.org",
 "@type": "Organization",
 name: siteName,
 url: origin,
 email: "ask@me-hr.com",
 telephone: "+91-8600898604",
 address: {
 "@type": "PostalAddress",
 streetAddress: "1 Floor, Thread Works, 1156 Saifee Lane, MG Road",
 addressLocality: "Pune",
 addressRegion: "Maharashtra",
 postalCode: "411001",
 addressCountry: "IN",
 },
 areaServed: "IN",
 description: seoDefaults.home.description,
 knowsAbout: [
 "HR Outsourcing",
 "On-Demand HR",
 "Resident HR",
 "Strategic HR Consulting",
 "Payroll Outsourcing",
 "KEKA HRMS",
 "KEKA implementation",
 "HROne",
 "greytHR",
 "HRMS implementation",
 ],
 });

 upsertJsonLd("mehr-webpage-jsonld", {
 "@context": "https://schema.org",
 "@type": "WebPage",
 name: fullTitle,
 description,
 url: canonical,
 isPartOf: {
 "@type": "WebSite",
 name: siteName,
 url: origin,
 },
 about: {
 "@type": "Thing",
 name: "HR outsourcing services",
 },
 inLanguage: "en-IN",
 });
 }, [title, description, keywords, path, type, noIndex, location.pathname]);

 return null;
}
