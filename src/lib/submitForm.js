/**
 * Posts form payloads to a Google Apps Script web app.
 * Sheets + Resend live in Apps Script (no site backend).
 *
 * Env:
 * - Vite: VITE_GOOGLE_APPS_SCRIPT_URL
 * - Next: NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
 */

function scriptUrl() {
  if (typeof import.meta !== "undefined" && import.meta.env?.VITE_GOOGLE_APPS_SCRIPT_URL) {
    return String(import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL).trim();
  }
  if (typeof process !== "undefined" && process.env?.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL) {
    return String(process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL).trim();
  }
  return "";
}

/**
 * @param {"contact" | "careers" | "newsletter"} type
 * @param {Record<string, string>} fields
 */
export async function submitForm(type, fields = {}) {
  const url = scriptUrl();
  if (!url) {
    throw new Error(
      "Missing Google Apps Script URL. Set VITE_GOOGLE_APPS_SCRIPT_URL or NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL."
    );
  }

  const payload = {
    type,
    ...fields,
    pageUrl: typeof window !== "undefined" ? window.location.href : "",
    submittedAt: new Date().toISOString(),
  };

  // text/plain avoids CORS preflight; Apps Script still reads JSON body
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

  // Require explicit { ok: true } from Apps Script — do not treat HTML redirects as success
  if (!res.ok || !data || data.ok !== true) {
    throw new Error(data?.error || "Could not submit the form. Please try again.");
  }

  return data;
}
