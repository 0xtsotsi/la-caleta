// Inhoud van de social media-presentatie (/portfolio/). De beelden staan in
// src/assets/portfolio/ en worden gerenderd door social/portfolio/render.mjs.
// Alle feiten komen uit src/data/site.ts. Alles wat de klant nog moet bevestigen staat
// onderaan in `teBevestigenSocial`.

export const hashtags = {
  basis: ['#lacaleta', '#rozenburg', '#spaansrestaurant'],
};

export type Post = {
  id: string;
  file: string;
  title: string;
  type: string;
  alt: string;
  doel: string;
  caption: string;
  cta: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    id: 'welkom',
    file: 'post-01-welkom',
    title: 'Welkom',
    type: 'Merkintroductie',
    alt: 'Cocina de España en tu mesa, met gamba-tapas in een boog en een bord tapas',
    doel: 'Laat zien wie La Caleta is, in dezelfde opmaak als de hero van de website.',
    caption:
      'Cocina de España en tu mesa. Aan het Raadhuisplein in Rozenburg schuift u aan voor tapas, vlees van de grill, vis en paella. Van vader op dochter overgegaan, met dezelfde keuken en hetzelfde team. Op woensdag en donderdag is het tapasdag, en gratis parkeren kan in de buurt.',
    cta: 'Reserveer uw tafel via de link in onze bio.',
    tags: ['#tapas', '#tapasdag'],
  },
  {
    id: 'tapas',
    file: 'post-02-tapas',
    title: 'Tapas om te delen',
    type: 'Grote foodfoto',
    alt: 'Terracotta schaaltjes met koude en warme tapas op een houten tafel',
    doel: 'Eén sterk beeld dat honger maakt en de tapasdag aankondigt.',
    caption:
      'Tapas zijn er om te delen. Op woensdag en donderdag kiest u uit 32 koude en warme tapas, met brood erbij. Welke bestelt u als eerste? Laat het ons weten in de reacties.',
    cta: 'Reserveren aanbevolen, zodat de keuken kan voorbereiden. Link in bio.',
    tags: ['#tapas', '#tapasdag'],
  },
  {
    id: 'tapasdag',
    file: 'post-03-tapasdag',
    title: 'Tapasdag',
    type: 'Typografische poster',
    alt: 'Poster met de prijs 34,50 euro per persoon voor tapasdag op woensdag en donderdag',
    doel: 'De vaste aanbieding duidelijk maken: prijs, dagen en spelregels.',
    caption:
      'Tapasdag, €34,50 per persoon. Op woensdag en donderdag kiest u uit 32 koude en warme tapas, met brood erbij. Twee tapas per persoon per ronde, zo vaak als u wilt. Inloop tussen 17:00 en 20:00 uur. Drank en dessert zijn niet inbegrepen.',
    cta: 'Bel 0181 - 214342 of reserveer via de link in bio.',
    tags: ['#tapasdag', '#tapas'],
  },
  {
    id: 'verhaal',
    file: 'post-04-verhaal',
    title: 'Van vader op dochter',
    type: 'Editorial',
    alt: 'Magazine-opmaak met de poort van La Caleta in Cádiz en een tijdlijn van 17 jaar tot 2024',
    doel: 'Het familieverhaal vertellen, zodat gasten de mensen achter het restaurant leren kennen.',
    caption:
      '17 jaar lang stond vader in de keuken aan het Raadhuisplein. In 2024 nam zijn dochter het over. Het team bleef, de keuken ook: alles in olijfolie, en vlees van de beste kwaliteit. In 2018 won La Caleta de Verkiezing Leukste Restaurant.',
    cta: 'Kom kennismaken. Reserveren kan via de link in bio.',
    tags: ['#familiebedrijf'],
  },
  {
    id: 'paella',
    file: 'post-05-paella',
    title: 'Paella',
    type: 'Productfotografie',
    alt: 'Paella met schaaldieren en citroen in een boog, met de drie soorten paella op de kaart',
    doel: 'Een gerecht uitlichten dat vooraf besteld moet worden.',
    caption:
      'Onze paella wordt vers bereid, in 40 tot 50 minuten. Daarom bestelt u hem graag vooraf: op drukke dagen is hij niet ter plekke te bestellen. Kies uit vis, vlees of vegetarisch.',
    cta: 'Geef bij het reserveren door dat u paella wilt. Bel 0181 - 214342 of gebruik de link in bio.',
    tags: ['#paella'],
  },
  {
    id: 'grill',
    file: 'post-06-grill',
    title: 'Rundvlees op +1 graad',
    type: 'Foto met magazine-tekst',
    alt: 'Garnalen en vlees op de grill, met Lomo, Quadril en Bife de ancho eronder',
    doel: 'De kwaliteit van het vlees en de grillkaart laten zien.',
    caption:
      'Het rundvlees komt vers, op +1 graad, uit Zuid-Amerika en is 100 procent biologisch. Mals, met weinig vet, en in olijfolie bereid. Lomo, quadril of een bife de ancho: wat wordt het?',
    cta: 'Bekijk de hele grillkaart via de link in bio.',
    tags: ['#grill', '#biologisch'],
  },
  {
    id: 'sfeer',
    file: 'post-07-sfeer',
    title: 'Kaarslicht en geen haast',
    type: 'Sfeerbeeld',
    alt: 'Kaarsen, een glas wijn en bloemen in warm licht',
    doel: 'De gastvrijheid en rust van het restaurant voelbaar maken.',
    caption:
      'Kaarslicht, een glas Rioja en geen haast. Blijf zitten na het eten. Rioja van Montelciego en Muriel, zoete Moscatel uit Málaga en onze eigen sangria, rood of wit. Een karaf is een liter.',
    cta: 'Reserveer een tafel voor de hele avond via de link in bio.',
    tags: ['#sangria', '#rioja'],
  },
  {
    id: 'collage',
    file: 'post-08-collage',
    title: 'Alles uit de Spaanse keuken',
    type: 'Fotocollage',
    alt: 'Vier bogen met tapas, verse vis, paella en churros',
    doel: 'Het brede aanbod in één beeld: tapas, vis, paella en dessert.',
    caption:
      'Tapas, verse vis, paella en churros met chocolade-ijs. De Spaanse keuken in vier bogen. De hele kaart staat online, met prijzen.',
    cta: 'Bekijk de kaart op lacaleta.nl, via de link in bio.',
    tags: ['#churros', '#tapas'],
  },
  {
    id: 'reserveren',
    file: 'post-09-reserveren',
    title: 'Reserveer uw tafel',
    type: 'Promotionele visual',
    alt: 'Reserveringskaart met telefoonnummer, adres, openingstijden en een rode knop',
    doel: 'Alle praktische informatie in één post die gasten kunnen bewaren.',
    caption:
      'Reserveer uw tafel. Bel 0181 - 214342, mail info@lacaleta.nl of reserveer via lacaleta.nl. Open van woensdag tot en met zaterdag vanaf 11:00 en op zondag vanaf 16:00. Maandag en dinsdag zijn we gesloten. Gratis parkeren in de buurt, en de VVV-cadeaukaart is welkom.',
    cta: 'Reserveer via de link in bio.',
    tags: ['#reserveren'],
  },
];

