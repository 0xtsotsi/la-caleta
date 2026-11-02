/**
 * Bouwt een korte, warme filmpje voor social media (9:16, 1080x1920).
 *
 *   node scripts/social-video.mjs
 *
 * Vier scènes met een rustige Ken Burns-beweging, kruisvervagingen en
 * tekstoverlays in de huisstijl van het restaurant. De beelden zijn dezelfde
 * warmtegraded foto's als op de website.
 */

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(root, 'src', 'assets', 'images');
const fontsDir = path.join(root, 'social', 'fonts');
const outDir = path.join(root, 'social', 'posts');
const framesDir = path.join(root, 'social', '.frames');
mkdirSync(outDir, { recursive: true });
rmSync(framesDir, { recursive: true, force: true });
mkdirSync(framesDir, { recursive: true });

const FORMAT = process.argv[2] === 'landscape' ? 'landscape' : 'vertical';
const WIDTH = FORMAT === 'landscape' ? 1920 : 1080;
const HEIGHT = FORMAT === 'landscape' ? 1080 : 1920;
const FPS = 24;
const SCALE = WIDTH / 1080;

const font = (name) => readFileSync(path.join(fontsDir, name)).toString('base64');

const S = (value) => Math.round(value * SCALE);

// Posities zijn gekoppeld aan de hoogte, zodat beide formaten kloppen
const LOGO_Y = FORMAT === 'landscape' ? 250 : 300;
const layout =
  FORMAT === 'landscape'
    ? {
        kickerY: Math.round(HEIGHT * 0.57),
        lineY: Math.round(HEIGHT * 0.72),
        step: Math.round(WIDTH * 0.088),
        size: Math.round(WIDTH * 0.072),
      }
    : {
        kickerY: Math.round(HEIGHT * 0.705),
        lineY: Math.round(HEIGHT * 0.785),
        step: Math.round(WIDTH * 0.137),
        size: Math.round(WIDTH * 0.122),
      };

const fontCss = `
@font-face { font-family: 'Cormorant'; src: url('data:font/ttf;base64,${font('Cormorant-Regular.ttf')}'); font-weight: 400; }
@font-face { font-family: 'Cormorant'; src: url('data:font/ttf;base64,${font('Cormorant-Medium.ttf')}'); font-weight: 500; }
@font-face { font-family: 'Cormorant'; src: url('data:font/ttf;base64,${font('Cormorant-Italic.ttf')}'); font-weight: 400; font-style: italic; }
@font-face { font-family: 'Dancing'; src: url('data:font/ttf;base64,${font('DancingScript-Regular.ttf')}'); }
@font-face { font-family: 'Jost'; src: url('data:font/ttf;base64,${font('Jost-Light.ttf')}'); font-weight: 300; }
@font-face { font-family: 'Jost'; src: url('data:font/ttf;base64,${font('Jost-Regular.ttf')}'); font-weight: 400; }
@font-face { font-family: 'Jost'; src: url('data:font/ttf;base64,${font('Jost-Medium.ttf')}'); font-weight: 500; }
`;

const C = {
  crema: '#fdf8ef',
  dorado: '#e0b769',
};

const escapeXml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Tekstoverlay voor één scène. */
const textSvg = ({ lines, kicker, logo = false }) => {
  const parts = [];

  if (logo) {
    parts.push(
      `<text x="${S(96)}" y="${LOGO_Y}" font-family="Dancing" font-size="${S(150)}" fill="${C.crema}">La Caleta</text>`,
    );
    parts.push(
      `<text x="${S(100)}" y="${LOGO_Y + S(58)}" font-family="Jost" font-size="${S(30)}" font-weight="500" letter-spacing="${S(13)}" fill="${C.dorado}">RESTAURANTE ESPAÑOL</text>`,
    );
    parts.push(
      `<rect x="${S(100)}" y="${LOGO_Y + S(92)}" width="${S(104)}" height="${S(5)}" fill="#a4161a"/>`,
    );
  }

  if (kicker) {
    parts.push(
      `<text x="${WIDTH / 2}" y="${layout.kickerY}" text-anchor="middle" font-family="Jost" font-size="${S(32)}" font-weight="500" letter-spacing="${S(12)}" fill="${C.dorado}">${escapeXml(kicker)}</text>`,
    );
  }

  lines.forEach((line, index) => {
    parts.push(
      `<text x="${WIDTH / 2}" y="${layout.lineY + index * layout.step}" text-anchor="middle" font-family="Cormorant" font-style="italic" font-weight="500" font-size="${layout.size}" fill="${C.crema}">${escapeXml(line)}</text>`,
    );
  });

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs><style>${fontCss}</style></defs>
  ${parts.join('\n  ')}
</svg>`;
};

const grainSvg = Buffer.from(
  `<svg width="200" height="200"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="200" height="200" filter="url(#n)" opacity="0.5"/></svg>`,
);

/** Maakt één frame van een scène, met een subtiele zoom/pan. */
const sceneFrame = async (scene, progress) => {
  const { image, focus = 'center', zoomStart = 1, zoomEnd = 1.08, pan = 0 } = scene;
  const eased = progress * progress * (3 - 2 * progress);
  const zoom = zoomStart + (zoomEnd - zoomStart) * eased;

  const resized = await sharp(path.join(imagesDir, image))
    .resize(Math.round(WIDTH * 1.25), Math.round(HEIGHT * 1.25), {
      fit: 'cover',
      position: focus,
    })
    .toBuffer({ resolveWithObject: true });

  const base = resized.data;
  const cropWidth = Math.round(WIDTH / zoom);
  const cropHeight = Math.round(HEIGHT / zoom);
  const maxX = resized.info.width - cropWidth;
  const maxY = resized.info.height - cropHeight;
  const offsetX = Math.round(maxX * (0.5 + pan * eased));
  const offsetY = Math.round(maxY * 0.5);

  const frame = await sharp(base)
    .extract({ left: offsetX, top: offsetY, width: cropWidth, height: cropHeight })
    .resize(WIDTH, HEIGHT)
    .modulate({ saturation: 1.08, brightness: 1.02 })
    .toBuffer();

  const layers = [
    {
      input: Buffer.from(
        `<svg width="${WIDTH}" height="${HEIGHT}"><defs><linearGradient id="t" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#140d08" stop-opacity="0.78"/><stop offset="38%" stop-color="#140d08" stop-opacity="0.12"/><stop offset="100%" stop-color="#140d08" stop-opacity="0"/></linearGradient><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="40%" stop-color="#140d08" stop-opacity="0"/><stop offset="100%" stop-color="#140d08" stop-opacity="0.92"/></linearGradient></defs><rect width="${WIDTH}" height="${HEIGHT}" fill="url(#t)"/><rect width="${WIDTH}" height="${HEIGHT}" fill="url(#b)"/></svg>`,
      ),
    },
  ];

  if (scene.logo || scene.kicker || scene.lines?.length) {
    layers.push({
      input: Buffer.from(
        textSvg({ lines: scene.lines ?? [], kicker: scene.kicker, logo: scene.logo }),
      ),
    });
  }

  layers.push({ input: grainSvg, blend: 'overlay' });

  return sharp(frame).composite(layers).jpeg({ quality: 92 }).toBuffer();
};

