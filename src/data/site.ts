// Bron van alle inhoud: de menukaartscans in src/assets/images/ (menu-kaart-*, tapas-kaart-*,
// lunch-*) en de huidige site lacaleta.nl, gecontroleerd op 11-11-2026.
// Alles in `teBevestigen` moet de klant nog bevestigen; de lijst staat ook in de README.

export const site = {
  name: 'La Caleta',
  legalName: 'Restaurant La Caleta',
  tagline: 'Cocina de España en tu mesa',
  description:
    'Restaurant La Caleta aan het Raadhuisplein in Rozenburg: Spaanse tapas, vlees van de grill, verse vis en paella. Woensdag en donderdag tapasdag.',
  url: 'https://www.lacaleta.nl',
  phone: '0181 - 214342',
  phoneHref: 'tel:+31181214342',
  email: 'info@lacaleta.nl',
  address: {
    street: 'Raadhuisplein 4a',
    postalCode: '3181 CG',
    city: 'Rozenburg',
    country: 'NL',
  },
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Raadhuisplein%204a%2C%203181%20CG%20Rozenburg',
  mapEmbedUrl:
    'https://www.openstreetmap.org/export/embed.html?bbox=4.245445%2C51.902438%2C4.253445%2C51.907772&layer=mapnik&marker=51.905105%2C4.2494451',
  // Uit het prospectdossier, nog niet gecontroleerd.
  social: {
    facebook: 'https://www.facebook.com/LaCaleta.nl',
    instagram: 'https://www.instagram.com/lacaletarozenburg',
    teBevestigen: true,
  },
} as const;

/** Feiten die op de site staan maar die de klant nog moet bevestigen. */
export const teBevestigen = [
  {
    punt: 'Jaar van de overdracht',
    opSite: '2024',
    bron: 'Welkomstkaart en lacaleta.nl zeggen 2024; het prospectdossier zegt december 2023 (Pepe naar Sabrina).',
  },
  {
    punt: 'Sinds 2007',
    opSite: '2007',
    bron: 'Afgeleid uit "na 17 jaar" overgedragen in 2024. Staat nergens letterlijk.',
  },
  {
    punt: 'Sluitingstijd',
    opSite: '22:00, warme keuken tot 21:30',
    bron: 'lacaleta.nl noemt alleen openingstijden. 21:30 staat op de tapaskaart.',
  },
  {
    punt: 'Prijzen',
    opSite: 'Alle prijzen van de kaartscans',
    bron: 'De datum van de scans is onbekend.',
  },
  {
    punt: 'Google-score',
    opSite: '4,4 uit 364 reviews (1 november 2026)',
    bron: 'Prospectdossier, gemeten op 1 november 2026. Bijwerken voor livegang.',
  },
  {
    punt: 'Social media',
    opSite: 'facebook.com/LaCaleta.nl, instagram.com/lacaletarozenburg',
    bron: 'Uit het prospectdossier, niet gecontroleerd.',
  },
] as const;

export const facts = {
  since: 2007,
  handover: 2024,
  yearsBeforeHandover: 17,
  tapasCount: 32,
  google: { rating: '4,4', reviews: 364, date: '1 november 2026' },
  award: {
    year: 2018,
    title: 'Verkiezing Leukste Restaurant 2018',
    detail: 'Winnaar gemeente Rotterdam met de hoogste waardering, en winnaar van de Gold Award.',
  },
} as const;

export type OpeningHour = {
  day: string;
  /** 0 = zondag … 6 = zaterdag, gelijk aan Date.getDay() */
  index: number;
  status: 'open' | 'closed';
  opens: string;
  closes: string;
};

