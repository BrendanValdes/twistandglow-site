#!/usr/bin/env node
/**
 * Materialize Lovable asset pointers into real binaries.
 *
 * Lovable exports assets as `<name>.<ext>.asset.json` pointer files whose `url`
 * field is host-relative (`/__l5e/assets-v1/<asset_id>/<name>.<ext>`). In the
 * Lovable sandbox a Vite dev middleware proxies that path to the preview host;
 * outside it, nothing serves it, so every image/video 404s.
 *
 * This script:
 *   1. walks the repo for `*.asset.json`
 *   2. downloads each referenced asset to the sibling real path, verifying the
 *      byte count against the pointer's `size` field
 *   3. rewrites `import x from ".../foo.jpg.asset.json"` to ".../foo.jpg" and
 *      strips the now-invalid `.url` member access (a real Vite asset import
 *      resolves to a URL string, not an object)
 *   4. deletes the pointer files
 *
 * Idempotent: re-running with no pointers left is a no-op. Pass --dry-run to
 * see the plan without touching anything.
 */
import { readFile, writeFile, readdir, stat, unlink } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { Readable } from "node:stream";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");

// Lovable serves project assets from <project_id>.lovableproject.com. Override
// with LOVABLE_ASSET_HOST if the project moves or you have a custom preview host.
const HOST_OVERRIDE = process.env.LOVABLE_ASSET_HOST;
const hostFor = (pointer) =>
  HOST_OVERRIDE ?? `https://${pointer.project_id}.lovableproject.com`;

const SKIP_DIRS = new Set([
  "node_modules", ".git", "dist", ".netlify", ".output", ".tanstack", ".wrangler", ".vite",
]);
const SOURCE_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".html"]);

async function walk(dir, onFile) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(path.join(dir, entry.name), onFile);
    } else if (entry.isFile()) {
      await onFile(path.join(dir, entry.name));
    }
  }
}

/** Escape a string for literal use inside a RegExp. */
const rx = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function download(url, dest, expectedSize) {
  const res = await fetch(url, { redirect: "follow" });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  await pipeline(Readable.fromWeb(res.body), createWriteStream(dest));
  const { size } = await stat(dest);
  if (expectedSize != null && size !== expectedSize) {
    throw new Error(`size mismatch: got ${size} bytes, pointer says ${expectedSize}`);
  }
  return size;
}

// ---------------------------------------------------------------- 1. discover
const pointerFiles = [];
await walk(ROOT, (file) => {
  if (file.endsWith(".asset.json")) pointerFiles.push(file);
});
pointerFiles.sort();

if (pointerFiles.length === 0) {
  console.log("No .asset.json pointer files found — nothing to do.");
  process.exit(0);
}
console.log(`Found ${pointerFiles.length} pointer file(s)${DRY_RUN ? " (dry run)" : ""}\n`);

// ------------------------------------------------------------- 2. download
const downloaded = [];
const failures = [];
let bytes = 0;

for (const pointerFile of pointerFiles) {
  const rel = path.relative(ROOT, pointerFile);
  let pointer;
  try {
    pointer = JSON.parse(await readFile(pointerFile, "utf8"));
  } catch (err) {
    failures.push({ rel, reason: `unparseable pointer: ${err.message}` });
    continue;
  }
  if (!pointer.url) {
    failures.push({ rel, reason: "pointer has no `url` field" });
    continue;
  }

  const dest = pointerFile.replace(/\.asset\.json$/, "");
  const url = new URL(pointer.url, hostFor(pointer)).href;

  if (DRY_RUN) {
    console.log(`  would fetch ${url}\n            -> ${path.relative(ROOT, dest)}`);
    downloaded.push({ pointerFile, dest, rel });
    continue;
  }

  try {
    const size = await download(url, dest, pointer.size);
    bytes += size;
    downloaded.push({ pointerFile, dest, rel });
    console.log(`  ok  ${path.relative(ROOT, dest)} (${size} bytes)`);
  } catch (err) {
    failures.push({ rel, reason: err.message });
    console.error(`  FAIL ${rel}: ${err.message}`);
  }
}

