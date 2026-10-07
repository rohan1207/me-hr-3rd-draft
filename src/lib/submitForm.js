/**
 * Posts form payloads to a Google Apps Script web app.
 * Sheets + Resend live in Apps Script (no site backend).
 *
 * Env (must be present at BUILD time on Vercel):
 * - Vite: VITE_GOOGLE_APPS_SCRIPT_URL
 * - Next: NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
 *
 * Important: access Vite env as import.meta.env.VITE_* (no optional chaining) —
 * Vite only statically replaces that exact pattern.
 */

function scriptUrl() {
  // Vite — do not use import.meta.env?.VITE_* (breaks build-time inject)
  const viteUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL;
  if (typeof viteUrl === "string" && viteUrl.trim()) {
    return viteUrl.trim();
  }

  try {
    const nextUrl =
      typeof process !== "undefined"
        ? process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL
        : "";
    if (typeof nextUrl === "string" && nextUrl.trim()) {
      return nextUrl.trim();
    }
  } catch {
    // process may be undefined in browser
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
    urlHost: url ? (() => { try { return new URL(url).host; } catch { return "(invalid)"; } })() : null,
    mode: import.meta.env.MODE,
    viteEnvPresent: Boolean(import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL),
  });

  if (!url) {
    console.error(
      "[submitForm] Missing VITE_GOOGLE_APPS_SCRIPT_URL at build time. Redeploy after setting the Vercel env var."
    );
    throw new Error(
      "Missing Google Apps Script URL. Set VITE_GOOGLE_APPS_SCRIPT_URL on Vercel and redeploy."
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

  console.log("[submitForm] response", {
    status: res.status,
    ok: data?.ok,
    sheet: data?.sheet,
    email: data?.email,
    warnings: data?.warnings,
  });

  // Require explicit { ok: true } from Apps Script — do not treat HTML redirects as success
  if (!res.ok || !data || data.ok !== true) {
    console.error("[submitForm] failed", { status: res.status, data });
    throw new Error(data?.error || "Could not submit the form. Please try again.");
  }

  return data;
}