const scenes = [
  {
    image: 'hero-tapas.jpg',
    focus: 'center',
    zoomStart: 1.12,
    zoomEnd: 1.02,
    pan: 0.12,
    logo: true,
    seconds: 3.4,
  },
  {
    image: 'tapas-bord-warm.jpg',
    focus: 'center',
    zoomStart: 1.02,
    zoomEnd: 1.14,
    pan: -0.1,
    kicker: 'TAPAS · GRILL · VERSE VIS',
    lines: ['Cocina de España', 'en tu mesa'],
    seconds: 3.4,
  },
  {
    image: 'tapas-tafel.jpg',
    focus: 'center',
    zoomStart: 1.16,
    zoomEnd: 1.03,
    pan: 0.08,
    kicker: 'ELKE WOENSDAG & DONDERDAG',
    lines: ['Tapasdag', '€ 34,50'],
    seconds: 3.4,
  },
  {
    image: 'grill-garnalen.jpg',
    focus: 'center',
    zoomStart: 1.04,
    zoomEnd: 1.15,
    pan: -0.08,
    kicker: 'RAADHUISPLEIN 4A · ROZENBURG',
    lines: ['Reserveren', '0181 - 214342'],
    seconds: 3.4,
  },
];

const FADE = 0.45; // seconde kruisvervaging
const totalSeconds = scenes.reduce((sum, scene) => sum + scene.seconds, 0);
const totalFrames = Math.round(totalSeconds * FPS);

const sceneStarts = [];
let cursor = 0;
for (const scene of scenes) {
  sceneStarts.push(cursor);
  cursor += scene.seconds;
}

const frameFiles = [];

for (let frameIndex = 0; frameIndex < totalFrames; frameIndex += 1) {
  const time = frameIndex / FPS;

  let sceneIndex = 0;
  for (let i = 0; i < scenes.length; i += 1) {
    if (time >= sceneStarts[i]) sceneIndex = i;
  }

  const scene = scenes[sceneIndex];
  const sceneStart = sceneStarts[sceneIndex];
  const progress = Math.min(1, (time - sceneStart) / scene.seconds);
  let buffer = await sceneFrame(scene, progress);

  // Kruisvervanging met de volgende scène
  const sceneEnd = sceneStart + scene.seconds;
  const nextIndex = sceneIndex + 1;
  if (nextIndex < scenes.length && time > sceneEnd - FADE) {
    const next = scenes[nextIndex];
    const nextProgress = Math.max(0, (time - sceneEnd) / FADE);
    const nextBuffer = await sceneFrame(next, 0);
    buffer = await sharp(buffer)
      .composite([{ input: nextBuffer, blend: 'over', opacity: nextProgress }])
      .jpeg({ quality: 92 })
      .toBuffer();
  }

  const file = path.join(framesDir, `frame-${String(frameIndex).padStart(4, '0')}.jpg`);
  await sharp(buffer).toFile(file);
  frameFiles.push(file);

  if (frameIndex % 48 === 0) {
    process.stdout.write(`frame ${frameIndex}/${totalFrames}\n`);
  }
}

const output = path.join(
  outDir,
  FORMAT === 'landscape' ? 'la-caleta-reel-1920x1080.mp4' : 'la-caleta-reel-1080x1920.mp4',
);
execFileSync(
  'ffmpeg',
  [
    '-y',
    '-framerate',
    String(FPS),
    '-i',
    path.join(framesDir, 'frame-%04d.jpg'),
    '-c:v',
    'libx264',
    '-preset',
    'slow',
    '-crf',
    '20',
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    output,
  ],
  { stdio: 'ignore' },
);

rmSync(framesDir, { recursive: true, force: true });
console.log('geschreven:', path.relative(root, output));