export const openingHours: OpeningHour[] = [
  { day: 'Maandag', index: 1, status: 'closed', opens: '', closes: '' },
  { day: 'Dinsdag', index: 2, status: 'closed', opens: '', closes: '' },
  { day: 'Woensdag', index: 3, status: 'open', opens: '11:00', closes: '22:00' },
  { day: 'Donderdag', index: 4, status: 'open', opens: '11:00', closes: '22:00' },
  { day: 'Vrijdag', index: 5, status: 'open', opens: '11:00', closes: '22:00' },
  { day: 'Zaterdag', index: 6, status: 'open', opens: '11:00', closes: '22:00' },
  { day: 'Zondag', index: 0, status: 'open', opens: '16:00', closes: '22:00' },
];

/** Warme keuken sluit om 21:30 (tapaskaart); het laatste reserveringsslot ligt een half uur eerder. */
export const reservation = {
  kitchenCloses: '21:30',
  lastSlotOffset: 30,
  slotStep: 30,
  maxGuests: 12,
} as const;

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/menu/', label: 'Menu' },
  { href: '/tapas/', label: 'Tapas' },
  { href: '/over-ons/', label: 'Over ons' },
  { href: '/acties/', label: 'Acties' },
  { href: '/contact/', label: 'Contact' },
  { href: '/reserveren/', label: 'Reserveren' },
] as const;

export type DishTag = 'vegetarian' | 'fish' | 'meat' | 'chicken';

export type Dish = {
  name: string;
  description?: string;
  price?: string;
  tags?: DishTag[];
};

export const tagLabels: Record<DishTag, string> = {
  vegetarian: 'Vegetarisch',
  fish: 'Vis',
  meat: 'Vlees',
  chicken: 'Kip',
};

// Lunch (lunch-12uurtje, lunch-baguettes, lunch-salades)
export const twaalfUurtje = {
  price: '€14,50',
  body: "Kopje soep, 2 boterhammen, kroket, boter, mosterd, gebakken ei en een glaasje melk of verse jus d'orange.",
} as const;

export const lunch: Dish[] = [
  { name: 'Soep van de dag', description: 'Met brood', price: '€8,00', tags: ['vegetarian'] },
  { name: 'Griekse yoghurt met granola en honing', price: '€7,50', tags: ['vegetarian'] },
  { name: 'Baguette kaas', price: '€5,50', tags: ['vegetarian'] },
  { name: 'Baguette gezond', price: '€8,00' },
  { name: 'Baguette serranoham', price: '€8,00', tags: ['meat'] },
  { name: 'Baguette gekookt ei', price: '€5,00', tags: ['vegetarian'] },
  { name: 'Baguette frikandel speciaal', price: '€7,00', tags: ['meat'] },
  {
    name: 'Baguette brie uit de oven',
    description: 'Met honing en walnoten',
    price: '€10,50',
    tags: ['vegetarian'],
  },
  { name: 'Uitsmijter kaas', price: '€9,00', tags: ['vegetarian'] },
  { name: 'Uitsmijter ham kaas', price: '€10,25', tags: ['meat'] },
  {
    name: 'Broodje Don Pepe',
    description: 'Lunchtip: huisgemaakte carpaccio à la Pepe',
    price: '€14,50',
    tags: ['meat'],
  },
  {
    name: 'Burrito gehakt',
    description: 'Gevuld met gehakt en kruiden',
    price: '€10,00',
    tags: ['meat'],
  },
  {
    name: 'Burrito vegetal',
    description: 'Gevuld met groenten en kruiden',
    price: '€10,00',
    tags: ['vegetarian'],
  },
  {
    name: 'Pan de barra con fajita de pollo',
    description: 'Baguette met gebakken kipreepjes, paprika en ui in chilisaus',
    price: '€12,50',
    tags: ['chicken'],
  },
  {
    name: 'Pan vegetales',
    description: 'Baguette met vegetarische reepjes, paprika, ui en chilisaus',
    price: '€12,50',
    tags: ['vegetarian'],
  },
  { name: '2 boterhammen met rundvleeskroket of frikandel', price: '€10,00', tags: ['meat'] },
  {
    name: 'Broodje luxe hamburger',
    description:
      'Angus burger met sla, tomaat, augurk, kaas, gebakken ei, gebakken ui, saus, patatjes en mayonaise',
    price: '€17,50',
    tags: ['meat'],
  },
  { name: 'Tosti kaas', price: '€5,00', tags: ['vegetarian'] },
  { name: 'Tosti ham kaas', price: '€7,00', tags: ['meat'] },
  {
    name: 'Tosti vega',
    description: 'Mozzarella met zongedroogde tomaatjes, basilicum en pesto',
    price: '€8,00',
    tags: ['vegetarian'],
  },
];

