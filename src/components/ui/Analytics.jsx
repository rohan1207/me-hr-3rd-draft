import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { GA_MEASUREMENT_ID } from "../../config/analytics";

function resolveGaId() {
  try {
    if (typeof __MEHR_GA_ID__ === "string" && __MEHR_GA_ID__.trim()) {
      return __MEHR_GA_ID__.trim();
    }
  } catch {
    // ignore
  }
  return GA_MEASUREMENT_ID;
}

function ensureGtag(id) {
  if (!id || typeof window === "undefined") return false;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
    window.gtag("js", new Date());
    window.gtag("config", id, { send_page_view: false });
  }

  return true;
}

function sendPageView(id, location) {
  if (!id || typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: location.pathname + location.search + location.hash,
    page_location: window.location.href,
    page_title: document.title,
    send_to: id,
  });
}

/**
 * GA4 on every route. Tag is also in index.html for first paint;
 * this component sends page_view on SPA navigations (skips duplicate first load).
 */
export default function Analytics() {
  const location = useLocation();
  const skipFirst = useRef(true);
  const gaId = resolveGaId();

  useEffect(() => {
    ensureGtag(gaId);
  }, [gaId]);

  useEffect(() => {
    if (!gaId) return;
    ensureGtag(gaId);

    // index.html already recorded the initial page_view
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }

    sendPageView(gaId, location);
  }, [gaId, location.pathname, location.search, location.hash]);

  return null;
}

export function trackEvent(name, params = {}) {
  const id = resolveGaId();
  if (!id || typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, { ...params, send_to: id });
}
