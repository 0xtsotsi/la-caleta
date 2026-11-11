# Social media — La Caleta

Tien onderwerpen, elk in drie formaten. De beelden staan in
`social/posts-v2/`; de bijschriften in `social/CAPTIONS-V2.md`.

| Map                | Wat het is                                                        |
| ------------------ | ----------------------------------------------------------------- |
| `social/posts/`    | de eerste serie (JPEG, uit `scripts/social-post.mjs`)             |
| `social/posts-v2/` | **de serie om te gebruiken**: PNG, in de huisstijl van de website |

## De formaten

| Formaat  | Bestandsnaam                                 | Afmeting    | Gebruik                                         |
| -------- | -------------------------------------------- | ----------- | ----------------------------------------------- |
| Feed     | `instagram-feed-<onderwerp>-1080x1350.png`   | 1080 × 1350 | Instagram en Facebook, feed op de telefoon      |
| Vierkant | `instagram-square-<onderwerp>-1080x1080.png` | 1080 × 1080 | Instagram, Facebook, LinkedIn; overal bruikbaar |
| Banner   | `facebook-banner-<onderwerp>-1200x630.png`   | 1200 × 630  | Link in een nieuwsbrief of bericht, X, Facebook |

## Bouwen

```bash
npm run social:v2
```

De beelden worden opnieuw gerenderd. Er is geen extra pakket nodig: het
script bouwt een pagina in HTML en laat Microsoft Edge die in headless mode
vastleggen. Edge moet op deze computer staan; anders zet `EDGE_PATH` naar
het pad van een andere Chromium-browser.

De oude serie bouw je met `npm run social:posts`.

## Het concept

De beelden volgen de huisstijl van de website, niet een aparte stijl:

- **Warm papier** met de gloed van het kaarslicht, geen vlakke kleur.
- **Een subtiel Spaanse tegeltje** (een kleine ruit) als textuur in de
  achtergrond, in een tint die nauwelijks te zien is. Het vult de vlakte
  zonder om aandacht te vragen.
- **Geen lijnen.** Geen strepen onder de prijzen, geen stippellijnen, geen
  kaders rond de foto's. De hiërarchie komt uit de letters, de kleur en de
  witruimte — precies zoals op de menukaart van het restaurant.
- **De brief van de site**: Cormorant Garamond italic voor de kop, Jost
  voor de tekst, het handschrift van Dancing Script voor het woordmerk.
- **Avondrood** voor de actie, goud voor de accenten, crema als papier.

Elke post vraagt om één ding: reserveren. De knop staat er dus altijd bij.

## De posts

| Onderwerp        | Wat het is                         | Opbouw                          |
| ---------------- | ---------------------------------- | ------------------------------- |
| `tapasdag`       | Elke woensdag en donderdag tapas   | Fotoband boven, tekst eronder   |
| `tapas-kaart`    | Een greep uit de tapaskaart        | Tekst met prijzen, foto eronder |
| `grill`          | Vlees van de grill                 | Tekst met prijzen, foto eronder |
| `verse-vis`      | Verse vis van de grill             | Fotoband boven, tekst eronder   |
| `paella`         | Paella zoals het hoort             | Foto over de hele vlakte        |
| `spaanse-wijnen` | Wijnen uit Spanje                  | Tekst met prijzen, foto eronder |
| `lunch-12uurtje` | Het lunchmenu                      | Fotoband boven, tekst eronder   |
| `seniorenmenu`   | Het seniorenmenu                   | Foto over de hele vlakte        |
| `openingstijden` | Wanneer je langs kunt komen        | Donkere vlakte, openingstijden  |
| `ons-verhaal`    | Sinds 2007, van vader naar dochter | Donkere vlakte met de kokers    |

## Aanpassen

Teksten, prijzen en de keuze van de foto staan in
`scripts/build-social-v2.mjs`, in de lijst `POSTS` bovenaan. Verandert daar
een tekst of een prijs, dan bouwt het script de beelden opnieuw.

De prijzen komen overeen met `src/data/site.ts`. De foto's komen uit
`src/assets/images/`.

## Wat nog moet gebeuren

- De sfeerfoto's zijn voorbeelden van Pexels (gratis, geen credit
  verplicht). Vervang ze door foto's van het restaurant zelf zodra die
  er zijn — dan is de post echt van jullie.
- De gezichten van de kokers zijn zichtbaar in `ons-verhaal`. Zorg dat
  iedereen akkoord is voordat je die post plaatst.