export const salads: Dish[] = [
  {
    name: 'Ensalada de Caleta',
    description: 'Salade met gebakken ossenhaas, met brood',
    price: '€14,50',
    tags: ['meat'],
  },
  {
    name: 'Ensalada de atún',
    description: 'Salade met tonijn, met brood',
    price: '€14,50',
    tags: ['fish'],
  },
  { name: 'Ensalada natural', price: '€11,50', tags: ['vegetarian'] },
  {
    name: 'Ensalada de pollo',
    description: 'Salade met gebakken kipreepjes, met brood',
    price: '€14,50',
    tags: ['chicken'],
  },
  {
    name: 'Ensalada de gambas',
    description: 'Salade met garnalen, met brood',
    price: '€15,50',
    tags: ['fish'],
  },
  {
    name: 'Lunchplank Española',
    description:
      'Voor 2 personen. Chorizo, salchichón, manchego, vijgenjam, olijven, galapeños, albóndigas, kruidenboter, tapenade, tortilla en brood',
    price: '€25,00',
    tags: ['meat'],
  },
  {
    name: 'Lunchplank Vegetal',
    description:
      'Voor 2 personen. Kruidenboter, tapenade, auberginesalade, gebakken paprika, olijven, cherrytomaatjes, galapeños, bladerdeeg met feta, zoete-aardappelfrietjes en brood',
    price: '€25,00',
    tags: ['vegetarian'],
  },
];

// Entremeses (menu-kaart-05)
export const starters: Dish[] = [
  { name: 'Soep van de dag', description: 'Vraag de bediening', price: '€8', tags: ['vegetarian'] },
  {
    name: 'Tostada',
    description: '4 stuks: zalm, tonijn, ham en chorizo',
    price: '€14',
    tags: ['fish', 'meat'],
  },
  {
    name: 'Stokbrood met kruidenboter, tapenade en olijven',
    description: 'Broodmandje met kruidenboter, tapenade en olijven',
    price: '€8',
    tags: ['vegetarian'],
  },
  {
    name: 'Paleta española',
    description: 'Een plankje met diverse soorten Spaanse worst, kaas en olijven',
    price: '€16',
    tags: ['meat'],
  },
  {
    name: 'Plato de jamón serrano con melón',
    description: 'Serranoham met meloen',
    price: '€9',
    tags: ['meat'],
  },
  { name: 'Aceitunas', description: 'Olijven', price: '€7', tags: ['vegetarian'] },
  {
    name: 'Carpaccio La Caleta',
    description: 'Vers gesneden carpaccio van ossenhaas',
    price: '€16',
    tags: ['meat'],
  },
  {
    name: 'Ensaladilla de atún',
    description: 'Frisse Spaanse tonijnsalade',
    price: '€14',
    tags: ['fish'],
  },
  {
    name: "Gamba's al ajillo",
    description: 'Garnalen in knoflookolie',
    price: '€14',
    tags: ['fish'],
  },
  {
    name: "Gamba's a la plancha",
    description: 'Garnalen van de grill',
    price: '€20',
    tags: ['fish'],
  },
  { name: 'Calamares fritos', description: 'Gebakken inktvisringen', price: '€14', tags: ['fish'] },
  {
    name: 'Albóndigas en salsa de tomate con pan',
    description: 'Gehaktballetjes in tomatensaus met brood',
    price: '€11',
    tags: ['meat'],
  },
  {
    name: 'Albóndigas vegetariana con pan',
    description: 'Vegetarische balletjes in tomatensaus met brood',
    price: '€11',
    tags: ['vegetarian'],
  },
];

