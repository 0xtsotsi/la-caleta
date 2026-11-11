# Opdracht: Restaurant La Caleta

## Het bedrijf

- Naam: Restaurant La Caleta (KvK 24452536, SBI 56111)
- Plaats: Raadhuisplein 4a, 3181 CG Rozenburg
- Branche: Spaans restaurant, tapas en grill
- Eigen domein: lacaleta.nl (nu Weebly). Preview op GitHub Pages onder `/la-caleta/`.

## Referentie

- Bestaande site lacaleta.nl en de menukaartscans: daaruit komen de onderwerpen en de feiten.
- Eerder concept: otrarestaurant.com als houvast voor rust en volgorde. Vorm, kleur en tekst
  zijn eigen werk.

## Afspraken

- Toon: premium Spaans, warm, crème, serif en terracotta (expliciet gevraagd).
- Taal: Nederlands, Spaanse gerechtnamen zoals op de kaart.
- Alleen lokaal werken. Niet pushen, niet publiceren.
- Infrastructuur behouden: Astro 7, Tailwind 4, `withBase`, sitemap, JSON-LD, GitHub Pages.

## Feiten en bronnen

| Feit                                                                       | Bron                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------- |
| Adres, telefoon 0181 - 214342, info@lacaleta.nl                            | lacaleta.nl, menukaart-04, dossier                |
| Ma en di gesloten, wo t/m za vanaf 11:00, zo vanaf 16:00                   | lacaleta.nl, Google (via dossier)                 |
| Sluiting 22:00                                                             | Google (via dossier); niet op lacaleta.nl         |
| Warme keuken tot 21:30                                                     | tapaskaart                                        |
| Overdracht van vader naar dochter in 2024, na 17 jaar                      | lacaleta.nl en welkomstkaart (dossier: dec. 2023) |
| Tapasdag wo en do, €34,50 p.p., meer dan 30 tapas (32 op de kaart)         | tapaskaart, welkomstkaart                         |
| Rundvlees vers op +1 graden uit Zuid-Amerika, 100% biologisch              | lacaleta.nl/over-ons, welkomstkaart               |
| Alles in olijfolie bereid; vegetarisch en dieet mogelijk                   | lacaleta.nl/over-ons                              |
| Verkiezing Leukste Restaurant 2018, winnaar gemeente Rotterdam, Gold Award | foto van de oorkonde                              |
| Gratis parkeren                                                            | lacaleta.nl/contact                               |
| VVV-cadeaukaart                                                            | lacaleta.nl (alle pagina's)                       |
| Seniorenmenu €28,50                                                        | lacaleta.nl/acties                                |
| Groepen, afhuren, speciaal dieet, cadeaubon                                | menukaart-04                                      |
| Google 4,4 uit 364 reviews                                                 | dossier, 1 november 2026                          |

Let op naamverwarring: "Restaurante La Caleta" op Tenerife is een ander restaurant.

## Correcties ten opzichte van de vorige versie

- "Paella: Pannenkoek", "watersoep", "sikker dressing", "Bakketen" waren overtypfouten.
- Cold tapa 4 is _Melón con jamón serrano_, niet mosselen.
- Le Capelin is Frans bergvarken (vlees), geen zeewolf.
- Quadril is runderkogelbiefstuk, Bife de ancho is ribeye.
- Wijnhuis heet Montelciego, niet Monteliego.
- Het 12-uurtje is soep, 2 boterhammen, kroket, gebakken ei en melk of jus. Niet de oude tekst.
- De award is de Verkiezing Leukste Restaurant 2018 (Gold Award), niet "de Gouden Knip".

## Openstaand

Zie de lijst `teBevestigen` in `src/data/site.ts` en de README.

## Eisen en hun afloop

Nagelopen op 11-11-2026.

| Eis                              | Herkenning                                                            | Waargemaakt waar                | Afloop                                     |
| -------------------------------- | --------------------------------------------------------------------- | ------------------------------- | ------------------------------------------ |
| Premium Spaanse restaurantsite   | Eigen palet, typografie, boogmotief                                   | Alle pagina's, `DESIGN.md`      | waargemaakt                                |
| 7 pagina's                       | Home, Menu, Tapas, Over ons, Acties, Contact, Reserveren              | `src/pages/`                    | waargemaakt                                |
| Echte reserveringsflow           | Drie stappen, inline validatie, statussen, Web3Forms, mailto-terugval | `/reserveren/`, compact op Home | waargemaakt; sleutel nog aanmaken (README) |
| GSAP-motion met terugval         | Werkt zonder JS en bij reduced motion                                 | `src/scripts/motion.ts`         | waargemaakt                                |
| Menukaart als tekst met prijzen  | Doorzoekbaar, index en filter                                         | `/menu/`, `/tapas/`             | waargemaakt                                |
| "Vandaag open" klopt elke dag    | Berekend in de browser, Nederlandse tijd                              | `src/scripts/open-today.ts`     | waargemaakt                                |
| `hasMenu` met basispad           | JSON-LD wijst naar `/la-caleta/menu/`                                 | `restaurantJsonLd`              | waargemaakt                                |
| Gratis parkeren en VVV zichtbaar |                                                                       | Contact, footer, Acties         | waargemaakt                                |
| Instagram gelinkt                |                                                                       | Footer                          | waargemaakt; URL nog te bevestigen         |
| Stockbeeld vastgelegd            | Bron, licentie, wat het vervangt                                      | `BEELD.md`                      | waargemaakt                                |
| Checklist livegang               |                                                                       | `README.md`                     | waargemaakt                                |
| Alleen lokaal, niet pushen       |                                                                       |                                 | waargemaakt                                |
| Nieuws- en evenementenpagina     |                                                                       |                                 | niet in deze ronde                         |
