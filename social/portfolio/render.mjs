import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { doc, root } from './lib.mjs';

const { loadPlaywright } = await import(pathToFileURL(join(root, 'tools', 'browser.mjs')).href);
const out = join(root, 'src', 'assets', 'portfolio');
const tmp = join(root, 'social', '.tmp', 'portfolio');
mkdirSync(out, { recursive: true });
mkdirSync(tmp, { recursive: true });

const only = process.argv.slice(2);
const sets = await Promise.all(
  ['posts-a', 'posts-b', 'carousel', 'stories', 'cover'].map(async (n) => {
    try {
      return (await import(`./${n}.mjs`)).items ?? [];
    } catch (e) {
      if (e.code === 'ERR_MODULE_NOT_FOUND') return [];
      throw e;
    }
  }),
);
const items = sets.flat().filter((i) => only.length === 0 || only.some((o) => i.file.includes(o)));

const { chromium } = await loadPlaywright();
let browser;
try {
  browser = await chromium.launch({ channel: 'msedge' });
} catch {
  browser = await chromium.launch();
}
for (const item of items) {
  const page = await browser.newPage({
    viewport: { width: item.w, height: item.h },
    deviceScaleFactor: 1,
  });
  const html = join(tmp, `${item.file}.html`);
  writeFileSync(html, doc(item.w, item.h, item.cls, item.html()));
  await page.goto(pathToFileURL(html).href, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() =>
    [...document.images].every((i) => i.complete && i.naturalWidth > 0),
  );
  await page.screenshot({ path: join(out, `${item.file}.jpg`), type: 'jpeg', quality: 92 });
  await page.close();
  console.log('ok', item.file);
}
await browser.close();