// Tapas à la carte (menu-kaart-10 en -11)
export const tapasPriced: Dish[] = [
  {
    name: 'Albóndigas en salsa de tomate con pan',
    description: 'Gehaktballetjes in tomatensaus met brood',
    price: '€11',
    tags: ['meat'],
  },
  {
    name: 'Albóndigas vegetariana',
    description: 'Vegetarische balletjes in tomatensaus met brood',
    price: '€11',
    tags: ['vegetarian'],
  },
  {
    name: 'Tortilla española',
    description: 'Spaanse omelet met aardappel en ui',
    price: '€9',
    tags: ['vegetarian'],
  },
  {
    name: 'Longaniza ibérica',
    description: 'Licht pittige ibérico-worstjes met paprika en ui',
    price: '€12',
    tags: ['meat'],
  },
  {
    name: 'Lomo ibérico al ajillo',
    description: 'Iberische varkensfilet',
    price: '€9',
    tags: ['meat'],
  },
  { name: 'Calamares fritos', description: 'Gebakken inktvisringen', price: '€14', tags: ['fish'] },
  {
    name: 'Ensaladilla de atún',
    description: 'Frisse Spaanse tonijnsalade',
    price: '€14',
    tags: ['fish'],
  },
  {
    name: 'Mejillones empanado',
    description: 'Schaaltje gepaneerde mosselen',
    price: '€10',
    tags: ['fish'],
  },
  {
    name: 'Gambas al ajillo',
    description: 'Garnalen in knoflookolie',
    price: '€14',
    tags: ['fish'],
  },
  {
    name: 'Patatas fritas / bravas',
    description: 'Frietjes klein, middel of groot',
    price: '€6 / €8 / €10',
    tags: ['vegetarian'],
  },
  { name: 'Boniato frito', description: 'Zoete-aardappelfriet', price: '€9', tags: ['vegetarian'] },
  {
    name: 'Ensalada',
    description: 'Salade met honing-mosterdsaus',
    price: '€7',
    tags: ['vegetarian'],
  },
  {
    name: 'Galapeños',
    description: 'Spaanse snack met pikante paprika en kaasvulling',
    price: '€9',
    tags: ['vegetarian'],
  },
  { name: 'Media costilla', description: 'Halve sparerib', price: '€15', tags: ['meat'] },
  {
    name: 'Pollo empanado',
    description: '3 gepaneerde kipstukjes',
    price: '€10',
    tags: ['chicken'],
  },
];

// Tapasdag, all you can eat (tapas-kaart-1): 32 genummerde tapas
export const tapasCold: Dish[] = [
  {
    name: 'Pan de barra con mantequilla, ajo y hierbas',
    description: 'Stokbrood met kruidenboter',
    tags: ['vegetarian'],
  },
  { name: 'Aceitunas', description: 'Olijven', tags: ['vegetarian'] },
  {
    name: 'Queso de manchego con compote de higo',
    description: 'Manchegokaas met vijgencompote',
    tags: ['vegetarian'],
  },
  { name: 'Melón con jamón serrano', description: 'Meloen met serranoham', tags: ['meat'] },
  { name: 'Embutidos mediterráneo', description: 'Spaanse worsten', tags: ['meat'] },
  { name: 'Carpaccio', description: 'Huisgemaakte carpaccio', tags: ['meat'] },
  { name: 'Salmón ahumado', description: 'Gerookte zalm met roomkaas', tags: ['fish'] },
  { name: 'Ensalada de pollo', description: 'Kip en walnoot, lekker romig', tags: ['chicken'] },
];

