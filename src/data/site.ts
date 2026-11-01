export const site = {
  name: 'La Caleta',
  legalName: 'Restaurant La Caleta',
  tagline: 'Cocina de España en tu mesa',
  description:
    'Restaurant La Caleta in Rozenburg: Spaanse tapas, grill en verse vis. Gezellige sfeer, al sinds 2007 in het hart van Rozenburg.',
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
  mapsQuery: 'Raadhuisplein 4a, 3181 CG Rozenburg',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Raadhuisplein%204a%2C%203181%20CG%20Rozenburg',
  social: {
    facebook: 'https://www.facebook.com/',
    instagram: 'https://www.instagram.com/',
  },
} as const;

export type OpeningHour = {
  day: string;
  /** 0 = zondag … 6 = zaterdag, voor de "vandaag geopend"-indicator */
  index: number;
  status: 'open' | 'closed';
  opens: string;
  closes: string;
};

export const openingHours: OpeningHour[] = [
  { day: 'Maandag', index: 1, status: 'closed', opens: '', closes: 'Gesloten' },
  { day: 'Dinsdag', index: 2, status: 'closed', opens: '', closes: 'Gesloten' },
  { day: 'Woensdag', index: 3, status: 'open', opens: '11:00', closes: '22:00' },
  { day: 'Donderdag', index: 4, status: 'open', opens: '11:00', closes: '22:00' },
  { day: 'Vrijdag', index: 5, status: 'open', opens: '11:00', closes: '22:00' },
  { day: 'Zaterdag', index: 6, status: 'open', opens: '11:00', closes: '22:00' },
  { day: 'Zondag', index: 0, status: 'open', opens: '16:00', closes: '22:00' },
];

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/menu/', label: 'Menu' },
  { href: '/tapas/', label: 'Tapas' },
  { href: '/over-ons/', label: 'Over ons' },
  { href: '/acties/', label: 'Acties' },
  { href: '/contact/', label: 'Contact' },
] as const;

export type Dish = {
  name: string;
  description?: string;
  price?: string;
  tags?: ('vegetarian' | 'fish' | 'meat' | 'chicken')[];
};

/** Volledige tapas kaart, zoals op de menukaart van het restaurant. */
export const tapasCold: Dish[] = [
  { name: 'Pan de barra', description: 'Steekbrood met knoflookboter en kruiden' },
  { name: 'Aceitunas', description: 'Olijven', tags: ['vegetarian'] },
  { name: 'Queso de manchego con compote de higo', description: 'Manchegokaas met vijgencompôte', tags: ['vegetarian'] },
  { name: 'Mejillones con jamón serrano', description: 'Mosselen met serranoham', tags: ['fish'] },
  { name: 'Embutidos mediterraneo', description: 'Spaanse worsten', tags: ['meat'] },
  { name: 'Carpaccio', description: 'Huisgemakte carpaccio' },
  { name: 'Salmón ahumado', description: 'Gerookte zalm met roomkaas', tags: ['fish'] },
  { name: 'Ensalada de pollo', description: 'Kip met walnoten en sikker dressing', tags: ['chicken'] },
];

