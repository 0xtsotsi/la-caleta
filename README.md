# Restaurant La Caleta — website

Een nieuw websiteconcept voor **Restaurant La Caleta** (Raadhuisplein 4a, Rozenburg), een Spaans
restaurant. De huidige site is een Weebly-pagina; dit project is de voorgestelde vervanging.

De opzet is geïnspireerd door [otrarestaurant.com](https://otrarestaurant.com/) (strakke typografie,
volledige beeldhero, rustige voettekst) gecombineerd met de identiteit van La Caleta: Spaans rode
en crème kleurstelling, het script-logo en Andalusische beelden.

## Stack

| Onderdeel | Keuze |
| --- | --- |
| Framework | [Astro 7](https://astro.build) — statische output, geen client-side JS nodig |
| Styling | Tailwind CSS 4 + custom design tokens in `src/styles/global.css` |
| Fonts | Cormorant Garamond, Jost en Dancing Script (via `@fontsource`, lokaal gehost) |
| Afbeeldingen | `astro:assets` — automatische WebP-conversie en responsive `srcset` |
| SEO | Per pagina meta tags, Open Graph, `schema.org/Restaurant` (JSON-LD) en sitemap |

## Starten

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # statische site naar dist/
npm run preview  # bouwresultaat lokaal bekijken
npm run check    # typecheck (astro check)
```

## Structuur

```
src/
├── assets/images/      foto's van het restaurant (van de huidige site) + menukaarten
├── components/         Header, Footer, Hero, PageHero, SectionTitle, DishList, …
├── data/site.ts        ⭐ alle restaurantgegevens, openingstijden, gerechten en acties
├── layouts/            BaseLayout (head, meta, JSON-LD, header/footer)
├── pages/              index, menu, tapas, over-ons, acties, contact
└── styles/global.css   design tokens (kleuren, typografie) en componentklassen
```

## Content beheren

Alles wat te maken heeft met de inhoud staat in **`src/data/site.ts`**:

- **Openingstijden** — `openingHours` (dag, open, dicht)
- **Gerechten** — `starters`, `tapasPriced`, `tapasCold`, `tapasWarm`, `meatFromTheGrill`, `fish`,
  `desserts`, `wines`
- **Acties** — `acts` (tapasdag, seniorenmenu, 12-uurtje)
- **Contactgegevens** — `site` (telefoon, e-mail, adres, social links)
- **Structured data** — `jsonLd` ( Restaurant-schema voor lokale SEO)

## Deployment

De site bouwt naar een volledig statische `dist/`. Elke statische host werkt:

- **Netlify** — build command `npm run build`, publish directory `dist`
- **Vercel** — framework preset "Astro"
- **GitHub Pages** — zet in `astro.config.mjs` `site` en `output: 'static'`, publiceer `dist`

## Open punten voor de klant

1. **Sluitingstijden** — de huidige site vermeldt alleen de openingstijd. In de JSON-LD en in de
   openingstijden-tabel is aangevuld met een sluitingstijd van 22:00 (gebaseerd de directory
   vermelding "11:00 tot 22:00"). Even verifiëren.
2. **Reserveringsformulier** — verstuurt via `mailto:` naar `info@lacaleta.nl`; er is geen backend.
   Kan later gekoppeld worden aan een reserveringssysteem of formulierdienst.
3. **Social links** — in `src/data/site.ts` staan nog placeholders; de echte Facebook- en
   Instagram-URL's invullen.
4. **Menukaarten** — de scans van de menukaarten staan in `src/assets/images/menu-kaart-*.jpg` en
   worden op de menupagina getoond. Een nette, doorlopende tekstversie staat er óók bij, zodat de
   keuze en prijzen op één plek staan.
5. **Nieuwe foto's** — de meeste foto's zijn 400px breed (afkomstig van de huidige site). Voor een
   scherpere site zijn hogere resolutes aan te bevelen.
6. **Privacyverklaring** — toe te voegen zodra er een cookiebanner of analytics komt.

## Beeldmateriaal

Alle foto's en menukaarten zijn overgenomen van de huidige website van het restaurant
(`lacaleta.nl`) en behoren toe aan Restaurant La Caleta.
