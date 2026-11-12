import { ic, logo, photo, site, sp, tiles } from './lib.mjs';

const W = 1080;
const H = 1350;
const TOTAL = 6;

// Doorlopende koperen lijn: loopt op elke dia door de rand, zodat de dia's aan elkaar vastzitten.
const rail = (n, light) => {
  const c = light ? 'oklch(0.5 0.13 40 / 0.5)' : 'oklch(0.76 0.1 62 / 0.6)';
  const dot = light ? 'var(--terracota)' : 'var(--cobre)';
  const x = 72 + ((n - 1) / (TOTAL - 1)) * 936;
  return `<div class="abs" style="left:0;right:0;top:1262px;height:2px;background:${c}"></div>
  <div class="abs" style="left:${x - 9}px;top:1254px;width:18px;height:18px;border-radius:50%;background:${dot}"></div>
  <div class="abs label ${light ? 'terra' : 'cobre'}" style="left:72px;top:1286px;font-size:20px">0${n} / 0${TOTAL}</div>
  ${n < TOTAL ? `<div class="abs label ${light ? 'terra' : 'cobre'}" style="right:72px;top:1286px;font-size:20px;display:flex;gap:10px;align-items:center">Swipe ${ic('arrow')}</div>` : ''}`;
};

const slide = ({ n, light, label, title, it, body, img, pos = '50% 50%', flip, extra = '' }) => {
  const tc = light ? 'terra' : 'cobre';
  const mute = light ? 'mute-l' : 'mute-d';
  const imgLeft = flip ? 560 : 72;
  const textLeft = flip ? 72 : 560;
  return `
  ${light ? '' : `<div class="glow" style="width:760px;height:760px;${flip ? 'right' : 'left'}:-280px;top:-120px"></div>`}
  <div class="abs label ${tc}" style="left:72px;top:84px">${label}</div>
  <div class="abs" style="right:72px;top:70px">${logo(46, tc)}</div>
  <div class="ring ${light ? 't' : ''}" style="left:${imgLeft + 26}px;top:182px;width:448px;height:884px"></div>
  <div class="abs arch" style="left:${imgLeft}px;top:208px;width:448px;height:884px"><img src="${img}" style="object-position:${pos}"></div>
  <div class="abs" style="left:${textLeft}px;top:208px;width:${flip ? 420 : 448}px">
    <h2 class="display" style="font-size:112px;margin:0">${title}${it ? `<br><span class="it ${tc}">${it}</span>` : ''}</h2>
    <p class="${mute}" style="font-size:30px;line-height:1.55;margin-top:34px">${body}</p>
    ${extra}
  </div>
  ${rail(n, light)}`;
};

const s1 = () => `
  <div class="glow" style="width:900px;height:900px;right:-300px;top:200px"></div>
  <div class="abs label cobre" style="left:72px;top:84px">Een dag bij La Caleta</div>
  <div class="abs" style="right:72px;top:70px">${logo(46, 'cobre')}</div>
  <h1 class="abs display" style="left:72px;top:150px;font-size:132px;margin:0;width:820px">Van de lunch tot de laatste <span class="it cobre">sangria</span></h1>
  <div class="ring" style="left:600px;top:626px;width:408px;height:566px"></div>
  <div class="abs arch" style="left:572px;top:654px;width:408px;height:566px"><img src="${photo('gamba-tapas.jpg')}" style="object-position:46% 50%"></div>
  <div class="abs" style="left:72px;top:880px;width:420px">
    <p class="mute-d" style="font-size:31px;line-height:1.55">Lunch, tapas, vlees van de grill en een glas wijn. Zo ziet een dag bij ons eruit.</p>
  </div>
  ${rail(1, false)}`;

const s2 = () =>
  slide({
    n: 2,
    light: true,
    label: 'Vanaf 11:00',
    title: 'Lunch',
    body: 'Baguettes, tosti’s, maaltijdsalades of het 12-uurtje. Brood bruin, wit of glutenvrij.',
    img: site('lunch-serveren.jpg'),
    pos: '50% 58%',
    extra: `<div style="margin-top:40px;border-top:2px solid oklch(0.23 0.022 50 / 0.18);padding-top:24px"><div class="label terra" style="font-size:20px">Het 12-uurtje</div><div class="display terra" style="font-size:86px;line-height:1.05">€14,50</div><div class="desc mute-l" style="margin-top:6px">Soep, twee boterhammen, een kroket en een gebakken ei</div></div>`,
  });

