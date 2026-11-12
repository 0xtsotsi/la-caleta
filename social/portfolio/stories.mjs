import { ic, logo, photo, site, sp, tiles } from './lib.mjs';

const W = 1080;
const H = 1920;
// Veilige zone voor Instagram: niets belangrijks in de bovenste 250 en onderste 340 pixels.
const link = (text, light) =>
  `<div class="abs" style="left:72px;right:72px;top:1500px;display:flex;justify-content:center"><span style="display:inline-flex;align-items:center;gap:14px;border:2px solid ${light ? 'var(--tinta)' : 'var(--crema)'};padding:20px 36px;font-weight:500;font-size:30px">${ic('arrow')}${text}</span></div>`;
const tag = (t, light) =>
  `<div class="abs label ${light ? 'terra' : 'cobre'}" style="left:72px;top:262px">${t}</div><div class="abs" style="right:72px;top:248px">${logo(50, light ? 'terra' : 'cobre')}</div>`;

const open = () => `
  <div class="glow" style="width:1000px;height:1000px;right:-380px;top:300px"></div>
  ${tag('Vandaag')}
  <h1 class="abs display" style="left:72px;top:330px;font-size:190px;margin:0">Vandaag<br><span class="it cobre">open</span></h1>
  <div class="ring" style="left:420px;top:760px;width:588px;height:620px"></div>
  <div class="abs arch" style="left:392px;top:788px;width:588px;height:620px"><img src="${photo('gamba-tapas.jpg')}" style="object-position:46% 50%"></div>
  <div class="abs" style="left:72px;top:800px;width:290px">
    <div class="label cobre" style="font-size:20px">Wo t/m za</div><div class="display" style="font-size:58px;line-height:1.05">vanaf 11:00</div>
    <div class="label cobre" style="font-size:20px;margin-top:30px">Zondag</div><div class="display" style="font-size:58px;line-height:1.05">vanaf 16:00</div>
    <div class="mute-d" style="font-size:26px;margin-top:34px;line-height:1.4">Gratis parkeren in de buurt</div>
  </div>
  ${link('Reserveer via lacaleta.nl')}`;

const tapasdag = () => `
  <div class="abs" style="left:560px;top:300px;width:540px;height:760px;border-radius:999px 999px 0 0;background:oklch(0.89 0.04 72)"></div>
  ${tag('Woensdag en donderdag', true)}
  <div class="abs display terra" style="left:56px;top:340px;font-size:330px;line-height:1">€34,50</div>
  <div class="abs mute-l" style="left:72px;top:640px;font-size:36px">per persoon</div>
  <h2 class="abs display" style="left:72px;top:730px;font-size:216px;margin:0">Tapasdag</h2>
  <div class="abs" style="left:72px;right:72px;top:1160px">
    ${['32 koude en warme tapas, met brood erbij', 'Inloop tussen 17:00 en 20:00 uur', 'Reserveren aanbevolen'].map((t, i) => `<div style="display:flex;gap:28px;align-items:baseline;border-top:2px solid oklch(0.23 0.022 50 / 0.16);padding:20px 0"><span class="num terra" style="font-size:44px;width:60px">0${i + 1}</span><span style="font-size:33px">${t}</span></div>`).join('')}
  </div>
  ${link('Reserveer via lacaleta.nl', true).replace('top:1500px', 'top:1530px')}`;

const grill = () => `
  <img class="fill abs" src="${site('grill-vuur.jpg')}" style="left:0;top:0;object-position:56% 50%">
  <div class="shade-t"></div>
  <div class="abs" style="inset:0;background:linear-gradient(to top, oklch(0.2 0.018 50 / 0.96) 0%, oklch(0.2 0.018 50 / 0.7) 26%, oklch(0.2 0.018 50 / 0) 52%)"></div>
  ${tag('Van de grill')}
  <div class="abs" style="left:72px;right:72px;top:1130px">
    <h2 class="display" style="font-size:176px;margin:0">Van het<br><span class="it cobre">vuur</span></h2>
    <p style="font-size:33px;line-height:1.5;margin-top:26px;max-width:800px">Vers rundvlees op +1 graad, 100 procent biologisch. In olijfolie bereid.</p>
  </div>`;