export const cover = {
  file: 'cover-portfolio',
  title: 'Portfolio-cover',
  alt: 'Restaurant La Caleta, social media portfolio, met drie bogen met gamba-tapas, grillvuur en tapas',
};

export const carousel = {
  title: 'Van de lunch tot de laatste sangria',
  alt: [
    'Titeldia met gamba-tapas in een boog',
    'Lunch: het 12-uurtje voor €14,50',
    'Tapas op woensdag en donderdag voor €34,50',
    'Vlees en vis van de grill boven open vuur',
    'Wijn en sangria bij kaarslicht',
    'Reserveren: telefoon, adres en een rode knop',
  ],
  doel: 'Een dag bij La Caleta in zes dia’s, in dezelfde volgorde als het verhaal op de homepage van de website.',
  caption:
    'Van de lunch tot de laatste sangria. Swipe door een dag bij La Caleta: vanaf 11:00 lunch, op woensdag en donderdag tapasdag, vlees en vis van de grill en daarna een glas Rioja of onze eigen sangria.',
  cta: 'Bewaar dit bericht en reserveer via de link in bio.',
  tags: ['#lunch', '#tapas', '#sangria'],
};

export type Story = {
  file: string;
  title: string;
  alt: string;
  wanneer: string;
  actie: string;
};

