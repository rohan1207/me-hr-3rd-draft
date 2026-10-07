/**
 * Posts form payloads to a Google Apps Script web app.
 * Sheets + Resend live in Apps Script (no site backend).
 *
 * URL resolution (first match wins):
 * 1. __MEHR_APPS_SCRIPT_URL__ — vite define from VITE_GOOGLE_APPS_SCRIPT_URL
 * 2. FORMS_APPS_SCRIPT_URL_FALLBACK — always available in source
 */

import { FORMS_APPS_SCRIPT_URL_FALLBACK } from "../config/forms";

function scriptUrl() {
  try {
    if (typeof __MEHR_APPS_SCRIPT_URL__ === "string" && __MEHR_APPS_SCRIPT_URL__.trim()) {
      return __MEHR_APPS_SCRIPT_URL__.trim();
    }
  } catch {
    // ignore
  }

  if (
    typeof FORMS_APPS_SCRIPT_URL_FALLBACK === "string" &&
    FORMS_APPS_SCRIPT_URL_FALLBACK.trim()
  ) {
    return FORMS_APPS_SCRIPT_URL_FALLBACK.trim();
  }

  return "";
}

/**
 * @param {"contact" | "careers" | "newsletter"} type
 * @param {Record<string, string>} fields
 */
export async function submitForm(type, fields = {}) {
  const url = scriptUrl();

  console.log("[submitForm]", {
    type,
    hasUrl: Boolean(url),
    urlHost: url
      ? (() => {
          try {
            return new URL(url).host;
          } catch {
            return "(invalid)";
          }
        })()
      : null,
  });

  if (!url) {
    console.error("[submitForm] No Apps Script URL configured");
    throw new Error(
      "Form endpoint is not configured. Please try again later or email ask@me-hr.com."
    );
  }

  const payload = {
    type,
    ...fields,
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    submittedAt: new Date().toISOString(),
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  console.log("[submitForm] response", {
    status: res.status,
    ok: data && data.ok,
    sheet: data && data.sheet,
    email: data && data.email,
    warnings: data && data.warnings,
  });

  if (!res.ok || !data || data.ok !== true) {
    console.error("[submitForm] failed", { status: res.status, data });
    throw new Error(
      (data && data.error) || "Could not submit the form. Please try again."
    );
  }

  return data;
}