const s3 = () =>
  slide({
    n: 3,
    label: 'Woensdag en donderdag',
    title: 'Tapas',
    flip: true,
    body: 'Op tapasdag kiest u uit 32 koude en warme tapas, zoveel als u op kunt. De andere dagen bestelt u ze los.',
    img: site('tapas-bord.jpg'),
    pos: '40% 50%',
    extra: `<div style="margin-top:40px;border-top:2px solid var(--line-dark);padding-top:24px"><div class="display cobre" style="font-size:86px;line-height:1.05">€34,50</div><div class="desc mute-d">per persoon, met brood erbij</div></div>`,
  });

const s4 = () =>
  slide({
    n: 4,
    light: true,
    label: 'Van de grill',
    title: 'Vlees',
    it: 'en vis',
    body: 'Het rundvlees komt vers uit Zuid-Amerika en is 100 procent biologisch. Alles wordt in olijfolie bereid.',
    img: site('grill-vuur.jpg'),
    pos: '56% 50%',
    extra: `<div class="label terra" style="margin-top:36px;font-size:20px;line-height:1.8">Lomo, entrecote, ribeye<br>T-bone en vis van de plancha</div>`,
  });

const s5 = () =>
  slide({
    n: 5,
    label: 'Na het eten',
    title: 'Wijn',
    it: 'en sangria',
    flip: true,
    body: 'Rioja van Montelciego en Muriel, zoete Moscatel uit Málaga en onze eigen sangria, rood of wit.',
    img: photo('wijn-inschenken.jpg'),
    pos: '50% 50%',
  });

const s6 = () => `
  <div class="glow" style="width:900px;height:900px;left:-300px;top:380px"></div>
  <div class="abs label cobre" style="left:72px;top:84px">Reserveren</div>
  <div class="abs" style="right:72px;top:70px">${logo(46, 'cobre')}</div>
  <h2 class="abs display" style="left:72px;top:150px;font-size:164px;margin:0">Schuif<br><span class="it cobre">aan</span></h2>
  <div class="abs" style="left:72px;top:560px;width:560px">
    <div class="label cobre" style="font-size:20px">Bel</div>
    <div class="display" style="font-size:76px;line-height:1.05">0181 - 214342</div>
    <div class="label cobre" style="margin-top:34px;font-size:20px">Adres</div>
    <div style="font-size:31px;line-height:1.45">Raadhuisplein 4a, Rozenburg<br><span class="mute-d">Gratis parkeren in de buurt</span></div>
    <div class="label cobre" style="margin-top:34px;font-size:20px">Reserveren</div>
    <div style="font-size:31px">Via lacaleta.nl, of bel ons</div>
  </div>
  <div class="ring" style="left:700px;top:560px;width:308px;height:480px"></div>
  <div class="abs arch" style="left:672px;top:588px;width:308px;height:480px"><img src="${site('stock-tapas-tabla.jpg')}" style="object-position:30% 50%"></div>
  <div class="abs" style="left:72px;top:1090px"><span class="btn">Reserveer een tafel</span></div>
  ${rail(6, false)}`;

const es = [
  'Buenos días',
  'Almuerzo',
  'Tapas y más tapas',
  'A la parrilla',
  'Vino y sangría',
  'Hasta pronto',
];
export const items = [s1, s2, s3, s4, s5, s6].map((html, i) => ({
  file: `carrousel-0${i + 1}`,
  w: W,
  h: H,
  cls: i === 1 || i === 3 ? (i === 1 ? 'light' : 'sand') : 'dark',
  html: () =>
    html() +
    tiles('top', i === 1 || i === 3) +
    sp(
      es[i],
      `left:72px;top:${i === 5 ? 1196 : 1150}px;font-size:46px`,
      i === 1 || i === 3 ? 'terra' : 'cobre',
    ),
}));
