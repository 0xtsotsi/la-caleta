/**
 * Bouwt het social media-pakket van Restaurant La Caleta, versie 2.
 *
 * Run: node scripts/build-social-v2.mjs
 *
 * De beelden komen in `social/posts-v2/`. De opmaak en de teksten staan in
 * dit bestand; de prijzen komen uit src/data/site.ts en de foto's uit
 * src/assets/images.
 *
 * Het concept:
 * - warm papier met de gloed van het kaarslicht, net als de website;
 * - een heel subtiel Spaanse tegeltje (klein vierbladmotief) als textuur
 *   in de achtergrond, in een tint die nauwelijks te zien is;
 * - typografie en witruimte doen het werk. Geen strepen onder de
 *   prijzen, geen stippellijnen, geen kaders rond de foto's. Precies
 *   zoals de menukaarten van het restaurant: alleen wat nodig is;
 * - Cormorant Garamond italic voor de kop, Jost voor de tekst en het
 *   handschrift van Dancing Script voor het woordmerk;
 * - avondrood voor de actie, goud voor de accenten.
 */
import { execFile } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import sharp from 'sharp';

const run = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const EDGE =
  process.env.EDGE_PATH ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

const FORMATS = [
  { naam: 'telefoon', label: 'instagram-feed', breedte: 1080, hoogte: 1350 },
  { naam: 'vierkant', label: 'instagram-square', breedte: 1080, hoogte: 1080 },
  { naam: 'desktop', label: 'facebook-banner', breedte: 1200, hoogte: 630 },
];

const UIT = path.join(root, 'social', 'posts-v2');
const TMP = path.join(root, '.gg', 'social-v2-tmp');
const FONTEN = path.join(root, 'social', 'fonts');
const BEELDEN = path.join(root, 'src', 'assets', 'images');

/* ------------------------------------------------------------------ */
/* Teksten                                                             */
/* ------------------------------------------------------------------ */

const contact = {
  telefoon: '0181 - 214342',
  adres: 'Raadhuisplein 4a · 3181 CG Rozenburg',
  site: 'lacaleta.nl',
};

/** De ene actie die elke post vraagt. */
const CTA = 'Reserveer een tafel';

