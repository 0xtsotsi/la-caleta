# Restaurant La Caleta: website

Nieuwe website voor **Restaurant La Caleta**, Raadhuisplein 4a in Rozenburg: een Spaans
restaurant met tapas, grill, vis en paella. De huidige site (lacaleta.nl) is een Weebly-pagina
met alleen kaartscans; deze site zet de hele kaart als tekst online en voegt een eigen
reserveringsformulier toe.

- Ontwerp en keuzes: [`DESIGN.md`](DESIGN.md)
- De opdracht, de bronnen en wat er is waargemaakt: [`OPDRACHT.md`](OPDRACHT.md)
- Herkomst en licentie van alle beelden: [`BEELD.md`](BEELD.md)

## De live site

**https://0xtsotsi.github.io/la-caleta/**

Bij elke push naar `main` bouwt GitHub Actions de site en staat de wijziging binnen een
minuut live.

| Pagina   | Link                                           |
| -------- | ---------------------------------------------- |
| Home     | https://0xtsotsi.github.io/la-caleta/          |
| Menu     | https://0xtsotsi.github.io/la-caleta/menu/     |
| Tapas    | https://0xtsotsi.github.io/la-caleta/tapas/    |
| Over ons | https://0xtsotsi.github.io/la-caleta/over-ons/ |
| Acties   | https://0xtsotsi.github.io/la-caleta/acties/   |
| Contact  | https://0xtsotsi.github.io/la-caleta/contact/  |

> **Let op:** GitHub Pages kan op een gratis account alleen voor openbare repos. De repo
> `0xtsotsi/la-caleta` is daarom openbaar, net als je andere websites.