export const tapasWarm: Dish[] = [
  { name: 'Pollo empanado', description: 'Gemarineerde kip', tags: ['chicken'] },
  {
    name: 'Empanadillita de pollo',
    description: 'Bladerdeeg gevuld met kip en groenten',
    tags: ['chicken'],
  },
  { name: 'Palito solomillo', description: 'Ossenhaaspuntjes op een spiesje', tags: ['meat'] },
  {
    name: 'Albóndigas en salsa de tomate',
    description: 'Spaanse gehaktballetjes in tomatensaus',
    tags: ['meat'],
  },
  { name: 'Longaniza', description: 'Spaans chorizoworstje, gebakken', tags: ['meat'] },
  { name: 'Croquetica de chorizo', description: 'Chorizokroketje', tags: ['meat'] },
  { name: 'Lomo ibérico ajillo', description: 'Varkenslapje', tags: ['meat'] },
  { name: 'Costillas', description: 'Sparerib', tags: ['meat'] },
  { name: 'Calamares empanado', description: 'Inktvisringen', tags: ['fish'] },
  { name: 'Mejillones empanado', description: 'Gebakken mosselen', tags: ['fish'] },
  { name: 'Gambas al ajillo', description: 'Garnalen in knoflook', tags: ['fish'] },
  { name: 'Gambas empanadas', description: 'Gepaneerde gamba’s', tags: ['fish'] },
  {
    name: 'Albóndigas de verduras',
    description: 'Vegetarische balletjes in een sausje',
    tags: ['vegetarian'],
  },
  { name: 'Tortilla', description: 'Ei met aardappel, gebakken', tags: ['vegetarian'] },
  { name: 'Patatas bravas', description: 'Spaanse patatjes', tags: ['vegetarian'] },
  { name: 'Boniato frito', description: 'Zoete-aardappelfriet', tags: ['vegetarian'] },
  { name: 'Paella', tags: ['vegetarian'] },
  { name: 'Anillas de cebolla', description: 'Uienringen', tags: ['vegetarian'] },
  { name: 'Pinchito de mozzarella', description: 'Mozzarellastick', tags: ['vegetarian'] },
  { name: 'Galapeños', description: 'Gefrituurde peper met kaas', tags: ['vegetarian'] },
  {
    name: 'Berenjenas fritas con miel',
    description: 'Gefrituurde aubergine met stroop',
    tags: ['vegetarian'],
  },
  { name: 'Mini mazorca de maíz al horno', description: 'Maïskolf', tags: ['vegetarian'] },
  { name: 'Pimiento frito', description: 'Gebakken puntpaprika', tags: ['vegetarian'] },
  { name: 'Nachos con queso', description: 'Nachos met kaas', tags: ['vegetarian'] },
];

export const tapasDay = {
  price: '€34,50',
  days: 'Woensdag en donderdag',
  dayIndexes: [3, 4],
  walkIn: { from: '17:00', until: '20:00' },
  rules: [
    'Inloop tussen 17:00 en 20:00 uur; de warme keuken sluit om 21:30 uur.',
    'Reserveren aanbevolen, zodat de keuken kan voorbereiden.',
    'Maximaal 2 tapas per persoon per ronde.',
    'Te veel besteld? Dan rekenen wij €2,50 per tapa, als uw ogen groter waren dan uw maag.',
    'Desserts en drank zijn niet inbegrepen.',
    'Wij serveren geen kraanwater.',
    'Voor groepen hebben wij een speciaal menu; vraag naar de mogelijkheden.',
  ],
} as const;

export const ninosTapas = {
  age: '3 tot 10 jaar',
  price: '€15,50',
  items: ['Kipnuggets', 'Bitterballetjes', 'Frikandel', 'Kroket en patatjes', 'Sparerib'],
} as const;

export const sangria: Dish[] = [
  { name: 'Karaf sangria, 1 liter', price: '€29' },
  { name: 'Sangria rood, per glas', price: '€6,50' },
  { name: 'Sangria wit, per glas', price: '€6,50' },
  { name: 'Fles huisgemaakte sangria voor thuis', price: '€29' },
];