const POSTS = [
  {
    slug: 'tapasdag',
    hashtags: '#LaCaleta #Tapasdag #Rozenburg #SpaanseKeuken #Tapas',
    layout: 'boven',
    foto: 'tapas-tafel.jpg',
    positie: 'center 55%',
    eyebrow: 'Tapasdag',
    titel: ['Elke woensdag', 'en donderdag.'],
    sub: 'Een tafel vol Spaanse gerechten om samen te delen. Onbeperkt tapas, met brood en verse salsa.',
    prijs: '€ 34,50 per persoon',
    caption:
      'Elke woensdag en donderdag is het tapasdag bij La Caleta. Onbeperkt Spaanse gerechten om samen te delen, met brood en verse salsa erbij. € 34,50 per persoon. Reserveer je tafel via 0181 - 214342.',
  },
  {
    slug: 'tapas-kaart',
    hashtags: '#LaCaleta #Tapas #SpaanseKeuken #Rozenburg #Restaurant',
    layout: 'lijst',
    foto: 'tapas-bord-warm.jpg',
    positie: 'center 50%',
    eyebrow: 'Van de tapaskaart',
    titel: ['Wat er op tafel staat.'],
    sub: 'Een greep uit de kaart. Alles wordt in huis bereid, met olijfolie en veel passie.',
    regels: [
      ['Albóndigas en salsa de tomate', '€ 11'],
      ['Tortilla española', '€ 9'],
      ['Longaniza ibérica', '€ 12'],
      ['Gambas al ajillo', '€ 14'],
      ['Calamares fritos', '€ 14'],
      ['Patatas fritas / bravas', '€ 6 / € 8 / € 10'],
    ],
    caption:
      'Een greep uit onze tapaskaart: albóndigas in tomatensaus, tortilla española, longaniza ibérica, gambas al ajillo en gefrituurde inktvisringen. Alles zelf gemaakt. Kom langs aan het Raadhuisplein in Rozenburg.',
  },
  {
    slug: 'grill',
    hashtags: '#LaCaleta #VanDeGrill #Rozenburg #SpaanseKeuken #Grill',
    layout: 'lijst',
    foto: 'grill-vlees.jpg',
    positie: 'center 45%',
    eyebrow: 'Van de grill',
    titel: ['Vlees van het vuur.'],
    sub: 'Alle stukken komen van de grill. Kies 225, 350 of 450 gram; met salade en saus erbij.',
    regels: [
      ['Lomo', '€ 35 / € 37 / € 39'],
      ['Quadrill', '€ 27 / € 30 / € 35'],
      ['Entrecote gaditano', '€ 28 / € 30 / € 34'],
      ['Chuleton', '€ 32'],
      ['Costillas', '€ 28'],
    ],
    caption:
      'Alles komt van de grill: lomo, quadrill, entrecote gaditano, chuleton en costillas. Kies 225, 350 of 450 gram. Bij La Caleta in Rozenburg. 0181 - 214342.',
  },
  {
    slug: 'verse-vis',
    hashtags: '#LaCaleta #VerseVis #Rozenburg #Gambas #SpaanseKeuken',
    layout: 'boven',
    foto: 'grill-garnalen.jpg',
    positie: 'center 45%',
    eyebrow: 'Verse vis',
    titel: ['Verse vis,', 'verse dag.'],
    sub: 'Tonijn, zalm, garnalen en inktvis. Wat de schippers binnenkrijgen, komt die dag op tafel.',
    caption:
      'Verse vis van de grill: tonijn, zalm, gambas a la plancha en frito gaditano. Geen diepvries, geen tussenoplossingen. Restaurant La Caleta, Raadhuisplein 4a in Rozenburg.',
  },
  {
    slug: 'paella',
    hashtags: '#LaCaleta #Paella #Rozenburg #SpaanseKeuken #Paella',
    layout: 'volledig',
    foto: 'paella-pan.jpg',
    positie: 'center 45%',
    eyebrow: 'Paella',
    titel: ['Paella zoals het hoort.'],
    sub: 'Altijd vers, altijd Spaans. En onze kaart heeft veel meer: vlees van de grill, verse vis, tapas en Spaanse wijnen.',
    caption:
      'Paella zoals het hoort: altijd vers, altijd Spaans. Onze kaart heeft veel meer: vlees van de grill, verse vis, een uitgebreid tapas-menu en Spaanse wijnen. La Caleta, Raadhuisplein 4a, Rozenburg.',
  },
  {
    slug: 'spaanse-wijnen',
    hashtags: '#LaCaleta #SpaanseWijnen #Rozenburg #Wijn #Sangria',
    layout: 'lijst',
    foto: 'wijn-kaarsen.jpg',
    positie: 'center 45%',
    eyebrow: 'Spaanse wijnen',
    titel: ['Uit Spanje, bij kaarslicht.'],
    sub: 'Rioja, Málaga en een karaf sangria in huis. Per glas of per fles.',
    regels: [
      ['Muriel Crianza', '€ 21'],
      ['Monteliego Crianza', '€ 22'],
      ['Monteliego Reserva', '€ 28'],
      ['Sol de Málaga', '€ 29 / € 4,50 per glas'],
      ['Karaf huisgemaakte sangria', '€ 29 / € 6,50 per glas'],
    ],
    caption:
      'Spaanse wijnen bij kaarslicht: Muriel en Monteliego uit de Rioja, zoete Sol de Málaga en een huisgemaakte sangria in de karaf. Per fles of per glas. La Caleta in Rozenburg.',
  },
  {
    slug: 'lunch-12uurtje',
    hashtags: '#LaCaleta #Lunch #Rozenburg #12uurtje #SpaanseKeuken',
    layout: 'boven',
    foto: 'lunch-serveren.jpg',
    positie: 'center 50%',
    eyebrow: '12-uurtje',
    titel: ['Lunch voor iedereen.'],
    sub: 'Soep van de dag met brood, yoghurt met granola en honing, of een baguette met kaas, vis of vlees. Ook glutenvrij.',
    prijs: '€ 14,50',
    caption:
      'Het 12-uurtje voor iedereen: soep van de dag met brood, Griekse yoghurt met granola en honing, of een baguette met kaas, vis of vlees. Keuze uit bruin of wit brood, ook glutenvrij. € 14,50.',
  },
  {
    slug: 'seniorenmenu',
    hashtags: '#LaCaleta #Seniorenmenu #Rozenburg #Menu #SpaanseKeuken',
    layout: 'volledig',
    foto: 'tafel-spaans.jpg',
    positie: 'center 55%',
    eyebrow: 'Seniorenmenu',
    titel: ['Van de dag, met zorg.'],
    sub: 'Soep van de dag, hoofdgerecht van vlees of vis, een nagerecht en koffie of thee. Met friet of gepofte aardappel, salade en saus.',
    prijs: '€ 28,50',
    caption:
      'Seniorenmenu van de dag: soep, hoofdgerecht van vlees of vis, nagerecht en koffie of thee. Met friet of gepofte aardappel, salade en saus. € 28,50 per persoon. La Caleta, Rozenburg.',
  },
  {
    slug: 'openingstijden',
    hashtags: '#LaCaleta #Openingstijden #Rozenburg #Restaurant #SpaanseKeuken',
    layout: 'donker',
    eyebrow: 'Openingstijden',
    titel: ['Woensdag tot zondag', 'open voor je.'],
    sub: 'In de week vanaf woensdag serveren we vanaf de lunch. Op zondag beginnen we later.',
    regels: [
      ['Woensdag t/m zaterdag', '11:00 - 22:00'],
      ['Zondag', '16:00 - 22:00'],
      ['Maandag en dinsdag', 'Gesloten'],
    ],
    cta: 'Bel of loop binnen',
    caption:
      'La Caleta is geopend van woensdag tot en met zaterdag van 11:00 tot 22:00, en op zondag van 16:00 tot 22:00. Maandag en dinsdag zijn we gesloten. Raadhuisplein 4a, Rozenburg.',
  },
  {
    slug: 'ons-verhaal',
    hashtags: '#LaCaleta #Rozenburg #SpaansRestaurant #Culinair #Restaurante',
    layout: 'donker',
    foto: 'kokers.jpg',
    positie: 'center 35%',
    eyebrow: 'Sinds 2007',
    titel: ['Van vader naar dochter.'],
    sub: 'La Caleta staat sinds 2007 aan het Raadhuisplein in Rozenburg. In 2024 gingen we van vader naar dochter. We doen het nog altijd samen.',
    cta: 'Bekijk het menu',
    caption:
      'La Caleta staat sinds 2007 aan het Raadhuisplein in Rozenburg. In 2024 gingen we van vader naar dochter, en we doen het nog altijd samen. Kom langs en proef het zelf.',
  },
];

