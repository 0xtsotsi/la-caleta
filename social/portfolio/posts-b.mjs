import { logo, photo, site, sp, strip, tiles } from './lib.mjs';

const W = 1080;
const H = 1350;

// 5. Productfoto: paella
export const paella = () => `
  <div class="glow" style="width:760px;height:760px;right:-260px;top:-80px"></div>
  <div class="abs label cobre" style="left:72px;top:84px">Vanaf de kaart</div>
  <div class="abs" style="right:72px;top:70px">${logo(48, 'cobre')}</div>
  <div class="ring" style="left:520px;top:130px;width:488px;height:780px"></div>
  <div class="abs arch" style="left:492px;top:158px;width:488px;height:780px"><img src="${photo('paella-marisco.jpg')}" style="object-position:50% 55%"></div>
  <h2 class="abs display" style="left:72px;top:150px;font-size:150px;margin:0">Paella</h2>
  <div class="abs display it cobre" style="left:76px;top:298px;font-size:66px;line-height:1.05">vers voor u<br>bereid</div>
  <p class="abs mute-d" style="left:72px;top:480px;width:360px;font-size:30px;line-height:1.55">Met vis, met vlees of vegetarisch.</p>
  <div class="abs display cobre" style="left:68px;top:640px;font-size:150px;line-height:1">40<span class="it">-</span>50</div>
  <div class="abs label mute-d" style="left:76px;top:800px;font-size:20px">minuten, vers bereid in de pan</div>
  <div class="abs" style="left:72px;right:72px;top:1010px">
    <div class="row"><span class="name">Paella de marisco</span><span class="lead"></span><span class="desc mute-d">Vis, voor 2 personen</span></div>
    <div class="row" style="margin-top:16px"><span class="name">Paella de carne</span><span class="lead"></span><span class="desc mute-d">Vlees, voor 2 personen</span></div>
    <div class="row" style="margin-top:16px"><span class="name">Vegetarische paella</span><span class="lead"></span><span class="desc mute-d">Voor 1 persoon</span></div>
    <div class="label cobre" style="margin-top:34px;font-size:20px">Graag vooraf bestellen, op drukke dagen niet ter plekke</div>
  </div>
`;

// 6. Van de grill
export const grill = () => `
  <div class="abs label cobre" style="left:72px;top:84px">Van de grill</div>
  <div class="abs" style="right:72px;top:70px">${logo(48, 'cobre')}</div>
  <h2 class="abs display" style="left:72px;top:128px;font-size:128px;margin:0">Rundvlees op<br><span class="it">+1 graad</span></h2>
  <div class="abs" style="left:0;right:0;top:460px;height:560px"><img class="fill" src="${site('grill-vlees.jpg')}" style="object-position:50% 40%"></div>
  <div class="abs" style="left:72px;right:72px;top:1062px;display:grid;grid-template-columns:repeat(3,1fr);gap:36px">
    ${[
      ['Lomo', 'Ossenhaas'],
      ['Quadril', 'Runderkogelbiefstuk'],
      ['Bife de ancho', 'Ribeye'],
    ]
      .map(
        ([a, b]) =>
          `<div style="border-top:2px solid var(--line-dark);padding-top:20px"><div style="font-weight:500;font-size:31px;line-height:1.25">${a}</div><div class="desc mute-d" style="margin-top:6px">${b}</div></div>`,
      )
      .join('')}
  </div>
  <p class="abs label mute-d" style="left:72px;bottom:56px;font-size:19px">Vers uit Zuid-Amerika, 100 procent biologisch, in olijfolie bereid</p>
`;

// 7. Sfeer
export const sfeer = () => `
  <img class="fill abs" src="${site('sfeer-wijn-kaarsen.jpg')}" style="left:0;top:0;object-position:50% 50%">
  <div class="shade-t"></div><div class="shade-b"></div>
  <div class="abs" style="left:72px;top:76px">${logo(54, 'cobre')}</div>
  <div class="abs" style="left:72px;right:72px;bottom:84px">
    <div class="label cobre">Na het eten</div>
    <h2 class="display" style="font-size:112px;margin-top:18px">Kaarslicht, een glas<br><span class="it">Rioja en geen haast</span></h2>
    <div style="display:flex;gap:36px;margin-top:36px;font-size:25px;color:var(--crema)"><span>Rioja van Montelciego en Muriel</span><span>Moscatel uit Málaga</span><span>Eigen sangria</span></div>
  </div>
`;