// Vlees van de grill (menu-kaart-07)
export const grill: Dish[] = [
  {
    name: 'Lomo',
    description: 'Ossenhaas, 225, 350 of 450 gram',
    price: '€35 / €37 / €39',
    tags: ['meat'],
  },
  {
    name: 'Quadril',
    description: 'Runderkogelbiefstuk, 225, 350 of 450 gram',
    price: '€27 / €30 / €35',
    tags: ['meat'],
  },
  {
    name: 'Entrecote gaditano',
    description: 'Entrecote, 225, 350 of 450 gram',
    price: '€28 / €30 / €34',
    tags: ['meat'],
  },
  {
    name: 'Entrecote pimentado',
    description: 'Pepersteak, 350 gram',
    price: '€34',
    tags: ['meat'],
  },
  {
    name: 'Bife de ancho',
    description: 'Ribeye, 225, 350 of 450 gram',
    price: '€27 / €29 / €34',
    tags: ['meat'],
  },
  { name: 'Chuletón', description: 'T-bonesteak, circa 400 gram', price: '€32', tags: ['meat'] },
  {
    name: 'Fajita de carne',
    description:
      'Circa 225 gram. Mexicaans vleesgerecht met paprika, ui, cherrytomaat en piri piri',
    price: '€28',
    tags: ['meat'],
  },
  {
    name: 'Trio Caleta',
    description: 'Drie soorten vlees, samen ± 300 gram',
    price: '€33',
    tags: ['meat'],
  },
  { name: 'Carne de oveja', description: 'Lamskoteletjes', price: '€32', tags: ['meat'] },
  { name: 'Costillas', description: 'Spareribs, heel rack', price: '€28', tags: ['meat'] },
  {
    name: 'Filete ibérico',
    description: 'Pata negra, Frans bergvarken',
    price: '€27',
    tags: ['meat'],
  },
  {
    name: 'Lomo ibérico',
    description: 'Pata negra, Iberische varkenshaas',
    price: '€29',
    tags: ['meat'],
  },
  {
    name: 'Le Capelin',
    description: 'Pata negra, Frans bergvarken',
    price: '€28',
    tags: ['meat'],
  },
  {
    name: 'Fajita de pollo',
    description: 'Gegrilde kip met paprika, ui, cherrytomaat en piri piri',
    price: '€28',
    tags: ['chicken'],
  },
];

export const mainsNote =
  'Alle hoofdgerechten met friet of pofaardappel, salade en sauzen. Extra fajita of filete ibérico: €8 per 100 gr.';

// Vis en vegetarisch (menu-kaart-08)
export const fish: Dish[] = [
  { name: 'Tuna a la plancha', description: 'Tonijn van de grill', price: '€28', tags: ['fish'] },
  { name: 'Salmón a la plancha', description: 'Zalm van de grill', price: '€32', tags: ['fish'] },
  {
    name: "Gamba's a la plancha",
    description: '6 garnalen (16/20) met frietjes en sauzen',
    price: '€32',
    tags: ['fish'],
  },
  {
    name: 'Frito gaditano',
    description: 'Diverse soorten gefrituurde en gegrilde vis',
    price: '€32',
    tags: ['fish'],
  },
  {
    name: 'Albóndigas vegetariana en salsa de tomate',
    description: 'Vegetarische balletjes in tomatensaus met frietjes en salade',
    price: '€30',
    tags: ['vegetarian'],
  },
  {
    name: 'Fajita vegetariana',
    description: 'Gebakken vegetarische reepjes met paprika, ui, cherrytomaat en piri piri',
    price: '€32',
    tags: ['vegetarian'],
  },
];

// Paella (menu-kaart-09)
export const paella: Dish[] = [
  {
    name: 'Paella de marisco',
    description: 'Vispaella voor 2 personen',
    price: '€49',
    tags: ['fish'],
  },
  {
    name: 'Paella de carne',
    description: 'Vleespaella voor 2 personen',
    price: '€45',
    tags: ['meat'],
  },
  {
    name: 'Vegetarische paella',
    description: 'Voor 1 persoon',
    price: '€38',
    tags: ['vegetarian'],
  },
];

