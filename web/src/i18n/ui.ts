// Flat dictionary; keys here win over ca.json/es.json. `es` is typed from `ca`, so both languages always share the same keys.
// One key per concept, named by what it is, not where it is used. Page names are `<page>.label`, so a different heading can later be `<page>.title`.
// Prefix only zone-specific text (`footer.rights`).
// Sections in order: metadata (SEO only), personal data, page names, common actions, zone-specific text, accessibility labels. Alphabetical inside each.

const ca = {
  // Metadata (SEO only)
  'meta.description':
    "Disseny i desenvolupament de projectes educatius, materials i processos de formació des d'una perspectiva feminista, interseccional i crítica.",
  'meta.title': 'Clara Martínez Hernández | Educació, gènere i sexualitats',

  // Personal data
  name: 'Clara Martínez Hernández',
  short_bio:
    "Disseny i desenvolupament de projectes educatius, materials i processos de formació des d'una perspectiva feminista, interseccional i crítica.",
  tagline: 'Educació · Gènere · Sexualitats',

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
  button_contact: 'Contactar',
  button_cv_download: 'Descarregar CV (PDF)',
  view_all_projects: 'Veure tots els projectes',
} as const

const es: Record<keyof typeof ca, string> = {
  // Metadata (SEO only)
  'meta.description':
    'Diseño y desarrollo de proyectos educativos, materiales y procesos de formación desde una perspectiva feminista, interseccional y crítica.',
  'meta.title': 'Clara Martínez Hernández | Educación, género y sexualidades',

  // Personal data
  name: 'Clara Martínez Hernández',
  short_bio:
    'Diseño y desarrollo proyectos educativos, materiales y procesos de formación desde una perspectiva feminista, interseccional y crítica.',
  tagline: 'Educación · Género · Sexualidades',

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
  button_contact: 'Contactar',
  button_cv_download: 'Descargar CV (PDF)',
  view_all_projects: 'Ver todos los proyectos',
}

export const ui = { ca, es }
