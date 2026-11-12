import { logo, photo, site, sp, tiles } from './lib.mjs';

const cover = () => `
  <div class="glow" style="width:1100px;height:1100px;right:-200px;top:-80px"></div>
  <div class="abs" style="left:96px;top:84px">${logo(68, 'cobre')}</div>
  <div class="abs label cobre" style="left:96px;top:330px;font-size:24px">Social media portfolio</div>
  <h1 class="abs display" style="left:96px;top:380px;font-size:150px;margin:0;width:900px">Restaurant<br>La <span class="it cobre">Caleta</span></h1>
  <p class="abs mute-d" style="left:96px;top:700px;width:640px;font-size:34px;line-height:1.5">Instagram in dezelfde huisstijl als de website: dezelfde kleuren, letters, bogen en beelden.</p>
  <div class="abs" style="left:96px;bottom:84px;display:flex;gap:48px;align-items:center" ><span class="label cobre">Voorstel van WebRnds</span><span class="label mute-d">November 2026</span></div>
  <div class="ring" style="left:888px;top:130px;width:376px;height:860px"></div>
  <div class="abs arch" style="left:860px;top:156px;width:376px;height:860px"><img src="${photo('gamba-tapas.jpg')}" style="object-position:46% 50%"></div>
  <div class="abs arch" style="left:1252px;top:300px;width:296px;height:716px;border-left:12px solid var(--espresso)"><img src="${site('grill-vuur.jpg')}" style="object-position:56% 50%"></div>
  <div class="abs arch" style="left:1564px;top:440px;width:260px;height:576px"><img src="${site('tapas-bord.jpg')}" style="object-position:38% 50%"></div>
`;
export const items = [
  {
    file: 'cover-portfolio',
    w: 1920,
    h: 1080,
    cls: 'dark',
    html: () =>
      cover() +
      tiles('bottom') +
      sp('Cocina de España en tu mesa', 'left:96px;top:196px;font-size:40px'),
  },
];