export const tapasWarm: Dish[] = [
  { name: 'Pollo empanado', description: 'Gepaneerde kipreepjes', tags: ['chicken'] },
  { name: 'Empanadilla de pollo', description: 'Bladerdeeg gevuld met kip en groenten', tags: ['chicken'] },
  { name: 'Palito solomillo', description: 'Ossenhaaspuntjes aan de spies', tags: ['meat'] },
  { name: 'Albóndigas en salsa de tomate', description: 'Spaanse gehaktballetjes in tomatensaus', tags: ['meat'] },
  { name: 'Longaniza', description: 'Spaans chorizoworstje gebraden', tags: ['meat'] },
  { name: 'Croqueta de chorizo', description: 'Chorizokroket', tags: ['meat'] },
  { name: 'Lomo ibérico al ajillo', description: 'Iberisch varkenshaasje', tags: ['meat'] },
  { name: 'Costillas', description: 'Spareribs', tags: ['meat'] },
  { name: 'Calamares empanado', description: 'Inktvisringen', tags: ['fish'] },
  { name: 'Mejillones empanado', description: 'Gebakken mosselen', tags: ['fish'] },
  { name: 'Gambas al ajillo', description: 'Garnalen in knoflookolie', tags: ['fish'] },
  { name: 'Gambas empanadas', description: 'Gepaneerde garnalen', tags: ['fish'] },
  { name: 'Albóndigas de verduras', description: 'Vegetarische balletjes in een sausje', tags: ['vegetarian'] },
  { name: 'Tortilla', description: 'Ei met aardappel gebakken', tags: ['vegetarian'] },
  { name: 'Patatas bravas', description: 'Spaanse patatjes', tags: ['vegetarian'] },
  { name: 'Boniato frito', description: 'Zoete aardappelfriet', tags: ['vegetarian'] },
  { name: 'Paella', description: 'Pannenkoek', tags: ['vegetarian'] },
  { name: 'Anillas de cebolla', description: 'Uienringen', tags: ['vegetarian'] },
  { name: 'Pinchito de mozzarella', description: 'Mozzarellasticks', tags: ['vegetarian'] },
  { name: 'Galapitos', description: 'Gefrituurde kip met kaas', tags: ['chicken'] },
  { name: 'Berenjenas fritas con miel', description: 'Gefrituurde aubergine met stroop', tags: ['vegetarian'] },
  { name: 'Maíz al horno', description: 'Gebakken maiskolfje', tags: ['vegetarian'] },
  { name: 'Pimiento frito', description: 'Gebakken paprika', tags: ['vegetarian'] },
  { name: 'Nachos con queso', description: 'Nachos met kaas', tags: ['vegetarian'] },
];

/** Tapas met losse prijzen, zoals op de menukaart. */
export const tapasPriced: Dish[] = [
  { name: 'Albóndigas en salsa de tomate con pan', description: 'Gehaktballetjes in tomatensaus met brood', price: '€11', tags: ['meat'] },
  { name: 'Albóndigas vegetariana', description: 'Vegetarische gehaktballetjes in tomatensaus', price: '€11', tags: ['vegetarian'] },
  { name: 'Tortilla española', description: 'Spaanse omelet met aardappel en ui', price: '€9', tags: ['vegetarian'] },
  { name: 'Longaniza ibérica', description: 'Licht pittige worst met paprika en ui', price: '€12', tags: ['meat'] },
  { name: 'Lomo ibérico al ajillo', description: 'Iberisch varkensfillet', price: '€9', tags: ['meat'] },
  { name: 'Calamares fritos', description: 'Gebakken inktvisringen', price: '€14', tags: ['fish'] },
  { name: 'Ensaladilla de atún', description: 'Verse Spaanse tonijnsalade', price: '€14', tags: ['fish'] },
  { name: 'Mejillones empanado', description: 'Gebakken mosselen', price: '€10', tags: ['fish'] },
  { name: 'Gambas al ajillo', description: 'Garnalen in knoflookolie', price: '€14', tags: ['fish'] },
  { name: 'Patatas fritas / bravas', description: 'Frietjes klein, middel, groot', price: '€6 / €8 / €10', tags: ['vegetarian'] },
  { name: 'Boniato frito', description: 'Zoete aardappelfriet', price: '€9', tags: ['vegetarian'] },
  { name: 'Ensalada', description: 'Salade met honing-mosterdsaus', price: '€7', tags: ['vegetarian'] },
];

export const starters: Dish[] = [
  { name: 'Soep van de dag', description: 'Vraag de bediening naar de watersoep', price: '€8', tags: ['vegetarian'] },
  { name: 'Tostada', description: '4 stukken · zalm, tonijn, ham, chorizo', price: '€14' },
  { name: 'Stokbrood met kruidenboter', description: 'Bakketen en olijven', price: '€8', tags: ['vegetarian'] },
  { name: 'Paleta española', description: 'Diverse Spaanse worst, kaas en olijven', price: '€16' },
  { name: 'Plato de jamón serrano con melón', description: 'Serranoham met meloen', price: '€9', tags: ['meat'] },
  { name: 'Aceitunas', description: 'Olijven', price: '€7', tags: ['vegetarian'] },
  { name: 'Carpaccio La Caleta', description: 'Verse gesneden carpaccio van runderhaas', price: '€16' },
  { name: 'Ensaladilla de atún', description: 'Verse tonijnsalade', price: '€14', tags: ['fish'] },
  { name: "Gamba's al ajillo", description: 'Garnalen in knoflookolie', price: '€14', tags: ['fish'] },
  { name: "Gamba's a la plancha", description: 'Garnalen van de grill', price: '€20', tags: ['fish'] },
  { name: 'Calamares fritos', description: 'Gebakken inktvisringen', price: '€14', tags: ['fish'] },
  { name: 'Albóndigas en salsa de tomate con pan', description: 'Gehaktballetjes in tomatensaus met brood', price: '€11', tags: ['meat'] },
  { name: 'Albóndigas vegetarianas con pan', description: 'Vegetarische gehaktballetjes met brood', price: '€11', tags: ['vegetarian'] },
];

