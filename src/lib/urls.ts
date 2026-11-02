/**
 * Interne links moeten het basispad van de deployment volgen.
 * Op GitHub Pages staat de site in /la-caleta, op een eigen domein in /.
 *
 * Zonder deze prefix wijzen alle links naar https://domein.nl/menu/ in plaats
 * van https://domein.nl/la-caleta/menu/ — en dat geeft een 404.
 */

const base = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');

/** Zet het basispad vóór een intern pad. Externe links blijven ongemoeid. */
export const withBase = (path: string): string => {
  if (!path.startsWith('/')) return path;
  if (path.startsWith('//')) return path;
  return `${base}${path}`;
};

/** Interne links met een anker, bijvoorbeeld /contact/#reserveren. */
export const withBaseAnchor = (path: string, anchor: string): string =>
  `${withBase(path)}#${anchor}`;