const sfeer = () => `
  <img class="fill abs" src="${photo('wijn-inschenken.jpg')}" style="left:0;top:0">
  <div class="shade-t"></div>
  <div class="abs" style="inset:0;background:linear-gradient(to top, oklch(0.2 0.018 50 / 0.94) 0%, oklch(0.2 0.018 50 / 0.6) 26%, oklch(0.2 0.018 50 / 0) 50%)"></div>
  ${tag('Na het eten')}
  <div class="abs" style="left:72px;right:72px;top:1120px">
    <h2 class="display" style="font-size:132px;margin:0">Kaarslicht,<br>een glas Rioja<br><span class="it cobre">en geen haast</span></h2>
  </div>`;

const verhaal = () => `
  ${tag('Ons verhaal', true)}
  <div class="ring t" style="left:318px;top:360px;width:690px;height:900px"></div>
  <div class="abs arch" style="left:290px;top:388px;width:690px;height:900px"><img src="${site('stock-puerta-caleta.jpg')}" style="object-position:50% 40%"></div>
  <div class="abs display terra" style="left:56px;top:340px;font-size:250px;line-height:1">17</div>
  <div class="abs label terra" style="left:76px;top:600px;font-size:20px;width:180px">jaar, daarna<br>van vader<br>op dochter</div>
  <h2 class="abs display" style="left:72px;top:1330px;font-size:104px;margin:0;white-space:nowrap">Van vader <span class="it terra">op dochter</span></h2>
  <p class="abs mute-l" style="left:72px;top:1480px;width:860px;font-size:34px;line-height:1.5">Het team bleef, de keuken ook. Alles in olijfolie, en vlees van de beste kwaliteit.</p>`;

const cadeau = () => `
  <div class="glow" style="width:900px;height:900px;left:-340px;top:700px"></div>
  ${tag('Cadeaubon')}
  <h2 class="abs display" style="left:72px;top:330px;font-size:164px;margin:0">Een etentje<br><span class="it cobre">cadeau doen</span></h2>
  <div class="ring" style="left:420px;top:840px;width:588px;height:560px"></div>
  <div class="abs arch" style="left:392px;top:868px;width:588px;height:560px"><img src="${site('sfeer-bloem-kaars.jpg')}" style="object-position:50% 40%"></div>
  <div class="abs" style="left:72px;top:880px;width:290px;font-size:29px;line-height:1.5" ><span class="mute-d">Een cadeaubon van La Caleta kan met een bedrag naar keuze. Ook de VVV-cadeaukaart is welkom.</span></div>
  ${link('Vraag ernaar via 0181 - 214342')}`;

const cls = ['dark', 'sand', 'dark', 'dark', 'light', 'dark'];
const deco = [
  () => sp('Bienvenidos', 'left:72px;top:1440px;font-size:50px'),
  () => sp('Día de tapas', 'left:340px;top:632px;font-size:52px', 'terra'),
  () => sp('A la parrilla', 'left:72px;top:1060px;font-size:50px', ''),
  () => sp('¡Salud!', 'left:72px;top:1050px;font-size:56px', ''),
  () => '',
  () => sp('Un regalo', 'left:72px;top:1230px;font-size:50px'),
];
export const items = [open, tapasdag, grill, sfeer, verhaal, cadeau].map((html, i) => ({
  file: `story-0${i + 1}-${['open', 'tapasdag', 'grill', 'sfeer', 'verhaal', 'cadeaubon'][i]}`,
  w: W,
  h: H,
  cls: cls[i],
  html: () => html() + tiles('top', cls[i] !== 'dark') + deco[i](),
}));