// 8. Collage van arches
export const collage = () => {
  const cols = [
    ['tapas-jamon.jpg', 'Tapas', 520, 'Tapas'],
    [site('verse-vis.jpg'), 'Verse vis', 650, 'Vis'],
    ['paella-marisco.jpg', 'Paella', 560, 'Paella'],
    [site('stock-churros.jpg'), 'Churros', 610, 'Dessert'],
  ];
  return `
  <div class="abs label terra" style="left:72px;top:84px">Spaanse keuken</div>
  <div class="abs" style="right:72px;top:70px">${logo(48, 'terra')}</div>
  <h2 class="abs display" style="left:72px;top:126px;font-size:118px;margin:0">Alles uit de<br><span class="it terra">Spaanse keuken</span></h2>
  ${cols
    .map(([img, label, h], i) => {
      const left = 72 + i * (222 + 16);
      const top = 1080 - h;
      const url = img.startsWith('file') ? img : photo(img);
      return `<div class="abs arch" style="left:${left}px;top:${top}px;width:222px;height:${h}px"><img src="${url}"></div>
    <div class="abs" style="left:${left}px;top:1100px;width:222px"><span class="num terra" style="font-size:34px">0${i + 1}</span><div style="font-weight:500;font-size:28px;line-height:1.2">${label}</div></div>`;
    })
    .join('')}
  <div class="ring t" style="left:${72 + 222 + 16 - 14}px;top:${1080 - 650 - 26}px;width:222px;height:650px"></div>
  <div class="abs" style="left:72px;right:72px;bottom:52px;border-top:2px solid oklch(0.23 0.022 50 / 0.16);padding-top:18px;display:flex;justify-content:space-between" ><span class="label mute-l" style="font-size:20px">Raadhuisplein 4a, Rozenburg</span><span class="label mute-l" style="font-size:20px">lacaleta.nl</span></div>
`;
};

// 9. Reserveren
export const reserveren = () => `
  <div class="glow" style="width:820px;height:820px;left:-300px;top:480px"></div>
  <div class="abs label cobre" style="left:72px;top:84px">Reserveren</div>
  <div class="abs" style="right:72px;top:70px">${logo(48, 'cobre')}</div>
  <h2 class="abs display" style="left:72px;top:126px;font-size:150px;margin:0">Reserveer<br>uw <span class="it cobre">tafel</span></h2>
  <div class="ring" style="left:656px;top:442px;width:380px;height:540px"></div>
  <div class="abs arch" style="left:628px;top:470px;width:380px;height:540px"><img src="${photo('wijn-inschenken.jpg')}" style="object-position:50% 50%"></div>
  <div class="abs" style="left:72px;top:474px;width:520px">
    <div class="label cobre" style="font-size:20px">Bel</div>
    <div class="display" style="font-size:74px;line-height:1.05">0181 - 214342</div>
    <div class="label cobre" style="margin-top:30px;font-size:20px">Adres</div>
    <div style="font-size:30px;line-height:1.4">Raadhuisplein 4a<br>3181 CG Rozenburg</div>
    <div class="label cobre" style="margin-top:30px;font-size:20px">Open</div>
    <div style="font-size:28px;line-height:1.5">Wo t/m za vanaf 11:00<br>Zo vanaf 16:00<br><span class="mute-d">Maandag en dinsdag gesloten</span></div>
  </div>
  <div class="abs" style="left:72px;top:1040px"><span class="btn">Reserveer via lacaleta.nl</span></div>
  <div class="abs" style="left:72px;right:72px;top:1236px">${strip()}</div>
`;

export const items = [
  {
    file: 'post-05-paella',
    w: W,
    h: H,
    cls: 'dark',
    html: () =>
      paella() + tiles('bottom') + sp('Hecha al momento', 'left:72px;top:586px;font-size:42px'),
  },
  {
    file: 'post-06-grill',
    w: W,
    h: H,
    cls: 'dark',
    html: () =>
      grill() + tiles('bottom') + sp('A la parrilla', 'right:72px;top:392px;font-size:48px'),
  },
  {
    file: 'post-07-sfeer',
    w: W,
    h: H,
    cls: 'dark',
    html: () => sfeer() + tiles('top') + sp('¡Salud!', 'right:72px;top:90px;font-size:60px', ''),
  },
  {
    file: 'post-08-collage',
    w: W,
    h: H,
    cls: 'sand',
    html: () =>
      collage() +
      tiles('bottom', true) +
      sp('Sabores de España', 'left:76px;top:372px;font-size:46px', 'terra'),
  },
  {
    file: 'post-09-reserveren',
    w: W,
    h: H,
    cls: 'dark',
    html: () =>
      reserveren() + tiles('bottom') + sp('Hasta pronto', 'right:72px;top:1064px;font-size:54px'),
  },
];
