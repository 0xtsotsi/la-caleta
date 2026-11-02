# Restaurant La Caleta — website

Een nieuw websiteconcept voor **Restaurant La Caleta** (Raadhuisplein 4a, Rozenburg), een Spaans
restaurant. De huidige site is een Weebly-pagina; dit project is de voorgestelde vervanging.

De opzet is geïnspireerd door [otrarestaurant.com](https://otrarestaurant.com/) (strakke typografie,
volledige beeldhero, rustige voettekst) gecombineerd met de identiteit van La Caleta: Spaans rode
en crème kleurstelling, het script-logo en Andalusische beelden.

## Stack

| Onderdeel    | Keuze                                                                          |
| ------------ | ------------------------------------------------------------------------------ |
| Framework    | [Astro 7](https://astro.build) — statische output, geen client-side JS nodig   |
| Styling      | Tailwind CSS 4 + custom design tokens in `src/styles/global.css`               |
| Fonts        | Cormorant Garamond, Jost en Dancing Script (via `@fontsource`, lokaal gehost)  |
| Afbeeldingen | `astro:assets` — automatische WebP-conversie en responsive `srcset`            |
| SEO          | Per pagina meta tags, Open Graph, `schema.org/Restaurant` (JSON-LD) en sitemap |

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

## Social media

De map `social/` bevat kant-en-klare social assets in de huisstijl van de site.

| Bestand                                        | Formaat | Gebruik                    |
| ---------------------------------------------- | ------- | -------------------------- |
| `posts/instagram-feed-1080x1350.jpg`           | 4:5     | Instagram-feed (1080×1350) |
| `posts/instagram-square-1080x1080.jpg`         | 1:1     | Instagram vierkant         |
| `posts/instagram-story-1080x1920.jpg`          | 9:16    | Instagram story            |
| `posts/instagram-feed-interieur-1080x1350.jpg` | 4:5     | Het restaurant zelf        |
| `posts/instagram-feed-paella-1080x1350.jpg`    | 4:5     | Paella                     |
| `posts/facebook-banner-1200x630.jpg`           | 1.91:1  | Facebook-banner            |
| `posts/la-caleta-reel-1080x1920.mp4`           | 9:16    | Reel/TikTok (14 sec)       |
| `posts/la-caleta-reel-1920x1080.mp4`           | 16:9    | Facebook/YouTube (14 sec)  |

De bijbehorende teksten staan in `social/CAPTIONS.md`.

### Opnieuw genereren

```bash
npm run social:posts              # alle beelden
npm run social:video              # verticale reel
npm run social:video:landscape    # liggende video
```

De scripts gebruiken Chromium (via Playwright) en ffmpeg. De beelden worden opgebouwd uit
HTML/CSS en de video uit losse frames die ffmpeg tot een filmpje voegt.

## Sfeer en beweging

De site is opgebouwd rond warmte: Spaanse rode en goud-tinten, een donkere kaarslicht-glans over de
donkere secties en een zachte fade-in van de inhoud zodra die in beeld komt.

| Wat                  | Waar                                                                         |
| -------------------- | ---------------------------------------------------------------------------- |
| Fade-in bij scrollen | `src/scripts/motion.ts` — IntersectionObserver, met vertraging per element   |
| Parallax in de hero  | `[data-parallax]` op het beeld in `Hero.astro`                               |
| Kaarten die opveren  | `.lift` in `src/styles/global.css`                                           |
| Ankers per sectie    | `#intro`, `#specialiteiten`, `#favoritos`, `#acties`, `#ambiente`, `#visita` |

Alle bewegingen schakelen automatisch uit bij `prefers-reduced-motion`. Zonder JavaScript blijft
alle tekst zichtbaar (de reveal-stijlen hangen aan een `.js` klasse die alleen door JavaScript wordt
gezet).

## Content beheren

Alles wat te maken heeft met de inhoud staat in **`src/data/site.ts`**:

- **Openingstijden** — `openingHours` (dag, open, dicht)
- **Gerechten** — `starters`, `tapasPriced`, `tapasCold`, `tapasWarm`, `meatFromTheGrill`, `fish`,
  `desserts`, `wines`
- **Acties** — `acts` (tapasdag, seniorenmenu, 12-uurtje)
- **Contactgegevens** — `site` (telefoon, e-mail, adres, social links)
- **Structured data** — `jsonLd` ( Restaurant-schema voor lokale SEO)

## De live site

**https://jalvdbroek-ship-it.github.io/la-caleta/**

De site staat op GitHub en draait op GitHub Pages. Bij elke push naar `main` wordt de site
automatisch opnieuw gebouwd en staat de wijziging binnen een minuut live — precies zoals bij je
andere sites.

| Pagina   | Link                                                     |
| -------- | -------------------------------------------------------- |
| Home     | https://jalvdbroek-ship-it.github.io/la-caleta/          |
| Menu     | https://jalvdbroek-ship-it.github.io/la-caleta/menu/     |
| Tapas    | https://jalvdbroek-ship-it.github.io/la-caleta/tapas/    |
| Over ons | https://jalvdbroek-ship-it.github.io/la-caleta/over-ons/ |
| Acties   | https://jalvdbroek-ship-it.github.io/la-caleta/acties/   |
| Contact  | https://jalvdbroek-ship-it.github.io/la-caleta/contact/  |

> **Let op:** GitHub Pages kan op een gratis account alleen voor openbare repos. De repo
> `jalvdbroek-ship-it/la-caleta` is daarom openbaar, net als je andere websites.

## Deployment

De site bouwt naar een volledig statische `dist/`. Elke statische host werkt:

- **Netlify** — build command `npm run build`, publish directory `dist`
- **Vercel** — framework preset "Astro"
- **GitHub Pages** — al ingericht via `.github/workflows/deploy.yml` (zie hierboven)

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

**Eigen foto's** — de foto's en menukaarten van het restaurant zelf zijn overgenomen van de huidige
website (`lacaleta.nl`) en behoren toe aan Restaurant La Caleta. De originele bestanden waren maar
400px breed; die zijn opgeschaald, verscherpt en voorzien van een fijne filmkorrel zodat ze niet
wazig ogen.

De hero op de homepage toont de eigen zaal van La Caleta (gasten, tafels, tegelvloer). De
zonsondergang over de baai van Cádiz — het beeld van de omslag van hun menukaart — staat als
sfeer-intermezzo verderop de pagina (`src/components/Intermezzo.astro`).

**Sfeerfoto's** — voor de sfeerbeelden op de homepage en de tapaspagina zijn foto's van Pexels
gebruikt (gratis te gebruiken, geen credit verplicht). **Dit zijn ter illustratie: vervang ze door
echt materiaal van het restaurant voordat de site live gaat.** De bestanden herken je aan de
bestandsnamen `sfeer-*`, `tapas-*`, `bar-*`, `lunch-*`, `grill-*`, `paella-*`, `tafel-*` en
`verse-vis.jpg`.

**Kleurgrading** — alle beelden zijn één keer warmtegraded (rode en groen iets omhoog, blauw omlaag)
zodat de sfeer overal hetzelfde is.