/* ------------------------------------------------------------------ */
/* Het tegeltje                                                        */
/* ------------------------------------------------------------------ */

/*
 * De achtergrond is warm papier met een heel subtiel Spaanse tegeltje:
 * een klein vierbladmotief in een ruit, in een tint die nauwelijks
 * te zien is. Het is textuur, geen versiering: het vult de vlakte
 * zonder om aandacht te vragen.
 *
 * De tegel wordt vooraf gerasterd en zonder schaling gelegd, dus er
 * ontstaan geen naden of horizontale strepen over de achtergrond.
 */
const tegelMotief = `
<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'>
  <g fill='none' stroke='white' stroke-width='1' stroke-linejoin='round' stroke-linecap='round'>
    <path d='M100 76 124 100 100 124 76 100Z' opacity='0.85'/>
    <path d='M100 84 116 100 100 116 84 100Z' opacity='0.5'/>
    <path d='M0 0h200v200H0z' opacity='0.4'/>
    <path d='M100 0v22M100 178v22M0 100h22M178 100h22' opacity='0.45'/>
  </g>
</svg>`;

/**
 * Rastert het tegelpatroon als een tegel-PNG in de gewenste kleur. De tegel
 * is 260 bij 260 en wordt zonder schaling gebruikt, zodat er geen naden
 * of haarlijnen op de tegelgrens ontstaan.
 */
async function tegelTegel(kleur, alpha) {
  const svg = tegelMotief
    .replace("stroke='white'", `stroke='${kleur}'`)
    .replace('<g ', `<g opacity='${alpha}' `);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return `url("data:image/png;base64,${png.toString('base64')}")`;
}

/* ------------------------------------------------------------------ */
/* Fonts                                                               */
/* ------------------------------------------------------------------ */

const fontUri = async (bestand) =>
  `data:font/ttf;base64,${(await readFile(path.join(FONTEN, bestand))).toString('base64')}`;