export const meatFromTheGrill: Dish[] = [
  { name: 'Lomo', description: 'Ossenhaas · 225 gr / 350 gr / 450 gr', price: '€35 / €37 / €39', tags: ['meat'] },
  { name: 'Quadrill', description: 'Runderbiefstuk · 225 gr / 350 gr / 450 gr', price: '€27 / €30 / €35', tags: ['meat'] },
  { name: 'Entrecote gaditano', description: 'Entrecote · 225 gr / 350 gr / 450 gr', price: '€28 / €30 / €34', tags: ['meat'] },
  { name: 'Entrecote pimentado', description: 'Peppersteak', price: '€34', tags: ['meat'] },
  { name: 'Bife de ancho', description: 'Rundvlees · 225 gr / 350 gr / 450 gr', price: '€27 / €29 / €34', tags: ['meat'] },
  { name: 'Chuleton', description: 'T-bone steak', price: '€32', tags: ['meat'] },
  { name: 'Fajita de carne', description: 'Met paprika, ui, cherrytomaat en piri piri', price: '€28', tags: ['meat'] },
  { name: 'Trio Caleta', description: 'Drie soorten vlees · ± 300 gr', price: '€33', tags: ['meat'] },
  { name: 'Carne de oveja', description: 'Lamskoteletjes', price: '€32', tags: ['meat'] },
  { name: 'Costillas', description: 'Spareribs · heel rack', price: '€28', tags: ['meat'] },
  { name: 'Filete ibérico', description: 'Frans bergvarken', price: '€27', tags: ['meat'] },
  { name: 'Lomo ibérico', description: 'Iberische varkenshaas', price: '€29', tags: ['meat'] },
  { name: 'Le Capelin', description: 'Frans zeewalen', price: '€28', tags: ['fish'] },
  { name: 'Fajita de pollo', description: 'Gegrilde kip met paprika, ui en piri piri', price: '€28', tags: ['chicken'] },
];

export const fish: Dish[] = [
  { name: 'Tuna a la plancha', description: 'Tonijn van de grill', price: '€28', tags: ['fish'] },
  { name: 'Salmon a la plancha', description: 'Zalm van de grill', price: '€32', tags: ['fish'] },
  { name: "Gamba's a la plancha", description: '6 garnalen · 16/20 · met friet en saus', price: '€32', tags: ['fish'] },
  { name: 'Frito gaditano', description: 'Diverse soorten gefrituurde en gegrilde vis', price: '€32', tags: ['fish'] },
  { name: 'Albóndigas vegetariana en salsa de tomate', description: 'Vegetarische gehaktballetjes met friet en salade', price: '€30', tags: ['vegetarian'] },
  { name: 'Fajita vegetariana', description: 'Gebakken vegetarische reepjes met paprika, ui en piri piri', price: '€32', tags: ['vegetarian'] },
];

