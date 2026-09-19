// Flat dictionary; keys here win over ca.json/es.json. `es` is typed from `ca`, so both languages always share the same keys.
// One key per concept, named by what it is, not where it is used. Page names are `<page>.label`, so a different heading can later be `<page>.title`.
// Prefix only zone-specific text (`footer.rights`).
// Sections in order: page names, common actions, zone-specific text, accessibility labels. Alphabetical inside each.

const ca = {
  // Page names
  'accessibility.label': "Declaració d'accessibilitat",
  'bio.label': 'Bio',
  'contact.label': 'Contacte',
  'formations.label': 'Formacions',
  'home.label': 'Inici',
  'materials.all.label': 'Veure-ho tot',
  'materials.audiovisual.label': 'Audiovisuals',
  'materials.campaigns.label': 'Campanyes',
  'materials.games.label': 'Jocs',
  'materials.guides.label': 'Guies i recursos didàctics',
  'materials.label': 'Materials',
  'materials.publications.label': 'Publicacions',
  'projects.label': 'Projectes',
  'sitemap.label': 'Mapa del lloc',
  'thank_you.label': 'Gràcies',
  'workshops.label': 'Tallers',

  // Common actions
  back_home: "Tornar a l'inici",
} as const

const es: Record<keyof typeof ca, string> = {
  // Page names
  'accessibility.label': 'Declaración de accesibilidad',
  'bio.label': 'Bio',
  'contact.label': 'Contacto',
  'formations.label': 'Formaciones',
  'home.label': 'Inicio',
  'materials.all.label': 'Ver todo',
  'materials.audiovisual.label': 'Audiovisuales',
  'materials.campaigns.label': 'Campañas',
  'materials.games.label': 'Juegos educativos',
  'materials.guides.label': 'Guías y recursos didácticos',
  'materials.label': 'Materiales',
  'materials.publications.label': 'Publicaciones',
  'projects.label': 'Proyectos',
  'sitemap.label': 'Mapa del sitio',
  'thank_you.label': 'Gracias',
  'workshops.label': 'Talleres',

  // Common actions
  back_home: 'Volver al inicio',
}

export const ui = { ca, es }