const fontCss = async () => `
@font-face { font-family: 'Cormorant'; src: url('${await fontUri('Cormorant-Regular.ttf')}'); font-weight: 400; }
@font-face { font-family: 'Cormorant'; src: url('${await fontUri('Cormorant-Medium.ttf')}'); font-weight: 500; }
@font-face { font-family: 'Cormorant'; src: url('${await fontUri('Cormorant-SemiBold.ttf')}'); font-weight: 600; }
@font-face { font-family: 'Cormorant'; src: url('${await fontUri('Cormorant-Italic.ttf')}'); font-weight: 400; font-style: italic; }
@font-face { font-family: 'Dancing'; src: url('${await fontUri('DancingScript-Regular.ttf')}'); }
@font-face { font-family: 'Jost'; src: url('${await fontUri('Jost-Light.ttf')}'); font-weight: 300; }
@font-face { font-family: 'Jost'; src: url('${await fontUri('Jost-Regular.ttf')}'); font-weight: 400; }
@font-face { font-family: 'Jost'; src: url('${await fontUri('Jost-Medium.ttf')}'); font-weight: 500; }
`;

/* ------------------------------------------------------------------ */
/* CSS                                                                 */
/* ------------------------------------------------------------------ */

/*
 * De opmaak is een kolom: het woordmerk staat bovenin, de tekst in het
 * midden, de voettekst onderaan. Die drie delen delen de hoogte, dus
 * niets kan over elkaar heen schuiven.
 *
 * Er zijn geen lijnen. Geen strepen onder de prijzen, geen stippellijnen,
 * geen kaders. De hiërarchie komt uit de letters, de kleur en de
 * witruimte, precies zoals op de menukaart van het restaurant.
 */
