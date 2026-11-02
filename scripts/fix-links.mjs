/**
 * Zet alle interne links in src/ om naar de base-pad-versie.
 * Eén keer draaien; daarna de handmatige controle.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const srcDir = path.join(root, 'src');

const walk = (dir) => {
  const entries = [];
  for (const name of readdirSync(dir)) {
    const full = path.join(dir, name);
    if (statSync(full).isDirectory()) entries.push(...walk(full));
    else if (name.endsWith('.astro')) entries.push(full);
  }
  return entries;
};

const relative = (file) => path.relative(srcDir, file).split(path.sep).join('/');

let changedFiles = 0;
let changedLinks = 0;

for (const file of walk(srcDir)) {
  let source = readFileSync(file, 'utf8');
  const before = source;

  // 1. Statische href="/..." -> href={withBase('/...')}
  source = source.replace(/href="(\/[^"{]*)"/g, (_match, target) => {
    changedLinks += 1;
    return `href={withBase('${target}')}`;
  });

  // 2. href="#..." blijft intern anker op dezelfde pagina
  // 3. Variabele interne links: navItems en cta-links
  source = source.replace(/href=\{item\.href\}/g, 'href={withBase(item.href)}');
  source = source.replace(/href=\{act\.cta\.href\}/g, 'href={withBase(act.cta.href)}');

  if (source !== before) {
    // Zorg dat de helper geïmporteerd wordt
    if (!source.includes("from '../lib/urls'") && !source.includes('from "../lib/urls"')) {
      const depth = relative(file).split('/').length - 1;
      const importPath = depth === 0 ? './lib/urls' : `${'../'.repeat(depth)}lib/urls`;
      const importLine = `import { withBase } from '${importPath}';\n`;

      // Zet de import na de laatste bestaande import
      const importMatches = [...source.matchAll(/^import .*?;$/gm)];
      if (importMatches.length > 0) {
        const last = importMatches[importMatches.length - 1];
        const end = last.index + last[0].length;
        source = `${source.slice(0, end)}\n${importLine.trim()}${source.slice(end)}`;
      } else {
        source = `${importLine}${source}`;
      }
    }

    writeFileSync(file, source);
    changedFiles += 1;
    console.log(`bijgewerkt: ${relative(file)}`);
  }
}

console.log(`\n${changedLinks} interne links omgezet in ${changedFiles} bestanden.`);
