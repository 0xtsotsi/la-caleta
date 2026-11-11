# Restaurant La Caleta: ontwerpnotitie

**Onderwerp en publiek.** Restaurant La Caleta, Raadhuisplein 4a in Rozenburg. Spaanse
tapas, grill, vis en paella, sinds 2024 in handen van de dochter. Publiek: mensen uit
Rozenburg en omgeving (Rotterdam-West, Brielle, Maassluis) die een avond uit zoeken, vaak
op de telefoon en vaak kort van tevoren. Ook ouderen (seniorenmenu) en groepen.

**De enige taak:** een tafel reserveren. Daarvoor moet de bezoeker snel kunnen zien wat er
op de kaart staat, wat het kost en wanneer er plek is.

## Thesis: "Sobremesa in Cádiz"

Het moment na het eten, als niemand opstaat. Warm avondlicht in een donker restaurant:
espresso als basis, crème en zand als papier van de menukaart, koper als het licht op een
koperen pan. La Caleta is ook de baai van Cádiz, en de omslag van hun menukaart.

**Signatuur: de Andalusische boog (_arco_).** Foto's verschijnen door een boogvormige
`clip-path` (halfrond aan de bovenkant, recht aan de onderkant), zoals de deuren en
nissen van een Andalusisch huis. In de hero opent de boog bij het scrollen tot het beeld
de volle breedte vult. Dit is het enige opvallende element. De rest blijft rustig: geen
kaarten, geen schaduwen, rechte lijnen en veel lucht.

**Waarom crème + serif + terracotta hier toch mag.** Dat cluster staat op de lijst met
generieke stijlen. Het hoort hier omdat de briefing er expliciet om vraagt en omdat het
de echte materialen van het restaurant zijn: terracotta schalen, de rode kaart, crème
papier. Om het eigen te maken is espresso de dominante kleur (niet crème), koper in plaats
van goud, de boog als vorm en echte kaartinhoud in plaats van sfeerzinnen.

## Typografie

- **Cormorant Garamond** (500 en italic 500) voor koppen. Groot, met de italic als
  stijlmiddel voor een hele regel, niet voor één los woord.
- **Jost** (300, 400, 500) voor lopende tekst, prijzen (tabulaire cijfers) en de UI.
- **Dancing Script** alleen in het logo "La Caleta", zoals op hun kaart.
- Geen nieuwe fonts. Alles via `@fontsource`, lokaal gehost.

## Kleur (OKLCH, gemeten met `npm run contrast`, alle 24 paren halen WCAG 2.2 AA)

| Token                                           | OKLCH                       | Rol                                                     |
| ----------------------------------------------- | --------------------------- | ------------------------------------------------------- |
| `--color-espresso`                              | 0.2 0.018 50                | donkere secties, header op scroll, footer               |
| `--color-espresso-2`                            | 0.255 0.024 48              | verhoogd vlak op donker (formulier, index)              |
| `--color-crema`                                 | 0.968 0.014 85              | papier, lichte secties                                  |
| `--color-arena`                                 | 0.925 0.028 78              | zand, tweede papier                                     |
| `--color-tinta`                                 | 0.23 0.022 50               | tekst op licht                                          |
| `--color-tinta-2`                               | 0.44 0.03 50                | gedempte tekst op licht                                 |
| `--color-terracota`                             | 0.5 0.13 40                 | links en accent op licht, focusring op licht            |
| `--color-cobre`                                 | 0.76 0.1 62                 | koper: accent en focusring op donker                    |
| `--color-crema-2`                               | 0.84 0.02 80                | gedempte tekst op donker                                |
| `--color-rojo`                                  | 0.47 0.17 27                | La Caleta-rood, **alleen** de primaire knop "Reserveer" |
| `--color-rojo-hover`                            | 0.4 0.15 27                 | hover van die knop                                      |
| `--color-line` / `--color-line-dark`            | 0.62 0.03 60 / 0.52 0.03 55 | veldranden (3:1)                                        |
| `--color-ok`, `--color-err`, `--color-err-dark` |                             | statussen formulier                                     |

Gemeten (selectie): tinta op crema 15.5, tinta-2 op crema 7.2, terracota op crema 5.8,
cobre op espresso 8.3, crema-2 op espresso 11.1, crema op rojo 6.8.

## Ruimte, vorm en materiaal

- Eén contentrail: `max-width: 76rem`, gutter 1.25rem mobiel en 2.5rem vanaf 768px. Header,
  secties en footer gebruiken dezelfde `.shell`.