const css = `
:root {
  --crema: #fdf8ef;
  --tinta: #24190f;
  --carbon: #1e1510;
  --rojo: #a4161a;
  --rojo-oscuro: #74100f;
  --dorado: #c8963e;
  --dorado-licht: #e0b769;
  --terracotta: #b45c34;
  --sub-tinta: #4c3a2a;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: var(--crema);
}

body {
  font-family: 'Jost', 'Segoe UI', sans-serif;
  color: var(--tinta);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

/* Het warme papier met de gloed van het kaarslicht, zoals op de site. */
.papier {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(circle at 14% 6%, rgba(200, 150, 62, 0.11), transparent 44%),
    radial-gradient(circle at 86% 94%, rgba(180, 92, 52, 0.08), transparent 42%);
}

/* Het tegeltje: textuur, geen versiering. Het ligt achter de foto's. */
.tegel {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: var(--tegel-tegel);
  background-repeat: repeat;
  background-size: var(--tegel-maat) var(--tegel-maat);
}

/* De donkere variant, met dezelfde gloed over het carbon. */
.nacht {
  position: absolute;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(120% 80% at 15% 0%, rgba(224, 183, 105, 0.16), transparent 55%),
    radial-gradient(90% 70% at 85% 100%, rgba(180, 92, 52, 0.14), transparent 55%),
    linear-gradient(160deg, #2c1d13 0%, #1e1510 100%);
}
.nacht .tegel { opacity: 0.14; }
.nacht.met-foto .tegel { display: none; }

/* De hele poster: drie delen, bovenin het merk, onderin de voettekst. */
.poster {
  position: relative;
  z-index: 3;
  display: grid;
  grid-template-rows: auto minmax(0, 1fr) auto;
  width: 100%;
  height: 100%;
  padding: var(--pad-boven) var(--pad-zij) var(--pad-onder);
}

.kop { position: relative; z-index: 4; }

.midden {
  position: relative;
  z-index: 3;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.voet { position: relative; z-index: 4; margin-top: var(--afstand-2); }

/* Tekstblok */
.kolom { display: block; }
.tekst { max-width: var(--tekst-breedte); }

.eyebrow {
  font-size: var(--grootte-eyebrow);
  font-weight: 500;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: var(--rojo);
}

h1 {
  margin-top: var(--afstand-1);
  font-family: 'Cormorant', Georgia, serif;
  font-weight: 500;
  font-style: italic;
  font-size: var(--grootte-kop);
  line-height: 1.04;
  letter-spacing: -0.005em;
  color: var(--tinta);
}

.sub {
  margin-top: var(--afstand-1);
  font-size: var(--grootte-sub);
  font-weight: 300;
  line-height: 1.55;
  color: var(--sub-tinta);
}

.prijs {
  margin-top: var(--afstand-1);
  display: block;
  font-family: 'Cormorant', Georgia, serif;
  font-style: italic;
  font-size: var(--grootte-prijs);
  font-weight: 600;
  color: var(--rojo);
}

/* De ene actie die de post vraagt. */
.cta {
  margin-top: var(--afstand-2);
  display: inline-block;
  padding: var(--cta-pad-y) var(--cta-pad-x);
  background: var(--rojo);
  color: var(--crema);
  font-size: var(--grootte-cta);
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

/* Het woordmerk */
.merk .woord {
  display: block;
  font-family: 'Dancing', cursive;
  font-size: var(--merk-woord);
  line-height: 0.9;
  color: var(--tinta);
}
.merk .tag {
  display: block;
  margin-top: var(--merk-tag-marge);
  font-size: var(--merk-tag);
  font-weight: 400;
  letter-spacing: 0.4em;
  text-indent: 0.4em;
  color: var(--terracotta);
}

/* De foto: geen kader, alleen de foto. */
.foto {
  position: relative;
  flex: 1 1 auto;
  min-height: var(--foto-minimum);
  width: 100%;
  overflow: hidden;
}
.foto img { width: 100%; height: 100%; object-fit: cover; display: block; }

/*
 * De prijzen. Geen strepen, geen stippellijnen: alleen de naam links
 * en het bedrag rechts, met lucht ertussen. Zoals op de menukaart.
 */
.prijzen { margin-top: var(--afstand-2); }
.prijzen-twee { display: flex; gap: 40px; }
.prijzen-twee .lijst { flex: 1 1 0; min-width: 0; }
.prijs-rij {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 22px;
  padding: var(--regel-pad) 0;
}
.prijs-rij .naam {
  font-size: var(--grootte-regel);
  font-weight: 400;
  color: var(--tinta);
  line-height: 1.3;
}
.prijs-rij .bedrag {
  font-size: var(--grootte-regel);
  font-weight: 500;
  color: var(--rojo);
  white-space: nowrap;
}

/* Voettekst */
.voet .adres {
  font-size: var(--grootte-voet);
  font-weight: 400;
  color: var(--tinta);
}
.voet .handel {
  margin-top: 6px;
  font-size: var(--grootte-handel);
  font-weight: 300;
  letter-spacing: 0.06em;
  color: var(--terracotta);
}

/* Volle foto met verloop */
.verloop {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(
    to top,
    rgba(20, 12, 7, 0.95) 0%,
    rgba(20, 12, 7, 0.88) 28%,
    rgba(20, 12, 7, 0.55) 54%,
    rgba(20, 12, 7, 0.28) 74%,
    rgba(20, 12, 7, 0.48) 100%
  );
}

.foto-vol { position: absolute; inset: 0; z-index: 1; }
.foto-vol img { width: 100%; height: 100%; object-fit: cover; }

/* Bij een donkere post ligt de foto diep onder de tekst. */
.verloop-donker {
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(to top, rgba(20, 12, 7, 0.95), rgba(20, 12, 7, 0.9)),
    radial-gradient(120% 80% at 15% 0%, rgba(224, 183, 105, 0.16), transparent 55%);
}

/* Fotoband bovenin, tekst eronder. */
.foto-boven { position: absolute; top: 0; left: 0; right: 0; z-index: 1; overflow: hidden; }
.foto-boven img { width: 100%; height: 100%; object-fit: cover; display: block; }
.foto-boven::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(to top, var(--crema) 6%, rgba(253, 248, 239, 0) 34%);
}

/* De donkere strook bovenaan, zodat het woordmerk leesbaar blijft
   op een foto. */
.scrim-boven {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  height: 210px;
  background: linear-gradient(to bottom, rgba(20, 12, 7, 0.72), rgba(20, 12, 7, 0));
}

/* Het woordmerk op een foto */
.merkopfoto .merk .woord { color: var(--crema); }
.merkopfoto .merk .tag { color: var(--dorado-licht); }

/* Tekst op een donkere ondergrond */
.donker h1 { color: var(--crema); }
.donker .eyebrow { color: var(--dorado-licht); }
.donker .sub { color: #e3d3c1; }
.donker .prijs { color: var(--dorado-licht); }
.donker .cta { background: var(--dorado-licht); color: #2c1d13; }
.donker .prijs-rij .naam { color: var(--crema); }
.donker .prijs-rij .bedrag { color: var(--dorado-licht); }
.donker .merk .woord { color: var(--crema); }
.donker .merk .tag { color: var(--dorado-licht); }
.donker .voet .adres { color: var(--crema); }
.donker .voet .handel { color: #c9b39a; }

/* ================================================================
   FORMAAT: TELEFOON (1080 x 1350)
   ================================================================ */

.formaat-telefoon {
  --pad-boven: 54px;
  --pad-zij: 60px;
  --pad-onder: 46px;
  --grootte-eyebrow: 19px;
  --grootte-kop: 66px;
  --grootte-sub: 26px;
  --grootte-prijs: 38px;
  --grootte-cta: 21px;
  --grootte-regel: 23px;
  --grootte-voet: 23px;
  --grootte-handel: 19px;
  --afstand-1: 16px;
  --afstand-2: 28px;
  --tekst-breedte: 900px;
  --foto-minimum: 280px;
  --foto-band: 560px;
  --tegel-maat: 240px;
  --merk-woord: 76px;
  --merk-tag: 17px;
  --merk-tag-marge: 10px;
  --cta-pad-y: 17px;
  --cta-pad-x: 28px;
  --regel-pad: 9px;
}

/* ================================================================
   FORMAAT: VIERKANT (1080 x 1080)
   ================================================================ */

.formaat-vierkant {
  --pad-boven: 48px;
  --pad-zij: 56px;
  --pad-onder: 44px;
  --grootte-eyebrow: 18px;
  --grootte-kop: 58px;
  --grootte-sub: 24px;
  --grootte-prijs: 34px;
  --grootte-cta: 19px;
  --grootte-regel: 21px;
  --grootte-voet: 21px;
  --grootte-handel: 17px;
  --afstand-1: 14px;
  --afstand-2: 24px;
  --tekst-breedte: 860px;
  --foto-minimum: 200px;
  --foto-band: 420px;
  --tegel-maat: 210px;
  --merk-woord: 66px;
  --merk-tag: 15px;
  --merk-tag-marge: 9px;
  --cta-pad-y: 15px;
  --cta-pad-x: 25px;
  --regel-pad: 7px;
}

/* ================================================================
   FORMAAT: DESKTOP (1200 x 630)
   ================================================================ */

.formaat-desktop {
  --pad-boven: 42px;
  --pad-zij: 54px;
  --pad-onder: 40px;
  --grootte-eyebrow: 14px;
  --grootte-kop: 44px;
  --grootte-sub: 19px;
  --grootte-prijs: 26px;
  --grootte-cta: 15px;
  --grootte-regel: 16px;
  --grootte-voet: 17px;
  --grootte-handel: 14px;
  --afstand-1: 12px;
  --afstand-2: 20px;
  --tekst-breedte: 500px;
  --foto-minimum: 200px;
  --foto-band: 0px;
  --tegel-maat: 190px;
  --merk-woord: 52px;
  --merk-tag: 12px;
  --merk-tag-marge: 7px;
  --cta-pad-y: 11px;
  --cta-pad-x: 20px;
  --regel-pad: 5px;
}

/* ================================================================
   DE OPMAK PER LAYOUT
   ================================================================ */

/* BOVEN: de foto bovenin, de tekst eronder. */
.laag-boven .midden { justify-content: flex-start; padding-top: var(--foto-band); }
.laag-boven .foto-boven { height: var(--foto-band); }

/* LIJST: de tekst met prijzen, de foto eronder. */
.laag-lijst .midden { justify-content: flex-start; }
.laag-lijst .kolom { order: 1; }
.laag-lijst .foto { order: 2; margin-top: var(--afstand-2); }

/* VOLLEDIG: de foto over de hele vlakte, de tekst eronderover. */
.laag-volledig .midden { justify-content: flex-end; }

/* DONKER: de donkere vlakte, de tekst in het midden. */
.laag-donker .midden { justify-content: center; }

/* ================================================================
   OP DESKTOP: tekst links, beeld rechts
   ================================================================ */

.formaat-desktop .kop {
  position: absolute;
  left: var(--pad-zij);
  top: var(--pad-boven);
  z-index: 4;
}
.formaat-desktop .midden {
  flex-direction: row;
  align-items: center;
  gap: 36px;
  padding-top: 96px;
  padding-right: 33%;
}
.formaat-desktop .kolom { flex: 0 0 620px; order: 1; }
.formaat-desktop .foto { order: 2; }
.formaat-desktop .tekst { max-width: 560px; }
.formaat-desktop .prijzen { max-width: 560px; }
.formaat-desktop .prijs-rij { padding: 3px 0; }

/* De foto is op desktop een paneel rechts over de volle hoogte. */
.formaat-desktop .foto {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 32%;
  height: auto;
  margin-top: 0;
}

.formaat-desktop.laag-boven .midden {
  justify-content: flex-start;
  padding-top: 104px;
  padding-right: 33%;
}
.formaat-desktop.laag-boven .foto-boven {
  left: auto;
  right: 0;
  width: 32%;
  height: 100%;
}
.formaat-desktop.laag-boven .foto-boven::after { display: none; }
.formaat-desktop .scrim-boven { display: none; }
.formaat-desktop.merkopfoto .merk .woord { color: var(--tinta); }
.formaat-desktop.merkopfoto .merk .tag { color: var(--terracotta); }
.formaat-desktop .kop { z-index: 4; }
.formaat-desktop.laag-boven .tekst { max-width: 480px; }

.formaat-desktop.laag-donker .kolom { flex: 0 0 460px; }
.formaat-desktop.laag-donker .prijzen { max-width: 460px; }
.formaat-desktop.laag-donker .prijs-rij { padding: 3px 0; }
`;