## De site lokaal openen

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # statische site naar dist/
npm run preview    # bouwresultaat bekijken
```

Om precies na te bootsen wat GitHub Pages bouwt (met het basispad `/la-caleta/`):

```bash
DEPLOY_BASE=la-caleta SITE_URL=https://0xtsotsi.github.io/la-caleta npm run build
npx astro preview --port 4173   # http://localhost:4173/la-caleta/
```

Schrijf `DEPLOY_BASE` zonder voorloopslash; Git Bash op Windows maakt van `/la-caleta` een
systeempad.

## Pagina's

| Pagina                    | Wat erop staat                                                                                                                           |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Home `/`                  | Hero met video in de boog, verhaal (lunch, tapas, grill, wijn), tapasdag, greep uit de kaart, ligging en openingstijden, snel reserveren |
| Menu `/menu/`             | De hele kaart met prijzen, meelopende index, filter (vegetarisch, vis, vlees), de papieren kaart als bijlage                             |
| Tapas `/tapas/`           | Tapasdag (€34,50), de regels, alle 32 tapas genummerd, Niños, sangria                                                                    |
| Over ons `/over-ons/`     | Tijdlijn, de keuken, de award van 2018                                                                                                   |
| Acties `/acties/`         | Tapasdag, seniorenmenu, 12-uurtje, groepen, afhuren, dieet, cadeaubon                                                                    |
| Contact `/contact/`       | Telefoon, mail, adres, parkeren, VVV, kaart, openingstijden                                                                              |
| Reserveren `/reserveren/` | Formulier in drie stappen: datum en gezelschap, tijd, gegevens                                                                           |

## Mapstructuur

```
src/
├── assets/images/     foto's (eigen + stock-*), kaartscans
├── components/        Header, Footer, MobileBar, Hero, PageHero, ArchImage, StoryScroll,
│                      MenuIndex, DishList, OpeningHours, ReserveForm, ReserveQuick, Intermezzo, Icon
├── data/site.ts       ⭐ alle inhoud: gegevens, tijden, de hele kaart, acties, punten om te bevestigen
├── layouts/           BaseLayout (head, fonts, JSON-LD, scripts)
├── lib/urls.ts        withBase(): elke interne link loopt hierdoor
├── pages/             de 7 pagina's
├── scripts/           motion.ts (GSAP), menu.ts (index + filter), reserve.ts (formulier),
│                      open-today.ts ("vandaag open")
└── styles/global.css  OKLCH-tokens en componentklassen
public/video/          hero-video in twee formaten (1080 en 720 breed)
tools/                 contrast, toegankelijkheid, inhoud, formulier en linkcontrole
social/, scripts/      social-media-beelden (los van de site)
```

## Links en het basispad

De site draait op GitHub Pages in `/la-caleta/` en later op het eigen domein. Daarom loopt
elke interne link via `withBase` uit `src/lib/urls.ts`:

```astro
<a href={withBase('/menu/')}>Menu</a>
```

Schrijf nooit `href="/menu/"`. `npm run check:links` controleert dit over `dist/`.

## Reserveringsformulier (Web3Forms)

Het formulier verstuurt via [Web3Forms](https://web3forms.com) naar info@lacaleta.nl.

1. Maak een gratis sleutel aan op web3forms.com met **info@lacaleta.nl**.
2. Lokaal: kopieer `.env.example` naar `.env` en vul `PUBLIC_WEB3FORMS_KEY` in.
3. GitHub Pages: zet de sleutel als repository-variabele `PUBLIC_WEB3FORMS_KEY`
   (Settings > Secrets and variables > Actions > Variables). De workflow geeft hem door.

Zonder sleutel verstuurt het formulier niets: de knop opent dan een vooringevulde e-mail en
het telefoonnummer staat ernaast. Zonder JavaScript post het formulier direct naar Web3Forms
(of opent het een mailto als er geen sleutel is).

Tijdsloten volgen uit `openingHours` in `src/data/site.ts`: elk half uur vanaf opening tot
21:00 (de warme keuken sluit om 21:30). Maandag, dinsdag en data in het verleden worden
geweigerd. Online maximaal 12 personen; daarboven verschijnt een bel-melding.

## Beweging

GSAP 3.15.1 met ScrollTrigger en Flip, per pagina geladen via een dynamische import. Zie
`DESIGN.md` voor wat er beweegt en waarom. Zonder JavaScript en bij `prefers-reduced-motion`
staat alle inhoud direct in beeld. Onder 1024px geen vastgezette hero.

## Controle

```bash
npm run check            # typecheck
npm run lint             # Biome
npm run contrast         # alle kleurparen uit DESIGN.md, minimaal 4.5:1
npm run check:links      # na een build met DEPLOY_BASE=la-caleta
URL=http://localhost:4173/la-caleta/ npm run check:a11y      # per pagina, ook /menu/ enz.
URL=http://localhost:4173/la-caleta/ npm run check:content
URL=http://localhost:4173/la-caleta/ npm run check:form      # Web3Forms wordt nagebootst
```

De a11y-, inhoud- en formulierchecks gebruiken Playwright (via `tools/browser.mjs`). Stand
11-11-2026: alle zeven pagina's 27/27 en 5/5, formulier 11/11 zonder sleutel en 15/15 met een
testsleutel, 289 interne links heel. Niet gedaan: een test met een echte schermlezer en met
forced colors.

## Content beheren

Alles staat in `src/data/site.ts`: gegevens, `openingHours`, de hele kaart (lunch, entremeses,
tapas, grill, vis, paella, kindermenu's, dessert, koffie, wijn), acties en de lijst
`teBevestigen`. Bovenaan elke lijst staat van welke kaartscan hij komt.

## Wat er staat vast

- Adres, telefoon, e-mail, gratis parkeren, VVV-cadeaukaart, seniorenmenu: lacaleta.nl.
- Alle gerechten en prijzen: overgetypt van de kaartscans en gecontroleerd (zie de
  correcties in `OPDRACHT.md`).
- 32 tapas op tapasdag, 17 jaar tot de overdracht, de award van 2018: kaart en oorkonde.

## Wat je nog moet doen voor live gang

**Laten bevestigen door de klant** (ook in `teBevestigen` in `src/data/site.ts`):

- [ ] Jaar van de overdracht: de site en kaart zeggen 2024, het dossier december 2023.
- [ ] "Sinds 2007": afgeleid uit 17 jaar tot 2024, staat nergens letterlijk.
- [ ] Sluitingstijd 22:00 (Google) en de warme keuken tot 21:30 (tapaskaart).
- [ ] Of de prijzen van de kaartscans nog kloppen.
- [ ] Facebook `facebook.com/LaCaleta.nl` en Instagram `instagram.com/lacaletarozenburg`.
- [ ] Google-score 4,4 uit 364 reviews (stand 1 november 2026): bijwerken bij livegang.
- [ ] Mag de vader of dochter bij naam genoemd worden? Nu staat er geen naam.

**Technisch:**

- [ ] Web3Forms-sleutel aanmaken met info@lacaleta.nl en instellen (zie hierboven), daarna
  één echte testreservering doen.
- [ ] Stockbeelden vervangen door eigen foto's (`BEELD.md`), vooral `stock-*`, de hero-video
  (`public/video/`) en de sfeerbeelden uit de vorige ronde.
- [ ] Eigen foto's in hogere resolutie: de huidige zijn 1200px of kleiner.
- [ ] Privacyverklaring (het formulier verwerkt naam, telefoon en e-mail). Nog niet geschreven.
- [ ] `public/og.jpg` vernieuwen in de nieuwe stijl.
- [ ] Domein lacaleta.nl koppelen en `SITE_URL`/`DEPLOY_BASE` in de workflow aanpassen.
- [ ] Pushen naar `main` (niet gedaan in deze ronde).

## Techniek

| Onderdeel    | Keuze                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------- |
| Framework    | Astro 7, statische output                                                                     |
| Styling      | Tailwind CSS 4 + OKLCH-tokens in `src/styles/global.css`                                      |
| Fonts        | Cormorant Garamond, Jost, Dancing Script (alleen logo), lokaal via `@fontsource`              |
| Beweging     | GSAP 3.15.1 (exact vastgezet) met ScrollTrigger en Flip                                       |
| Formulier    | Web3Forms, terugval op mailto                                                                 |
| Afbeeldingen | `astro:assets`, WebP met `srcset`                                                             |
| SEO          | Meta per pagina, Open Graph, `schema.org/Restaurant` met `hasMenu` op het juiste pad, sitemap |
| Iconen       | Lucide (ISC), inline in `src/components/Icon.astro`                                           |

## Social media portfolio

De presentatie voor klantgesprekken staat op `/portfolio/`: cover, identiteit, de volledige
feed, negen posts met bijschrift, een carrousel, zes stories en een planning voor vier weken.
De pagina is niet in het menu en niet in de sitemap, en heeft `noindex`. Elk beeld kan groot
bekeken en gedownload worden; "Start presentatie" bladert er met de pijltjestoetsen doorheen.

```bash
npm run social:portfolio    # rendert alle beelden naar src/assets/portfolio/
```

De ontwerpen staan als HTML-sjablonen in `social/portfolio/` (`posts-a.mjs`, `posts-b.mjs`,
`carousel.mjs`, `stories.mjs`, `cover.mjs`) en gebruiken `design.css` met de kleuren en
letters van de site. Bijschriften en planning staan in `src/data/portfolio.ts`.

## Social media

De map `social/` bevat kant-en-klare beelden en video's in de vorige huisstijl (rood en goud).
Opnieuw genereren met `npm run social:posts`, `npm run social:video` en
`npm run social:video:landscape`. Zie `social/README.md`.
