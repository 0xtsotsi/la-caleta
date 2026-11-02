/**
 * Bouwt de social media-beelden voor Restaurant La Caleta met Chromium (HTML/CSS).
 *
 *   node scripts/social-post.mjs
 *
 * Levert een Instagram-post (4:5), een vierkante post (1:1), een story (9:16),
 * een Facebook-banner en een interieur-post. Alle beelden gebruiken hetzelfde
 * warme palet als de website.
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'src', 'assets', 'images');
const fontsDir = path.join(root, 'social', 'fonts');
const outDir = path.join(root, 'social', 'posts');
const tmpDir = path.join(root, 'social', '.tmp');
mkdirSync(outDir, { recursive: true });
mkdirSync(tmpDir, { recursive: true });

const CHROME = path.join(
  process.env.USERPROFILE ?? '',
  'AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe',
);

const dataUri = (file, mime = 'font/ttf') =>
  `data:${mime};base64,${readFileSync(path.join(fontsDir, file)).toString('base64')}`;

const fontCss = `
@font-face { font-family: 'Cormorant'; src: url('${dataUri('Cormorant-Regular.ttf')}'); font-weight: 400; }
@font-face { font-family: 'Cormorant'; src: url('${dataUri('Cormorant-Medium.ttf')}'); font-weight: 500; }
@font-face { font-family: 'Cormorant'; src: url('${dataUri('Cormorant-SemiBold.ttf')}'); font-weight: 600; }
@font-face { font-family: 'Cormorant'; src: url('${dataUri('Cormorant-Italic.ttf')}'); font-weight: 400; font-style: italic; }
@font-face { font-family: 'Dancing'; src: url('${dataUri('DancingScript-Regular.ttf')}'); }
@font-face { font-family: 'Jost'; src: url('${dataUri('Jost-Light.ttf')}'); font-weight: 300; }
@font-face { font-family: 'Jost'; src: url('${dataUri('Jost-Regular.ttf')}'); font-weight: 400; }
@font-face { font-family: 'Jost'; src: url('${dataUri('Jost-Medium.ttf')}'); font-weight: 500; }
`;

const imageUri = (name) =>
  `data:image/jpeg;base64,${readFileSync(path.join(imagesDir, name)).toString('base64')}`;

const buildHtml = ({
  width,
  height,
  photo,
  focus = 'center',
  kicker,
  headline = [],
  headlineSize = 0.163,
  headlineLines = 1,
  brightness = 1.02,
  logoSize = 0.075,
}) => `
<!doctype html>
<html lang="nl">
  <head>
    <meta charset="utf-8" />
    <style>
      ${fontCss}
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        --photo-brightness: ${brightness ?? 1.02};
        width: ${width}px;
        height: ${height}px;
        overflow: hidden;
        font-family: 'Jost', sans-serif;
        background: #140d08;
        color: #fdf8ef;
        -webkit-font-smoothing: antialiased;
      }
      .frame { position: relative; width: 100%; height: 100%; overflow: hidden; }
      .photo {
        position: absolute; inset: 0;
        width: 100%; height: 100%;
        object-fit: cover;
        object-position: ${focus};
        filter: saturate(1.06) brightness(var(--photo-brightness, 1.02));
      }
      .scrim-top, .scrim-bottom, .glow { position: absolute; inset: 0; }
      .text-scrim {
        position: absolute; left: 0; right: 0;
        bottom: ${Math.round(Math.min(width, height) * 0.125)}px;
        top: 16%;
        background: linear-gradient(to top, rgba(20,13,8,.90) 0%, rgba(20,13,8,.68) 38%, rgba(20,13,8,.24) 72%, rgba(20,13,8,0) 100%);
      }
      .scrim-top {
        background: linear-gradient(to bottom, rgba(20,13,8,.78) 0%, rgba(20,13,8,.16) 46%, rgba(20,13,8,0) 72%);
      }
      .scrim-bottom {
        background: linear-gradient(to bottom, rgba(20,13,8,0) 42%, rgba(20,13,8,.55) 72%, rgba(20,13,8,.92) 100%);
      }
      .glow {
        background: radial-gradient(62% 44% at 18% 6%, rgba(224,183,105,.30), transparent 70%);
      }
      .top {
        position: absolute; top: ${Math.round(height * 0.055)}px; left: ${Math.round(width * 0.082)}px; right: ${Math.round(width * 0.082)}px;
      }
      .logo {
        font-family: 'Dancing', cursive;
        font-size: ${Math.round(width * logoSize)}px;
        line-height: 1;
        text-shadow: 0 6px 30px rgba(20,13,8,.55);
      }
      .tagline {
        margin-top: ${Math.round(width * 0.022)}px;
        font-size: ${Math.round(width * 0.022)}px;
        font-weight: 500;
        letter-spacing: ${Math.round(width * 0.0075)}px;
        color: #e0b769;
      }
      .rule { margin-top: ${Math.round(width * 0.024)}px; width: ${Math.round(width * 0.068)}px; height: 4px; background: #a4161a; }
      .middle {
        position: absolute; left: ${Math.round(width * 0.06)}px; right: ${Math.round(width * 0.06)}px;
        bottom: ${Math.round(height * (height / width > 1.5 ? 0.2 : 0.225))}px;
        text-align: center;
      }
      .kicker {
        font-size: ${Math.round(width * 0.0205)}px;
        font-weight: 500;
        letter-spacing: ${Math.round(width * 0.0078)}px;
        color: #e0b769;
        margin-bottom: ${Math.round(width * 0.024)}px;
        text-shadow: 0 1px 2px rgba(20,13,8,1), 0 4px 22px rgba(20,13,8,.95), 0 0 54px rgba(20,13,8,.75);
      }
      h1 {
        font-family: 'Cormorant', serif;
        font-style: italic;
        font-weight: 500;
        font-size: ${Math.round(width * headlineSize)}px;
        line-height: ${headlineLines > 2 ? 1.0 : 1.06};
        text-shadow: 0 10px 40px rgba(20,13,8,.6);
      }
      .bar {
        position: absolute; left: 0; right: 0; bottom: 0;
        height: ${Math.round(Math.min(width, height) * 0.125)}px;
        background: linear-gradient(to right, #74100f, #8c1314 58%, #a4161a);
        display: flex; align-items: center;
        padding: 0 ${Math.round(width * 0.082)}px;
        gap: ${Math.round(width * 0.03)}px;
      }
      .bar-left { flex: 1; }
      .bar-addr {
        font-size: ${Math.round(width * 0.0175)}px;
        font-weight: 300;
        letter-spacing: ${Math.round(width * 0.0046)}px;
        color: rgba(253,248,239,.72);
      }
      .bar-phone {
        margin-top: ${Math.round(width * 0.014)}px;
        font-size: ${Math.round(width * 0.0245)}px;
        font-weight: 400;
        letter-spacing: ${Math.round(width * 0.0018)}px;
      }
      .bar-url {
        font-size: ${Math.round(width * 0.0175)}px;
        font-weight: 300;
        letter-spacing: ${Math.round(width * 0.0042)}px;
        color: #e0b769;
        align-self: flex-end;
        padding-bottom: ${Math.round(width * 0.002)}px;
      }
    </style>
  </head>
  <body>
    <div class="frame">
      <img class="photo" src="${imageUri(photo)}" alt="" />
      <div class="scrim-top"></div>
      <div class="scrim-bottom"></div>
      <div class="glow"></div>
      <div class="text-scrim"></div>

      <div class="top">
        <p class="logo">La Caleta</p>
        <p class="tagline">RESTAURANTE ESPAÑOL</p>
        <div class="rule"></div>
      </div>

      <div class="middle">
        ${kicker ? `<p class="kicker">${kicker}</p>` : ''}
        <h1>${headline.join('<br />')}</h1>
      </div>

      <div class="bar">
        <div class="bar-left">
          <p class="bar-addr">RAADHUISPLEIN 4A &#183; 3181 CG ROZENBURG</p>
          <p class="bar-phone">Reserveren: 0181 - 214342</p>
        </div>
        <p class="bar-url">LACALETA.NL</p>
      </div>
    </div>
  </body>
</html>
`;

const shoot = (html, width, height, outFile) => {
  const htmlPath = path.join(tmpDir, 'post.html');
  writeFileSync(htmlPath, html, 'utf8');

  execFileSync(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      '--default-background-color=00000000',
      `--window-size=${width},${height}`,
      `--screenshot=${outFile}`,
      `file:///${htmlPath.replace(/\\/g, '/')}`,
    ],
    { stdio: 'ignore' },
  );
};

const posts = [
  {
    name: 'instagram-feed-1080x1350.jpg',
    width: 1080,
    height: 1350,
    photo: 'tapas-bord-warm.jpg',
    kicker: 'TAPAS · GRILL · VERSE VIS',
    headline: ['Cocina de España', 'en tu mesa'],
  },
  {
    name: 'instagram-square-1080x1080.jpg',
    width: 1080,
    height: 1080,
    photo: 'sfeer-wijn-kaarsen.jpg',
    kicker: 'SPAANSE SFEER IN ROZENBURG',
    headline: ['La Caleta'],
    headlineSize: 0.155,
    logoSize: 0.066,
  },
  {
    name: 'instagram-story-1080x1920.jpg',
    width: 1080,
    height: 1920,
    photo: 'tapas-tafel.jpg',
    kicker: 'ELKE WOENSDAG & DONDERDAG',
    headline: ['Tapasdag', '€ 34,50'],
    headlineSize: 0.142,
  },
  {
    name: 'facebook-banner-1200x630.jpg',
    width: 1200,
    height: 630,
    photo: 'grill-garnalen.jpg',
    kicker: 'RAADHUISPLEIN 4A · ROZENBURG',
    headline: ['Cocina de España'],
    headlineSize: 0.135,
    logoSize: 0.058,
  },
  {
    name: 'instagram-feed-interieur-1080x1350.jpg',
    width: 1080,
    height: 1350,
    photo: 'exterieur.jpg',
    focus: 'center',
    brightness: 0.92,
    kicker: 'RAADHUISPLEIN 4A · ROZENBURG',
    headline: ['Uw Spaanse', 'restaurant'],
    headlineSize: 0.132,
  },
  {
    name: 'instagram-feed-paella-1080x1350.jpg',
    width: 1080,
    height: 1350,
    photo: 'paella-pan.jpg',
    kicker: 'ALTIJD VERS, ALTIJD SPAANS',
    headline: ['Paella', 'als het hoort'],
  },
];

for (const post of posts) {
  const html = buildHtml({ ...post, headlineLines: post.headline.length });
  const pngFile = path.join(tmpDir, post.name.replace('.jpg', '.png'));
  shoot(html, post.width, post.height, pngFile);

  // JPEG is veel kleiner en wordt door alle social platformen geaccepteerd
  const outFile = path.join(outDir, post.name);
  await sharp(pngFile).jpeg({ quality: 90, mozjpeg: true }).toFile(outFile);
  console.log('geschreven:', path.relative(root, outFile));
}