/* ------------------------------------------------------------------ */
/* HTML bouwen                                                         */
/* ------------------------------------------------------------------ */

const beeldUrl = (naam) => `file:///${path.join(BEELDEN, naam).split(path.sep).join('/')}`;

const merkHtml = () => `<div class="merk">
    <span class="woord">La Caleta</span>
    <span class="tag">Cocina de España</span>
  </div>`;

const voetHtml = () => `<div class="voet">
    <div class="adres">${contact.adres}</div>
    <div class="handel">${contact.telefoon} &nbsp;&bull;&nbsp; ${contact.site}</div>
  </div>`;

/** De prijzen: naam links, bedrag rechts, met lucht ertussen. */
const prijsRij = ([naam, bedrag]) =>
  `<div class="prijs-rij"><span class="naam">${naam}</span><span class="bedrag">${bedrag}</span></div>`;

/**
 * De prijzen: naam links, bedrag rechts, met lucht ertussen. Op de
 * brede formaten staan ze in twee kolommen, zodat alles past.
 */
const prijzenHtml = (regels, kolommen = 1) => {
  if (!regels) return '';
  if (kolommen < 2) return `<div class="prijzen">${regels.map(prijsRij).join('')}</div>`;
  const helft = Math.ceil(regels.length / 2);
  return `<div class="prijzen prijzen-twee">
    <div class="lijst">${regels.slice(0, helft).map(prijsRij).join('')}</div>
    <div class="lijst">${regels.slice(helft).map(prijsRij).join('')}</div>
  </div>`;
};

