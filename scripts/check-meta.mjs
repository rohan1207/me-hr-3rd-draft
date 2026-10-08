/**
 * Phase 1: validate PAGE_SEO title/description lengths.
 * Run: node scripts/check-meta.mjs
 *
 * Reads pages.js as text (package is not "type":"module") and evaluates the object.
 */
import fs from "node:fs";
import path from "node:path";

const file = path.resolve("src/lib/seo/pages.js");
const src = fs.readFileSync(file, "utf8");
const match = src.match(/export const PAGE_SEO = (\{[\s\S]*\});?\s*$/);
if (!match) {
  console.error("Could not parse PAGE_SEO from", file);
  process.exit(1);
}

const PAGE_SEO = Function(`"use strict"; return (${match[1]})`)();

const TITLE_MAX = 60;
const DESC_MIN = 140;
const DESC_MAX = 160;

let warnings = 0;
let errors = 0;

for (const [key, entry] of Object.entries(PAGE_SEO)) {
  const t = entry.title || "";
  const d = entry.description || "";
  const titleLen = t.length;
  const descLen = d.length;

  if (titleLen > TITLE_MAX + 8) {
    console.error(`[error] ${key} title ${titleLen} chars: ${t}`);
    errors += 1;
  } else if (titleLen > TITLE_MAX) {
    console.warn(`[warn] ${key} title ${titleLen} chars (soft max ${TITLE_MAX})`);
    warnings += 1;
  }

  if (descLen > DESC_MAX) {
    console.warn(`[warn] ${key} description ${descLen} chars (>${DESC_MAX}): trim if needed`);
    warnings += 1;
  } else if (descLen < DESC_MIN && entry.absolute !== false) {
    console.warn(`[warn] ${key} description ${descLen} chars (<${DESC_MIN})`);
    warnings += 1;
  } else {
    console.log(`[ok] ${key} title=${titleLen} desc=${descLen}`);
  }
}

console.log(`\nDone. warnings=${warnings} errors=${errors}`);
process.exit(errors > 0 ? 1 : 0);