export const paellaNote =
  'Paella graag vooraf bestellen: hij wordt vers bereid in 40 tot 50 minuten en is op drukke dagen niet ter plekke te bestellen.';

// Kindermenu van de hoofdkaart (menu-kaart-09), t/m 12 jaar
export const ninos: Dish[] = [
  { name: 'Langejan', description: 'Frikandel met friet', price: '€11', tags: ['meat'] },
  { name: 'Halve sparerib', description: 'Met friet', price: '€18', tags: ['meat'] },
  { name: 'Chicken little', description: 'Kipnuggets met friet', price: '€11', tags: ['chicken'] },
  { name: 'Popey', description: 'Biefstuk met friet', price: '€16', tags: ['meat'] },
];

// Dessert en ijs (menu-kaart-12 en -13)
export const desserts: Dish[] = [
  {
    name: 'Leche frita',
    description: 'Ambachtelijk gebakken melk met een bolletje ijs en slagroom',
    price: '€11',
    tags: ['vegetarian'],
  },
  {
    name: 'Churros',
    description: 'Met een bolletje chocolade-ijs, slagroom, chocoladesaus en suiker',
    price: '€10',
    tags: ['vegetarian'],
  },
  {
    name: 'Milkshake van Licor 43 of Baileys',
    description: 'Verse milkshake met een toef slagroom',
    price: '€10',
    tags: ['vegetarian'],
  },
  { name: 'Milkshake chocola, aardbei of pistache', price: '€9', tags: ['vegetarian'] },
  { name: 'Advocaat met slagroom', price: '€9', tags: ['vegetarian'] },
  { name: 'IJskoffie', description: 'Huisgemaakt', price: '€7', tags: ['vegetarian'] },
  {
    name: 'Helado de Baileys',
    description: '2 bolletjes vanille, 1 chocolade, Baileys-saus en slagroom',
    price: '€10',
    tags: ['vegetarian'],
  },
  {
    name: 'Helado Caleta',
    description: '2 bolletjes karamel, 1 vanille, saus van Cuarenta y Tres en slagroom',
    price: '€10',
    tags: ['vegetarian'],
  },
  {
    name: 'Helado holandés',
    description: '3 bolletjes vanille met advocaat, chocoladesaus en slagroom',
    price: '€10',
    tags: ['vegetarian'],
  },
  {
    name: 'Kolonel ijs',
    description: '2 bolletjes citroen met een scheutje wodka',
    price: '€10',
    tags: ['vegetarian'],
  },
  {
    name: 'Helado de fresa y vainilla',
    description: 'Aardbei en vanille met aardbeiensaus en slagroom',
    price: '€8',
    tags: ['vegetarian'],
  },
  {
    name: 'Helado de chocolate y vainilla',
    description: 'Chocolade en vanille met chocoladesaus en slagroom',
    price: '€8',
    tags: ['vegetarian'],
  },
  {
    name: 'Helado de pistacho y vainilla',
    description: 'Pistache en vanille met slagroom',
    price: '€8',
    tags: ['vegetarian'],
  },
];

export const coffees: Dish[] = [
  { name: 'Irish coffee', description: 'Met whiskey', price: '€9' },
  { name: 'Spanish coffee', description: 'Met Tia Maria', price: '€9' },
  { name: 'French coffee', description: 'Met Grand Marnier', price: '€9' },
  { name: 'Paris coffee', description: 'Met Cointreau', price: '€9' },
  { name: 'Italian coffee', description: 'Met Amaretto', price: '€9' },
  { name: 'DOM coffee', description: 'Met Dom Bénédictine', price: '€9' },
  { name: 'Drambuie coffee', description: 'Met Drambuie', price: '€9' },
  { name: 'Caleta coffee', description: 'Met Licor 43', price: '€9' },
  { name: 'Carajillo', description: 'Met Spaanse brandy', price: '€9' },
];

export const coffeeNote = 'Al onze koffie en variaties zijn ook cafeïnevrij te krijgen.';

