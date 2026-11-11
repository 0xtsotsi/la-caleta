// Toetst het reserveringsformulier: validatie, tijdsloten, statussen en verzenden.
// Web3Forms wordt nagebootst; er gaat niets echt de deur uit.
//   URL=http://localhost:4173/la-caleta/ npm run check:form
//   SHOTS=map/ schrijft screenshots van elke status.
import { loadPlaywright } from "./browser.mjs";

const base = (process.env.URL || "http://localhost:4173/").replace(/\/?$/, "/");
const url = `${base}reserveren/`;
const shots = process.env.SHOTS;
const results = [];
const record = (name, pass, detail) => {
  results.push({ name, pass });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? `  -> ${detail}` : ""}`);
};

const iso = (d) => d.toISOString().slice(0, 10);
const next = (weekday) => {
  const d = new Date(`${new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Amsterdam" }).format(new Date())}T12:00:00Z`);
  do d.setUTCDate(d.getUTCDate() + 1);
  while (d.getUTCDay() !== weekday);
  return iso(d);
};

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
const shot = async (page, name) => {
  if (shots) await page.screenshot({ path: `${shots}/form-${name}.png`, fullPage: false });
};

const open = async (width = 1280) => {
  const page = await browser.newPage({ viewport: { width, height: 1000 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.locator("[data-reserve-form]").scrollIntoViewIfNeeded();
  return page;
};

const fill = async (page) => {
  await page.fill("#datum", next(3));
  await page.dispatchEvent("#datum", "change");
  await page.check('input[name="tijd"][value="19:00"]', { force: true });
  await page.selectOption("#personen", "4");
  await page.fill("#naam", "Familie Jansen");
  await page.fill("#telefoon", "06 12345678");
  await page.fill("#email", "jansen@example.nl");
  await page.fill("#opmerking", "Kinderstoel graag");
};

// 1. Leeg versturen
let page = await open();
const hasKey = (await page.getAttribute("[data-reserve-form]", "data-key")) !== null;
console.log(`Web3Forms-sleutel in de build: ${hasKey ? "ja" : "nee (mailto-terugval)"}`);
await shot(page, "leeg");
await page.click("[data-submit]");
const visibleErrors = await page.$$eval("[data-error-for]:not([hidden])", (els) => els.map((e) => e.dataset.errorFor));
record("leeg versturen toont foutmeldingen", ["datum", "tijd", "naam", "telefoon", "email"].every((n) => visibleErrors.includes(n)), visibleErrors.join(", "));
record("focus springt naar het eerste foute veld", (await page.evaluate(() => document.activeElement?.id)) === "datum");
record("aria-invalid gezet", (await page.getAttribute("#naam", "aria-invalid")) === "true");
await shot(page, "fout");

// 2. Gesloten dag en tijdsloten
await page.fill("#datum", next(1));
await page.dispatchEvent("#datum", "change");
const closedMsg = await page.textContent('[data-error-for="datum"]');
record("maandag wordt geweigerd", /maandag en dinsdag/i.test(closedMsg ?? ""), closedMsg);
await page.fill("#datum", next(0));
await page.dispatchEvent("#datum", "change");
const sunday = await page.$$eval('[data-slot]:not([data-hidden="true"])', (els) => els.map((e) => e.dataset.slot));
record("zondag begint om 16:00", sunday[0] === "16:00" && sunday.at(-1) === "21:00", `${sunday[0]} t/m ${sunday.at(-1)} (${sunday.length})`);
await page.fill("#datum", next(3));
await page.dispatchEvent("#datum", "change");
const wed = await page.$$eval('[data-slot]:not([data-hidden="true"])', (els) => els.map((e) => e.dataset.slot));
record("woensdag 11:00 t/m 21:00", wed[0] === "11:00" && wed.at(-1) === "21:00", `${wed.length} sloten`);
record("tapasdag-hint op woensdag", /tapasdag/i.test((await page.textContent("[data-slot-hint]")) ?? ""));
await page.fill("#datum", "2020-01-01");
await page.dispatchEvent("#datum", "change");
record("datum in het verleden geweigerd", /voorbij/.test((await page.textContent('[data-error-for="datum"]')) ?? ""));

// 3. Groep groter dan 12
await page.selectOption("#personen", "meer");
const groupLink = await page.$('[data-error-for="personen"] a[href^="tel:"]');
record("meer dan 12: melding met bellink", Boolean(groupLink));
await shot(page, "groep");
await page.close();

if (hasKey) {
  // 4. Versturen: wachten, dan gelukt
  page = await open();
  let payload = null;
  await page.route("https://api.web3forms.com/submit", async (route) => {
    payload = JSON.parse(route.request().postData() ?? "{}");
    await new Promise((r) => setTimeout(r, 1200));
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"success":true}' });
  });
  await fill(page);
  await page.click("[data-submit]");
  await page.waitForTimeout(300);
  record("tijdens versturen: knop uitgeschakeld", await page.isDisabled("[data-submit]"));
  await shot(page, "versturen");
  await page.waitForSelector("[data-form-success]:not([hidden])", { timeout: 5000 });
  const summary = await page.textContent("[data-form-success] dl");
  record("gelukt: samenvatting zichtbaar", /19:00/.test(summary ?? "") && /4 personen/.test(summary ?? ""), summary?.replace(/\s+/g, " ").trim());
  record("payload bevat de gegevens", payload?.name === "Familie Jansen" && payload?.tijd === "19:00");
  await shot(page, "gelukt");
  await page.close();

  // 5. Fout bij versturen: invoer blijft staan
  page = await open();
  await page.route("https://api.web3forms.com/submit", (route) =>
    route.fulfill({ status: 500, contentType: "application/json", body: '{"success":false}' }),
  );
  await fill(page);
  await page.click("[data-submit]");
  await page.waitForSelector("[data-form-error]:not([hidden])", { timeout: 5000 });
  record("fout: melding met telefoon en mail", Boolean(await page.$('[data-form-error] a[href^="tel:"]')) && Boolean(await page.$('[data-form-error] a[href^="mailto:"]')));
  record("fout: invoer blijft behouden", (await page.inputValue("#naam")) === "Familie Jansen");
  record("fout: knop weer bruikbaar", !(await page.isDisabled("[data-submit]")));
  await shot(page, "fout-versturen");
  await page.close();
} else {
  // 4. Zonder sleutel: vooringevulde mailto
  page = await open();
  await fill(page);
  await page.click("[data-submit]");
  await page.waitForSelector("[data-form-success]:not([hidden])", { timeout: 5000 });
  const mode = await page.getAttribute("[data-form-success]", "data-mode");
  record("zonder sleutel: mailto-terugval met uitleg", mode === "mail", await page.textContent("[data-success-title]"));
  await shot(page, "mailto");
  await page.click("[data-form-reset]");
  record("terug naar formulier: invoer staat er nog", (await page.inputValue("#naam")) === "Familie Jansen");
  await page.close();
}

await browser.close();
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} geslaagd`);
if (failed.length) process.exitCode = 1;
