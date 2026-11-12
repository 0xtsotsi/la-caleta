import { logo, photo, site, sp, strip, tiles } from './lib.mjs';

const W = 1080;
const H = 1350;

// 1. Welkom: de hero van de website in socialformaat
export const welkom = () =>
  `
  <div class="glow" style="width:880px;height:880px;right:-300px;top:120px"></div>
  <div class="abs label cobre" style="left:72px;top:84px">Raadhuisplein 4a, Rozenburg</div>
  <h1 class="abs display" style="left:72px;top:128px;font-size:132px;font-weight:500;margin:0">Cocina de España<br><span class="it">en tu mesa</span></h1>
  <div class="ring" style="left:468px;top:440px;width:540px;height:740px"></div>
  <div class="abs arch" style="left:440px;top:468px;width:540px;height:740px"><img src="${photo('gamba-tapas.jpg')}" style="object-position:50% 50%"></div>
  <div class="abs" style="left:72px;top:500px;width:320px">
    <p class="mute-d" style="font-size:31px;line-height:1.55">Tapas, vlees van de grill, vis en paella.</p>
    <div class="label cobre" style="margin-top:46px;font-size:20px">Tapasdag</div>
    <div style="font-size:30px;margin-top:4px">Wo en do, €34,50 p.p.</div>
  </div>
  <div class="abs arch" style="left:72px;top:850px;width:290px;height:362px;border:10px solid var(--espresso);border-bottom:0;z-index:3"><img src="${site('stock-tapas-tabla.jpg')}"></div>
  <div class="abs" style="left:72px;right:72px;top:1236px">${strip()}</div>
`;

// 2. Grote foodfoto
export const tapasFoto = () =>
  `
  <img class="fill abs" src="${site('hero-tapas.jpg')}" style="left:0;top:0;object-position:58% 50%">
  <div class="shade-t"></div><div class="shade-b"></div>
  <div class="abs" style="left:72px;top:76px">${logo(54, 'cobre')}</div>
  <div class="abs" style="left:72px;right:72px;bottom:84px">
    <div class="label cobre">Woensdag en donderdag</div>
    <h2 class="display" style="font-size:138px;margin-top:18px">Tapas<br><span class="it">om te delen</span></h2>
    <p class="mute-d" style="font-size:33px;margin-top:26px;max-width:760px;color:var(--crema)">Kies uit 32 koude en warme tapas, met brood erbij.</p>
  </div>
`;

// 3. Typografische poster
export const tapasdag = () => {
  const rows = [
    ['01', '32 koude en warme tapas, met brood erbij'],
    ['02', 'Twee tapas per persoon per ronde, zo vaak als u wilt'],
    ['03', 'Inloop tussen 17:00 en 20:00 uur. Drank en dessert apart'],
  ];
  return `
  <div class="abs" style="left:610px;top:96px;width:500px;height:720px;border-radius:999px 999px 0 0;background:oklch(0.89 0.04 72)"></div>
  <div class="abs label terra" style="left:72px;top:84px">Woensdag en donderdag</div>
  <div class="abs" style="right:72px;top:80px">${logo(46, 'terra')}</div>
  <div class="abs display terra" style="left:56px;top:128px;font-size:372px;line-height:1">€34,50</div>
  <div class="abs mute-l" style="left:72px;top:520px;font-size:34px">per persoon</div>
  <h2 class="abs display" style="left:72px;top:590px;font-size:164px;margin:0">Tapasdag</h2>
  <div class="abs" style="left:72px;right:72px;top:800px">
    ${rows.map(([n, t]) => `<div style="display:flex;gap:30px;align-items:baseline;border-top:2px solid oklch(0.23 0.022 50 / 0.16);padding:24px 0"><span class="num terra" style="font-size:46px;width:62px">${n}</span><span style="font-size:33px;line-height:1.35">${t}</span></div>`).join('')}
  </div>
  <div class="abs" style="left:72px;bottom:60px"><span class="btn">Reserveren aanbevolen</span></div>
  <div class="abs label mute-l" style="right:72px;bottom:84px">lacaleta.nl</div>
`;
};

// 4. Editorial: de familiegeschiedenis
export const verhaal = () => {
  const tl = [
    ['De eerste 17 jaar', 'Een Spaans restaurant aan het Raadhuisplein'],
    ['2018', 'Verkiezing Leukste Restaurant'],
    ['2024', 'Van vader op dochter'],
  ];
  return `
  <div class="abs label terra" style="left:72px;top:84px">Over ons</div>
  <div class="abs" style="right:72px;top:70px">${logo(48, 'terra')}</div>
  <div class="ring t" style="left:92px;top:150px;width:450px;height:690px"></div>
  <div class="abs arch" style="left:64px;top:176px;width:450px;height:690px"><img src="${site('stock-puerta-caleta.jpg')}" style="object-position:50% 40%"></div>
  <div class="abs display terra" style="left:570px;top:136px;font-size:300px;line-height:1">17</div>
  <div class="abs label terra" style="left:582px;top:440px">jaar achter het fornuis</div>
  <h2 class="abs display" style="left:570px;top:496px;font-size:94px;margin:0">Van vader<br><span class="it">op dochter</span></h2>
  <p class="abs mute-l" style="left:570px;top:716px;width:440px;font-size:28px;line-height:1.5">Het team bleef, de keuken ook. Alles in olijfolie, en vlees van de beste kwaliteit.</p>
  <div class="abs" style="left:72px;right:72px;top:960px;display:grid;grid-template-columns:repeat(3,1fr);gap:40px">
    ${tl.map(([a, b]) => `<div style="border-top:2px solid oklch(0.23 0.022 50 / 0.2);padding-top:22px"><div class="num terra" style="font-size:${a.length > 5 ? 40 : 76}px;line-height:1.05;min-height:84px;display:flex;align-items:flex-end">${a}</div><div style="font-size:26px;line-height:1.4;margin-top:10px">${b}</div></div>`).join('')}
  </div>
  <div class="abs label mute-l" style="left:72px;bottom:64px">Restaurant La Caleta, Rozenburg</div>
`;
};

export const items = [
  {
    file: 'post-01-welkom',
    w: W,
    h: H,
    cls: 'dark',
    html: () =>
      welkom() + sp('Bienvenidos', 'left:72px;top:766px;font-size:50px') + tiles('bottom'),
  },
  {
    file: 'post-02-tapas',
    w: W,
    h: H,
    cls: 'dark',
    html: () =>
      tapasFoto() + tiles('top') + sp('¡Buen provecho!', 'right:72px;top:92px;font-size:46px', ''),
  },
  {
    file: 'post-03-tapasdag',
    w: W,
    h: H,
    cls: 'sand',
    html: () =>
      tapasdag() +
      tiles('bottom', true) +
      sp('Día de tapas', 'left:330px;top:556px;font-size:44px', 'terra'),
  },
  {
    file: 'post-04-verhaal',
    w: W,
    h: H,
    cls: 'light',
    html: () =>
      verhaal() +
      tiles('top', true) +
      sp('De padre a hija', 'right:72px;bottom:54px;font-size:44px', 'terra'),
  },
];