export const desserts: Dish[] = [
  { name: 'Leche frita', description: 'Gebakken melk met bolletjes ijs en slagroom', price: '€11', tags: ['vegetarian'] },
  { name: 'Milkshake van likeur 43 of Baileys', description: 'Verse milkshake met een toef slagroom', price: '€10', tags: ['vegetarian'] },
  { name: 'Milkshake chocolade, aardbei, pistache', description: 'Verse milkshake met slagroom', price: '€9', tags: ['vegetarian'] },
  { name: 'Churros', description: 'Met Spaanse chocolade, slagroom en suiker', price: '€10', tags: ['vegetarian'] },
  { name: 'Advocaat met slagroom', description: 'Huisgemaakte likeur', price: '€9', tags: ['vegetarian'] },
  { name: 'Ijskoffie', description: 'Huisgemaakt', price: '€7', tags: ['vegetarian'] },
  { name: 'Café con alcohol', description: 'Irisch, Spaanse, Franse, Parijse, Italiaanse, DOM of drambuie', price: '€9', tags: ['vegetarian'] },
  { name: 'Carajillo', description: 'Met Spaanse brandy', price: '€9', tags: ['vegetarian'] },
];

export const wines = [
  { name: 'Monteliego Crianza', description: 'Stevig · Tempranillo · Land/Streek: Spanje, Rioja', price: '€22' },
  { name: 'Muriel Crianza', description: 'Stevig · Zacht · Tempranillo · Spanje, Rioja', price: '€21' },
  { name: 'Monteliego Reserva', description: 'Stevig · Vol · Spanje, Rioja', price: '€28' },
  { name: 'Muriel Reserva', description: 'Stevig · Vol · Spanje, Rioja', price: '€25,50' },
  { name: 'Monteliego Gran Reserva', description: 'Stevig · Vol · Spanje, Rioja', price: '€32' },
  { name: 'Muriel Gran Reserva', description: 'Stevig · Steviger · Spanje, Rioja', price: '€31' },
  { name: 'Marqués de Cáceres Crianza', description: 'Stevig rood · Tempranillo · Spanje, Rioja', price: '€32,50' },
  { name: 'Sol de Málaga', description: 'Zoet · Muscatel · Spanje, Málaga', price: '€29 / €4,50 per glas' },
  { name: 'Bernkasteler zoet', description: 'Zoet · Riesling · Duitsland, Rheinhessen', price: '€25 / €4,50 per glas' },
  { name: 'Karaf huisgemaakte sangria', description: 'Rood of wit · met tapastraditie', price: '€29 / €6,50 per glas' },
];

export const acts = [
  {
    id: 'tapasdag',
    label: 'Tapas dag',
    title: 'Elke woensdag & donderdag een tapasdag',
    price: '€34,50',
    body: 'Elke woensdag en donderdag serveren we een gedeelte van onze tapas. Een tafel vol Spaanse gerechten om samen te delen.',
    cta: { href: '/tapas/', label: 'Bekijk de tapas' },
  },
  {
    id: 'senioren',
    label: 'Seniorenmenu',
    title: 'Seniorenmenu van de dag',
    price: '€28,50',
    body: 'Soep van de dag, hoofdgerecht van vlees of vis, nagerecht en koffie of thee. Het hoofdgerecht wordt geserveerd met friet of gepofte aardappel, salade en saus.',
    cta: { href: '/acties/', label: 'Meer over acties' },
  },
  {
    id: 'lunch',
    label: '12-uurtje',
    title: 'Lunch voor iedereen',
    price: '€14,50',
    body: 'Soep van de dag met brood, Griekse yoghurt met granola en honing of een baguette met kaas, vis of vlees. Keuze uit bruin of wit brood en glutenvrij.',
    cta: { href: '/menu/', label: 'Bekijk het lunchmenu' },
  },
] as const;

export const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: site.legalName,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  servesCuisine: ['Spaans', 'Mediterranean', 'Tapas'],
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressCountry: site.address.country,
  },
  hasMenu: `${site.url}/menu/`,
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '16:00',
      closes: '22:00',
    },
  ],
  acceptsReservations: 'True',
  hasMenuItem: [
    { '@type': 'MenuItem', name: 'Tapas dag', description: 'Tapas om te delen, elke woensdag en donderdag', offers: { '@type': 'Offer', price: '34.50', priceCurrency: 'EUR' } },
    { '@type': 'MenuItem', name: 'Seniorenmenu', offers: { '@type': 'Offer', price: '28.50', priceCurrency: 'EUR' } },
    { '@type': 'MenuItem', name: 'Lomo 450 gram', offers: { '@type': 'Offer', price: '39', priceCurrency: 'EUR' } },
  ],
};