export const stories: Story[] = [
  {
    file: 'story-01-open',
    title: 'Vandaag open',
    alt: 'Vandaag open, met openingstijden en gamba-tapas in een boog',
    wanneer: 'Op open dagen, in de ochtend',
    actie: 'Linksticker naar lacaleta.nl/reserveren',
  },
  {
    file: 'story-02-tapasdag',
    title: 'Tapasdag',
    alt: 'Tapasdag voor €34,50 per persoon, woensdag en donderdag',
    wanneer: 'Woensdag en donderdag',
    actie: 'Linksticker naar de reserveerpagina',
  },
  {
    file: 'story-03-grill',
    title: 'Van het vuur',
    alt: 'Vlammen boven een grill, met de tekst Van het vuur',
    wanneer: 'Vrijdag of zaterdag',
    actie: 'Vragensticker: welk vlees kiest u?',
  },
  {
    file: 'story-04-sfeer',
    title: 'Kaarslicht en geen haast',
    alt: 'Rode wijn wordt ingeschonken, met de tekst Kaarslicht, een glas Rioja en geen haast',
    wanneer: 'Zondag of in de avond',
    actie: 'Muzieksticker en een verwijzing naar de wijnkaart',
  },
  {
    file: 'story-05-verhaal',
    title: 'Ons verhaal',
    alt: 'De poort van La Caleta in Cádiz, met de tekst Van vader op dochter',
    wanneer: 'Eenmalig, bewaren als hoogtepunt',
    actie: 'Bewaren in het hoogtepunt Ons verhaal',
  },
  {
    file: 'story-06-cadeaubon',
    title: 'Cadeaubon',
    alt: 'Een etentje cadeau doen, met rozen en een kaars',
    wanneer: 'Rond verjaardagen en feestdagen',
    actie: 'Bel-sticker: 0181 - 214342',
  },
];

export const profile = {
  handle: 'lacaletarozenburg',
  name: 'Restaurant La Caleta',
  category: 'Spaans restaurant',
  bio: [
    'Cocina de España en tu mesa',
    'Tapas, grill, vis en paella',
    'Wo en do tapasdag. Gratis parkeren',
    'Raadhuisplein 4a, Rozenburg',
  ],
  link: 'lacaleta.nl',
  highlights: ['Menu', 'Tapas', 'Wijn', 'Ons verhaal', 'Reserveren'],
} as const;

