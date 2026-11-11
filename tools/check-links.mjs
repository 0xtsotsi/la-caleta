// Controleert elke interne href/src in dist/ tegen de bestanden die er echt staan.
// Gebruik: DEPLOY_BASE=la-caleta npm run build && node tools/check-links.mjs la-caleta
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const base = `/${(process.argv[2] ?? process.env.DEPLOY_BASE ?? "").replace(/^\/+|\/+$/g, "")}`.replace(/^\/$/, "");
const dist = "dist";
const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".html")) files.push(path);
  }
};
walk(dist);

let broken = 0;
let checked = 0;
for (const file of files) {
  const html = readFileSync(file, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, attr, raw] of html.matchAll(/\s(href|src)="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:|\/\/)/.test(raw)) continue;
    checked++;
    if (raw.startsWith("#")) {
      if (raw.length > 1 && !ids.has(raw.slice(1))) {
        broken++;
        console.log(`FAIL  ${file}: anker ${raw} bestaat niet`);
      }
      continue;
    }
    const [pathPart, hash] = raw.split("#");
    const clean = pathPart.split("?")[0];
    if (!clean.startsWith(`${base}/`)) {
      broken++;
      console.log(`FAIL  ${file}: ${attr}="${raw}" mist het basispad ${base}/`);
      continue;
    }
    let target = join(dist, decodeURIComponent(clean.slice(base.length)));
    if (clean.endsWith("/")) target = join(target, "index.html");
    if (!existsSync(target)) {
      broken++;
      console.log(`FAIL  ${file}: ${raw} -> ${target} bestaat niet`);
      continue;
    }
    if (hash && target.endsWith(".html")) {
      const targetHtml = readFileSync(target, "utf8");
      if (!targetHtml.includes(`id="${hash}"`)) {
        broken++;
        console.log(`FAIL  ${file}: anker #${hash} ontbreekt in ${target}`);
      }
    }
  }
}
console.log(`\n${files.length} pagina's, ${checked} interne links, ${broken} kapot`);
if (broken) process.exitCode = 1;