// Wijnkaart (menu-kaart-14)
export const wines: Dish[] = [
  {
    name: 'Montelciego Crianza',
    description: 'Stevig, Tempranillo, Rioja. Bij lamsvlees.',
    price: '€22',
  },
  {
    name: 'Muriel Crianza',
    description: 'Zacht, Tempranillo, Rioja. Bij gegrild vlees.',
    price: '€21',
  },
  {
    name: 'Montelciego Reserva',
    description: 'Vol en stevig, Tempranillo, Rioja. Bij gegrild vlees.',
    price: '€28',
  },
  {
    name: 'Muriel Reserva',
    description: 'Stevig, Tempranillo, Rioja. Bij stevig gegrild vlees.',
    price: '€25,50',
  },
  {
    name: 'Montelciego Gran Reserva',
    description: 'Vol en stevig, Tempranillo, Rioja. Bij gegrild vlees.',
    price: '€32',
  },
  {
    name: 'Muriel Gran Reserva',
    description: 'Stevig, Tempranillo, Rioja. Bij rood vlees.',
    price: '€31',
  },
  {
    name: 'Marqués de Cáceres Crianza',
    description: 'Stevig rood, Tempranillo, Rioja. Bij paella.',
    price: '€32,50',
  },
  {
    name: 'Sol de Málaga',
    description: 'Zoet of halfzoet, Moscatel, Málaga. Bij het dessert.',
    price: '€29, glas €4,50',
  },
  {
    name: 'Bernkasteler',
    description: 'Zoet of halfzoet, Riesling, Rheinhessen. Bij het dessert.',
    price: '€25, glas €4,50',
  },
  {
    name: 'Karaf huisgemaakte sangria',
    description: 'Rood of wit, fris en fruitig. Bij tapas.',
    price: '€29, glas €6,50',
  },
];

// Groepen, afhuren, dieet en cadeaubon (menu-kaart-04); VVV-cadeaukaart (lacaleta.nl)
export const services = [
  {
    id: 'groepen',
    title: 'Groepen',
    body: 'Iets te vieren met een grote groep? We stemmen een arrangement af op uw wensen, zodat uw gasten niets tekortkomen.',
  },
  {
    id: 'afhuren',
    title: 'Afhuren',
    body: 'Het hele restaurant of een gedeelte afhuren kan ook. Dat bespreken we graag persoonlijk.',
  },
  {
    id: 'dieet',
    title: 'Speciaal dieet',
    body: 'Allergie of een speciaal dieet? Geef het door, dan zoeken we samen gerechten die u wel mag eten.',
  },
  {
    id: 'cadeaubon',
    title: 'Cadeaubon',
    body: 'Iemand verrassen met een etentje? Een cadeaubon van La Caleta kan met een bedrag naar keuze. Ook de VVV-cadeaukaart is welkom.',
  },
] as const;

// Seniorenmenu (lacaleta.nl/acties)
export const seniorMenu = {
  price: '€28,50',
  courses: [
    { label: 'Vooraf', value: 'Soep van de dag' },
    {
      label: 'Hoofdgerecht',
      value: 'Lomo (ossenhaas), quadril (biefstuk) of 3 grote garnalen van de grill',
    },
    { label: 'Na', value: 'Koffie of thee, of een bolletje ijs met slagroom' },
  ],
  note: 'Het hoofdgerecht komt met friet of gepofte aardappel, salade en sauzen.',
} as const;

export const restaurantJsonLd = (baseUrl: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: site.legalName,
  description: site.description,
  url: baseUrl,
  telephone: '+31181214342',
  email: site.email,
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  servesCuisine: ['Spaans', 'Tapas', 'Grill'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  // Relatief pad: een leidende slash zou het basispad /la-caleta/ wegsnijden.
  hasMenu: new URL('menu/', baseUrl).toString(),
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '22:00',
    },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '16:00', closes: '22:00' },
  ],
  acceptsReservations: 'True',
  sameAs: [site.social.facebook, site.social.instagram],
});