const tekstHtml = (post) => `
  <p class="eyebrow">${post.eyebrow}</p>
  <h1>${post.titel.join('<br>')}</h1>
  <p class="sub">${post.sub}</p>`;

const prijsHtml = (post) => (post.prijs ? `<p class="prijs">${post.prijs}</p>` : '');

const ctaHtml = (post) => `<div class="cta">${post.cta ?? CTA}</div>`;

const fotoHtml = (foto) => `<div class="foto">${foto}</div>`;

function html(post, formaat, tegel) {
  const donker = post.layout === 'donker';
  const opFoto = post.layout === 'volledig';
  const metFoto = Boolean(post.foto);
  const klasse = `formaat-${formaat.naam} laag-${post.layout}${
    donker || opFoto ? ' donker' : ''
  }${donker && metFoto ? ' met-foto' : ''}${post.layout === 'boven' ? ' merkopfoto' : ''}`;

  const foto = post.foto
    ? `<img src="${beeldUrl(post.foto)}" style="object-position:${post.positie ?? 'center'}">`
    : '';

  /* De lagen die over de hele vlakte liggen, staan buiten de poster. */
  let laag = '';
  let midden = '';

  if (post.layout === 'volledig') {
    laag = `
      <div class="foto-vol">${foto}</div>
      <div class="verloop"></div>`;
    midden = `
      <div class="kolom">
        <div class="tekst">
          ${tekstHtml(post)}
          ${prijsHtml(post)}
        </div>
        ${ctaHtml(post)}
      </div>`;
  } else if (post.layout === 'boven') {
    laag = `<div class="foto-boven">${foto}</div><div class="scrim-boven"></div>`;
    midden = `
      <div class="kolom">
        <div class="tekst">
          ${tekstHtml(post)}
          ${prijsHtml(post)}
        </div>
        ${ctaHtml(post)}
      </div>`;
  } else if (post.layout === 'lijst') {
    midden = `
      <div class="kolom">
        <div class="tekst">
          ${tekstHtml(post)}
        </div>
        ${prijzenHtml(post.regels, formaat.naam === 'desktop' ? 2 : 1)}
        ${ctaHtml(post)}
      </div>
      ${fotoHtml(foto)}`;
  } else {
    if (foto) laag = `<div class="foto-vol">${foto}</div><div class="verloop-donker"></div>`;
    midden = `
      <div class="kolom">
        <div class="tekst">
          ${tekstHtml(post)}
        </div>
        ${prijzenHtml(post.regels, formaat.naam === 'desktop' ? 2 : 1)}
        ${ctaHtml(post)}
      </div>`;
  }

  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<style>
  :root { --tegel-tegel: ${tegel}; }
  ${css}
</style>
</head>
<body class="${klasse}">
  ${donker ? '<div class="nacht"><div class="tegel"></div></div>' : '<div class="papier"></div><div class="tegel"></div>'}
  ${laag}
  <div class="poster">
    <div class="kop">${merkHtml()}</div>
    <div class="midden">${midden}</div>
    <div class="voet">${voetHtml()}</div>
  </div>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/* Renderen                                                            */
/* ------------------------------------------------------------------ */

async function scherm(uitvoer, htmlBestand, breedte, hoogte) {
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    `--window-size=${breedte},${hoogte}`,
    `--screenshot=${uitvoer}`,
    `file:///${htmlBestand.split(path.sep).join('/')}`,
  ];

  // Edge slaat de screenshot op en kan daarna met een foutcode eindigen.
  // Wat telt is of het bestand er staat, dus herhaal de poging zo nodig.
  for (let poging = 1; poging <= 3; poging++) {
    try {
      await run(EDGE, args, { timeout: 60_000 });
    } catch (fout) {
      if (poging === 3) throw fout;
    }
    if (existsSync(uitvoer)) return;
  }
  throw new Error(`Screenshot mislukt: ${uitvoer}`);
}

