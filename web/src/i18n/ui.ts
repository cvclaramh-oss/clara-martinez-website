// Flat dictionary; keys here win over ca.json/es.json. `es` is typed from `ca`, so both languages always share the same keys.
// One key per concept, named by what it is, not where it is used. Page names are `<page>.label`, so a different heading can later be `<page>.title`.
// Prefix only zone-specific text (`footer.rights`).
// Sections in order: metadata (SEO only), personal data, page names, common actions, navigation accessibility, PAGES (one subsection per page). Alphabetical inside each.

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
  'sitemap.label': 'Mapa del lloc',
  'thank_you.label': 'Gràcies',
  'workshops.label': 'Tallers',

  // Common actions
  back_home: "Tornar a l'inici",
  button_contact: 'Contactar',
  button_cv_download: 'Descarregar CV (PDF)',
  view_all_projects: 'Veure tots els projectes',

  // Navigation accessibility
  'nav.a11y': 'Menú de navegació principal',
  'nav.close_menu': 'Tancar el menú de navegació',
  'nav.darkmode': 'Canviar mode de llum',
  'nav.lang_ca': 'Canviar a la versió en català',
  'nav.lang_es': 'Canviar a la versió en espanyol',
  'nav.open_menu': 'Obrir el menú de navegació',

  // PAGES

  // Projects
  'projects.all': 'Tots els projectes',
  'projects.label': 'Projectes',
  'projects.many': 'projectes',
  'projects.one': 'projecte',
  'projects.pagination_aria': 'Paginació de projectes',
  'projects.range_prefix': 'Mostrant els projectes',
  'projects.range_suffix': "d'un total de",
  'projects.subtitle':
    'Col·lecció de projectes educatius, materials didàctics i investigacions en educació afectivosexual, perspectiva de gènere i transformació comunitària.',
  'projects.tags': 'Etiquetes',

  // Materials
  'materials.all.label': 'Veure-ho tot',
  'materials.audiovisual.label': 'Audiovisuals',
  'materials.campaigns.label': 'Campanyes',
  'materials.games.label': 'Jocs',
  'materials.guides.label': 'Guies i recursos didàctics',
  'materials.label': 'Materials',
  'materials.publications.label': 'Publicacions',

  // Accessibility labels
  'contact.info.social_facebook': "Vés a la meva pàgina de Facebook, s'obre en una pestanya nova",
  'contact.info.social_linkedin': "Vés al meu perfil de LinkedIn, s'obre en una pestanya nova",
  'contact.info.social_twitter': "Vés a la meva pàgina de Twitter, s'obre en una pestanya nova",
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
  'sitemap.label': 'Mapa del sitio',
  'thank_you.label': 'Gracias',
  'workshops.label': 'Talleres',

  // Common actions
  back_home: 'Volver al inicio',
  button_contact: 'Contactar',
  button_cv_download: 'Descargar CV (PDF)',
  view_all_projects: 'Ver todos los proyectos',

  // Navigation accessibility
  'nav.a11y': 'Menú de navegación principal',
  'nav.close_menu': 'Cerrar el menú de navegación',
  'nav.darkmode': 'Cambiar modo de luz',
  'nav.lang_ca': 'Cambiar a la versión en catalán',
  'nav.lang_es': 'Cambiar a la versión en español',
  'nav.open_menu': 'Abrir el menú de navegación',

  // PAGES

  // Projects
  'projects.all': 'Todos los proyectos',
  'projects.label': 'Proyectos',
  'projects.many': 'proyectos',
  'projects.one': 'proyecto',
  'projects.pagination_aria': 'Paginación de proyectos',
  'projects.range_prefix': 'Mostrando los proyectos',
  'projects.range_suffix': 'de un total de',
  'projects.subtitle':
    'Colección de proyectos educativos, materiales didácticos e investigaciones en educación afectivosexual, perspectiva de género y transformación comunitaria.',
  'projects.tags': 'Etiquetas',

  // Materials
  'materials.all.label': 'Ver todo',
  'materials.audiovisual.label': 'Audiovisuales',
  'materials.campaigns.label': 'Campañas',
  'materials.games.label': 'Juegos educativos',
  'materials.guides.label': 'Guías y recursos didácticos',
  'materials.label': 'Materiales',
  'materials.publications.label': 'Publicaciones',

  // Accessibility labels
  'contact.info.social_facebook': 'Ir a mi página de Facebook, se abre en una pestaña nueva',
  'contact.info.social_linkedin': 'Ir a mi perfil de LinkedIn, se abre en una pestaña nueva',
  'contact.info.social_twitter': 'Ir a mi página de Twitter, se abre en una pestaña nueva',
}

export const ui = { ca, es }