type Slot = {
  dag: string;
  kanaal: 'Feed' | 'Carrousel' | 'Story';
  onderwerp: string;
  file?: string;
  nieuw?: boolean;
};
export const planning: { week: string; thema: string; doel: string; slots: Slot[] }[] = [
  {
    week: 'Week 1',
    thema: 'Kennismaken',
    doel: 'Het nieuwe gezicht van La Caleta neerzetten en het familieverhaal vertellen.',
    slots: [
      { dag: 'Woensdag', kanaal: 'Feed', onderwerp: 'Welkom', file: 'post-01-welkom' },
      { dag: 'Woensdag', kanaal: 'Story', onderwerp: 'Vandaag open', file: 'story-01-open' },
      { dag: 'Vrijdag', kanaal: 'Feed', onderwerp: 'Tapas om te delen', file: 'post-02-tapas' },
      { dag: 'Zondag', kanaal: 'Feed', onderwerp: 'Van vader op dochter', file: 'post-04-verhaal' },
      { dag: 'Zondag', kanaal: 'Story', onderwerp: 'Ons verhaal', file: 'story-05-verhaal' },
    ],
  },
  {
    week: 'Week 2',
    thema: 'Tapasdag',
    doel: 'Gasten laten wennen aan de vaste dagen en reserveringen op woensdag en donderdag stimuleren.',
    slots: [
      {
        dag: 'Dinsdag',
        kanaal: 'Feed',
        onderwerp: 'Tapasdag aankondigen',
        file: 'post-03-tapasdag',
      },
      { dag: 'Woensdag', kanaal: 'Story', onderwerp: 'Tapasdag', file: 'story-02-tapasdag' },
      {
        dag: 'Vrijdag',
        kanaal: 'Carrousel',
        onderwerp: 'Van de lunch tot de laatste sangria',
        file: 'carrousel-01',
      },
      {
        dag: 'Zaterdag',
        kanaal: 'Feed',
        onderwerp: 'Eigen foto van de zaterdagavond',
        nieuw: true,
      },
    ],
  },
  {
    week: 'Week 3',
    thema: 'De kaart',
    doel: 'De gerechten tonen waarvoor mensen komen: paella, grill en wijn.',
    slots: [
      { dag: 'Woensdag', kanaal: 'Feed', onderwerp: 'Paella', file: 'post-05-paella' },
      { dag: 'Vrijdag', kanaal: 'Feed', onderwerp: 'Rundvlees op +1 graad', file: 'post-06-grill' },
      { dag: 'Vrijdag', kanaal: 'Story', onderwerp: 'Van het vuur', file: 'story-03-grill' },
      {
        dag: 'Zondag',
        kanaal: 'Feed',
        onderwerp: 'Kaarslicht en geen haast',
        file: 'post-07-sfeer',
      },
      {
        dag: 'Zondag',
        kanaal: 'Story',
        onderwerp: 'Kaarslicht en geen haast',
        file: 'story-04-sfeer',
      },
    ],
  },
  {
    week: 'Week 4',
    thema: 'Uitnodigen',
    doel: 'Omzetten naar reserveringen, ook als cadeau.',
    slots: [
      {
        dag: 'Woensdag',
        kanaal: 'Feed',
        onderwerp: 'Alles uit de Spaanse keuken',
        file: 'post-08-collage',
      },
      { dag: 'Woensdag', kanaal: 'Story', onderwerp: 'Vandaag open', file: 'story-01-open' },
      {
        dag: 'Vrijdag',
        kanaal: 'Feed',
        onderwerp: 'Reserveer uw tafel',
        file: 'post-09-reserveren',
      },
      { dag: 'Vrijdag', kanaal: 'Story', onderwerp: 'Cadeaubon', file: 'story-06-cadeaubon' },
      {
        dag: 'Zondag',
        kanaal: 'Feed',
        onderwerp: 'Korte video van de paellapan, te filmen met het team',
        nieuw: true,
      },
    ],
  },
];

export const planningNotes = [
  'Drie tot vier feedberichten per week en één tot twee stories per open dag. De openingsdagen zijn woensdag tot en met zondag.',
  'Voorstel voor het tijdstip: tussen 16:00 en 18:00, voordat gasten kiezen waar ze eten. Na vier weken bijstellen op de eigen cijfers.',
  'Meten: bereik, bewaarde berichten, kliks op de link in bio en het aantal reserveringen dat via Instagram binnenkomt.',
  'Items met "nieuw" zijn nog niet gemaakt: het zijn eigen foto’s en video van het team, gemaakt in het restaurant.',
];

export const teBevestigenSocial = [
  {
    punt: 'Instagram-account',
    detail: 'De naam lacaletarozenburg komt uit het prospectdossier en is niet gecontroleerd.',
  },
  {
    punt: 'Prijzen',
    detail:
      'Tapasdag (€34,50) en het 12-uurtje (€14,50) staan op de kaartscans. De klant bevestigt dat ze nog kloppen.',
  },
  {
    punt: 'Familieverhaal',
    detail:
      'De site zegt 2024 voor de overdracht, het dossier december 2023. Er staan geen namen in de berichten, tot de familie toestemming geeft.',
  },
  {
    punt: 'Warme keuken',
    detail:
      'Het sluitingstijdstip van 21:30 staat op de tapaskaart en is niet op elke post gebruikt.',
  },
  {
    punt: 'Beeldmateriaal',
    detail:
      'Alle foodfoto’s en de sfeerbeelden zijn tijdelijke stockbeelden (Pexels-licentie). Voor de eerste echte post maakt het team eigen foto’s, in dezelfde opmaak.',
  },
] as const;