if (failures.length) {
  console.error(
    `\n${failures.length} download(s) failed. Refusing to rewrite sources or ` +
      `delete pointers — fix these first:\n` +
      failures.map((f) => `  ${f.rel}: ${f.reason}`).join("\n"),
  );
  process.exit(1);
}
console.log(`\nDownloaded ${downloaded.length} asset(s), ${(bytes / 1048576).toFixed(1)} MB\n`);

// -------------------------------------------------------- 3. rewrite sources
// Build the set of specifier suffixes we need to strip, e.g. "hero-poster.jpg".
const assetBasenames = new Set(downloaded.map((d) => path.basename(d.dest)));

const sourceFiles = [];
await walk(path.join(ROOT, "src"), (file) => {
  if (SOURCE_EXTS.has(path.extname(file))) sourceFiles.push(file);
});

let filesChanged = 0;
const leftoverUrlAccess = [];

for (const file of sourceFiles) {
  const before = await readFile(file, "utf8");
  if (!before.includes(".asset.json")) continue;
  let after = before;

  // 3a. Drop the `.asset.json` suffix from any import/require/url() specifier
  //     that points at an asset we just materialized.
  const bindings = new Set();
  after = after.replace(
    /(["'])([^"']*?\/([^"'/]+))\.asset\.json\1/g,
    (match, quote, specifierBase, basename) => {
      if (!assetBasenames.has(basename)) return match;
      return `${quote}${specifierBase}${quote}`;
    },
  );

  // 3b. Collect the identifiers bound to those imports so we can fix `.url`.
  for (const [, ident] of after.matchAll(
    /\bimport\s+([A-Za-z_$][\w$]*)\s+from\s*["'][^"']*\/([^"'/]+)["']/g,
  )) {
    bindings.add(ident);
  }
  for (const [, ident, basename] of before.matchAll(
    /\bimport\s+([A-Za-z_$][\w$]*)\s+from\s*["'][^"']*\/([^"'/]+)\.asset\.json["']/g,
  )) {
    if (assetBasenames.has(basename)) bindings.add(ident);
  }

  // 3c. A materialized Vite asset import is a URL *string*, so `foo.url` is no
  //     longer valid. Strip it for every identifier we just rebound.
  for (const ident of bindings) {
    after = after.replace(new RegExp(`\\b${rx(ident)}\\.url\\b`, "g"), ident);
  }

  // 3d. Assets also flow through object/array literals (`{ img: corporate }`
  //     then `c.img.url`, or `[uv1, uv2].map(img => img.url)`). Those reads are
  //     indirect, so the identifier pass above cannot see them. In this codebase
  //     `.url` is only ever an asset accessor, so strip what remains — and log
  //     each one so the rewrite stays auditable.
  for (const [, expr] of after.matchAll(/((?:[A-Za-z_$][\w$]*\.)+)url\b/g)) {
    leftoverUrlAccess.push(`${path.relative(ROOT, file)}: ${expr}url -> ${expr.slice(0, -1)}`);
  }
  after = after.replace(/\b([A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\.url\b/g, "$1");

  if (after !== before) {
    filesChanged++;
    if (!DRY_RUN) await writeFile(file, after);
    console.log(`  rewrote ${path.relative(ROOT, file)}`);
  }
}

if (leftoverUrlAccess.length) {
  console.log(`\nIndirect .url accesses stripped (verify with tsc):`);
  for (const l of leftoverUrlAccess) console.log(`  ${l}`);
}
console.log(`\n${filesChanged} source file(s) rewritten`);

// -------------------------------------------------------- 4. delete pointers
if (!DRY_RUN) {
  for (const { pointerFile } of downloaded) await unlink(pointerFile);
}
console.log(`${downloaded.length} pointer file(s) deleted\n`);
console.log("Done. Next: `npx tsc --noEmit` then `npm run build`.");
