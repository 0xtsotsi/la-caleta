import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
export const root = join(here, '..', '..');
const f = (...p) => pathToFileURL(join(root, ...p)).href;
export const photo = (name) =>
  name.includes('/') ? f(...name.split('/')) : f('social', 'portfolio', 'photos', name);
export const site = (name) => f('src', 'assets', 'images', name);
const font = (pkg, file) => f('node_modules', '@fontsource', pkg, 'files', file);

const css = `
@font-face{font-family:"Cormorant Garamond";font-weight:500;font-style:normal;src:url(${font('cormorant-garamond', 'cormorant-garamond-latin-500-normal.woff2')})}
@font-face{font-family:"Cormorant Garamond";font-weight:500;font-style:italic;src:url(${font('cormorant-garamond', 'cormorant-garamond-latin-500-italic.woff2')})}
@font-face{font-family:"Jost";font-weight:400;src:url(${font('jost', 'jost-latin-400-normal.woff2')})}
@font-face{font-family:"Jost";font-weight:500;src:url(${font('jost', 'jost-latin-500-normal.woff2')})}
@font-face{font-family:"Dancing Script";font-weight:400;src:url(${font('dancing-script', 'dancing-script-latin-400-normal.woff2')})}
`;
export const designCss = css;

// Lucide-paden uit src/components/Icon.astro
const paths = {
  car: '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/>',
  calendar:
    '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>',
  phone:
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
};
export const ic = (name) =>
  `<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;

export const logo = (size = 44, cls = '') =>
  `<span class="script ${cls}" style="font-size:${size}px">La Caleta</span>`;

export const strip = (light = false) => {
  const c = light ? 'terra' : 'cobre';
  const item = (icon, text) =>
    `<span><i class="${c}" style="display:flex">${ic(icon)}</i>${text}</span>`;
  return `<div class="strip ${light ? 'l' : ''}">${item('car', 'Gratis parkeren')}${item('calendar', 'Tapasdag wo en do')}${item('gift', 'VVV-cadeaukaart')}</div>`;
};

export const doc = (
  w,
  h,
  cls,
  inner,
) => `<!doctype html><html lang="nl"><head><meta charset="utf-8"><style>${css}</style>
<link rel="stylesheet" href="${f('social', 'portfolio', 'design.css')}"></head><body>
<div class="canvas ${cls}" style="width:${w}px;height:${h}px">${inner}</div></body></html>`;

export const tiles = (pos = 'bottom', light = false) =>
  `<div class="tiles ${pos} ${light ? 'lt' : ''}"></div>`;
export const sp = (text, style, cls = 'cobre') =>
  `<div class="sp ${cls}" style="${style}">${text}</div>`;
