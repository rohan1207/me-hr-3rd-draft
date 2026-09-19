const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..", "src");
const TARGET_DIRS = ["components", "legacy-pages"];

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(jsx|js)$/.test(entry.name)) files.push(full);
  }
}
for (const d of TARGET_DIRS) walk(path.join(ROOT, d));
walk(path.join(ROOT, "context"));

let changed = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  let src = original;

  // point react-router imports at the compat shim
  src = src.replace(/(["'])react-router-dom\1/g, '"@/components/compat/router"');

  // every copied component is interactive (hooks / framer-motion / browser APIs)
  if (!/^\s*["']use client["'];?/.test(src)) {
    src = `"use client";\n\n${src}`;
  }

  if (src !== original) {
    fs.writeFileSync(file, src, "utf8");
    changed += 1;
  }
}

console.log(`files scanned: ${files.length}, files updated: ${changed}`);