/** De PNG's van Edge zijn groot; dit haalt er de overbodige data uit. */
async function optimaliseer(bestand) {
  const klein = await sharp(bestand).png({ compressionLevel: 9, quality: 90 }).toBuffer();
  if (klein.length < (await stat(bestand)).size) await writeFile(bestand, klein);
}

async function main() {
  await rm(TMP, { recursive: true, force: true });
  await mkdir(TMP, { recursive: true });
  await mkdir(UIT, { recursive: true });

  /* De tegel van het patroon, in een tint die nauwelijks te zien is. */
  const tegel = await tegelTegel('#e6dac4', 1);

  const letterCss = await fontCss();

  let aantal = 0;
  for (const post of POSTS) {
    for (const formaat of FORMATS) {
      const map = path.join(TMP, `${post.slug}-${formaat.naam}.html`);
      const pagina = html(post, formaat, tegel).replace('</style>', `${letterCss}\n</style>`);
      await writeFile(map, pagina, 'utf8');
      if (post.slug === 'tapas-kaart' && formaat.naam === 'desktop')
        await writeFile(path.join(root, '.gg', 'dbg.html'), pagina, 'utf8');

      const uit = path.join(
        UIT,
        `${formaat.label}-${post.slug}-${formaat.breedte}x${formaat.hoogte}.png`,
      );
      await rm(uit, { force: true });
      await scherm(uit, map, formaat.breedte, formaat.hoogte);
      await optimaliseer(uit);
      aantal++;
      console.log(
        `✓ ${formaat.naam.padEnd(9)} ${post.slug} (${formaat.breedte}x${formaat.hoogte})`,
      );
    }
  }

  /* De bijschriften erbij, zodat de beelden direct gebruikt kunnen worden. */
  const hashtags = '#LaCaleta #SpaansRestaurant #Rozenburg #Tapas #SpaanseKeuken';
  const bijschriften = POSTS.map(
    (post) => `## ${post.slug}\n\n${post.caption}\n\n${hashtags}`,
  ).join('\n\n');
  await writeFile(
    path.join(root, 'social', 'CAPTIONS-V2.md'),
    `# Bijschriften (versie 2)\n\nDeze teksten horen bij de beelden in \`social/posts-v2/\`.\n\n${bijschriften}\n`,
    'utf8',
  );

  await rm(TMP, { recursive: true, force: true });
  console.log(`\n${aantal} afbeeldingen geschreven in social/posts-v2/`);
}

main().catch((fout) => {
  console.error(fout);
  process.exit(1);
});