- Sectiepadding: 6rem desktop, 4rem mobiel. Basis 4px, schaal 4/8/12/16/24/32/48/64/96.
- Radius: 0 op vlakken en knoppen. Alleen de boog (beeld) en de bolletjes van de
  "vandaag open"-indicator zijn rond. Geen kaartjesgrids, geen schaduwen, geen glas.
- Lijnen: 1px `currentColor` op 15 tot 25 procent voor scheidingen; prijzen met
  stippellijnen zoals op hun kaart.

## Beeld

- Stockfoto's van Pexels in hoge resolutie (zie `BEELD.md`), gemarkeerd als tijdelijk. Eigen
  foto's (team, award, gevel, interieur) alleen klein.
- Eén statische hero-foto in de boog (1600×2000, warm licht op de toonbank met tapas en
  wijnglazen). Geen video: de site laadt geen filmpjes, dus geen autoplay of pauzeknop.
- De menukaartscans blijven als bijlage, de kaart zelf staat als tekst op de site.

## Beweging (GSAP 3.15.1 + ScrollTrigger, Flip)

1. **Hero:** titel regel voor regel uit een masker (0.9 s, stagger 0.12 s, `power3.out`). Bij
   het scrollen opent de boog (`clip-path` van boog naar rechthoek) en schuift het beeld licht
   in parallax.
2. **Verhaal (home):** een sticky sectie met vier momenten: lunch, tapas, grill, wijn. Bij het
   scrollen wisselt het beeld via een `clip-path` van onder naar boven. Alleen vanaf 768px.
3. **Beeldreveals:** de boog opent eenmalig als het beeld in beeld komt (0.9 s).
4. **Menukaart:** sticky categorie-index die de actieve sectie volgt; filter (vegetarisch, vis,
   vlees) met GSAP Flip.
5. **Achtergrond:** één vervaagde koperen lichtvlek achter donkere secties die met het
   scrollen meedrijft. Hij beweegt nooit uit zichzelf (dus geen pauzeknop nodig, WCAG
   2.2.2), alleen op desktop, en staat stil bij reduced motion.
6. **Hover:** onderstreping die van links inschuift; beeld zoomt 4 procent binnen een vast
   kader. Geen hover-lift.

Zonder JavaScript en bij `prefers-reduced-motion` is alle inhoud direct zichtbaar: de
verborgen beginstanden hangen aan `.js` en worden alleen door GSAP gezet. Onder 768px geen
pins (`ScrollTrigger.config({ ignoreMobileResize: true })`). GSAP wordt via een dynamische
import geladen, alleen als er iets te animeren is.

## Bewust vermeden

- Kaartjesgrids met overal dezelfde ronde hoeken: groepering met witruimte en lijnen.
- Fade-up op elke sectie: alleen de boog opent, verder staat alles stil.
- Hover-lifts, deeltjes, marquees, automatisch draaiende carrousels.
- Tracked ALL-CAPS-labels boven elke kop: alleen waar ze een echte categorie noemen
  (dag, prijs, menu-onderdeel).
- Verzonnen reviews en cijfers. Wat er staat is na te gaan: 32 tapas op de tapaskaart, 17
  jaar volgens de welkomstkaart, de award van 2018 van de foto, de Google-score met datum.
- Em dashes en middelpunt-reeksen in de UI-tekst.
- Een pijl op elke link.

## Eisen uit de opdracht in het ontwerp

| Eis                                          | Waar                                                              |
| -------------------------------------------- | ----------------------------------------------------------------- |
| Premium Spaanse uitstraling                  | Espresso en koper, Cormorant, de boog, echte gerechten            |
| 7 pagina's                                   | Home, Menu, Tapas, Over ons, Acties, Contact, Reserveren          |
| Echte reservering                            | `/reserveren/`, Web3Forms, met mailto als terugval zonder sleutel |
| GSAP-motion                                  | Hero, sticky verhaal, boogreveals, menu-index met Flip            |
| Kaart als tekst                              | `src/data/site.ts`, alle kaartscans overgetypt en gecontroleerd   |
| Gratis parkeren en VVV-cadeaukaart zichtbaar | Contact, footer, Acties                                           |
| Instagram gelinkt                            | Footer (URL nog te bevestigen)                                    |

Niet in deze ronde: een nieuws- en evenementenpagina (staat in het prospectvoorstel, niet in
het plan).
