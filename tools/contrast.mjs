// WCAG 2.2 contrastcontrole voor het La Caleta-palet. Run: node tools/contrast.mjs
const clamp01 = (v) => Math.min(1, Math.max(0, v));

function oklchToSrgb(L, C, H) {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;
  const rgb = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
  return rgb.map((v) => clamp01(v)); // linear sRGB
}

const luminance = (rgb) => 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
const ratio = (a, b) => {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
};

// Gelijk houden met de tokens in src/styles/global.css (DESIGN.md).
const T = {
  espresso: [0.2, 0.018, 50],
  espresso2: [0.255, 0.024, 48],
  crema: [0.968, 0.014, 85],
  arena: [0.925, 0.028, 78],
  tinta: [0.23, 0.022, 50],
  tinta2: [0.44, 0.03, 50],
  terracota: [0.5, 0.13, 40],
  cobre: [0.76, 0.1, 62],
  crema2: [0.84, 0.02, 80],
  rojo: [0.47, 0.17, 27],
  rojoHover: [0.4, 0.15, 27],
  lineLight: [0.62, 0.03, 60],
  lineDark: [0.52, 0.03, 55],
  ok: [0.47, 0.1, 150],
  err: [0.5, 0.17, 27],
  errDark: [0.76, 0.12, 35],
};

const px = (t) => oklchToSrgb(...t);
const pairs = [
  ["tinta on crema", "tinta", "crema", 4.5],
  ["tinta on arena", "tinta", "arena", 4.5],
  ["tinta2 on crema", "tinta2", "crema", 4.5],
  ["tinta2 on arena", "tinta2", "arena", 4.5],
  ["terracota on crema", "terracota", "crema", 4.5],
  ["terracota on arena", "terracota", "arena", 4.5],
  ["crema on espresso", "crema", "espresso", 4.5],
  ["crema on espresso2", "crema", "espresso2", 4.5],
  ["crema2 on espresso", "crema2", "espresso", 4.5],
  ["crema2 on espresso2", "crema2", "espresso2", 4.5],
  ["cobre on espresso", "cobre", "espresso", 4.5],
  ["cobre on espresso2", "cobre", "espresso2", 4.5],
  ["crema on rojo (knop)", "crema", "rojo", 4.5],
  ["crema on rojoHover", "crema", "rojoHover", 4.5],
  ["espresso on cobre (knop)", "espresso", "cobre", 4.5],
  ["ok on crema", "ok", "crema", 4.5],
  ["err on crema", "err", "crema", 4.5],
  ["errDark on espresso", "errDark", "espresso", 4.5],
  ["errDark on espresso2", "errDark", "espresso2", 4.5],
  ["lineLight on crema (veldrand)", "lineLight", "crema", 3],
  ["lineDark on espresso (veldrand)", "lineDark", "espresso", 3],
  ["terracota focus on crema", "terracota", "crema", 3],
  ["cobre focus on espresso", "cobre", "espresso", 3],
  ["rojo on crema (knoprand)", "rojo", "crema", 3],
];

let fails = 0;
for (const [label, a, b, min] of pairs) {
  const r = ratio(px(T[a]), px(T[b]));
  const pass = r >= min;
  if (!pass) fails++;
  console.log(
    `${pass ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(6)} (min ${min})  ${label}`
  );
}
console.log(fails ? `\n${fails} failing pair(s)` : "\nAll pairs pass");
