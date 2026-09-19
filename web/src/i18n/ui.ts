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
  'home.label': 'Inici',
  'sitemap.label': 'Mapa del lloc',
  'thank_you.label': 'Gràcies',

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

  // Formations
  'formations.label': 'Formacions',

  // Workshops
  'workshops.label': 'Tallers',

  // Bio
  'bio.label': 'Bio',

  // Contact
  'contact.label': 'Contacte',
  'contact.lets_talk': 'Parlem',
  'contact.subtitle': 'Tens alguna pregunta? Posat en contacte amb mi!',

  // Contact form
  'contact.form.email': 'Correu electrònic',
  'contact.form.experience_advanced': 'Avançat',
  'contact.form.experience_beginner': 'Principiant',
  'contact.form.experience_intermediate': 'Intermedi',
  'contact.form.experience_legend': "El teu nivell d'experiència",
  'contact.form.first_name': 'Nom',
  'contact.form.first_name_validation': "Necessito el teu nom per poder dirigir-m'hi correctament",
  'contact.form.interest_community': 'Transformació comunitària',
  'contact.form.interest_education': 'Educació i formació',
  'contact.form.interest_gender': 'Perspectiva de gènere',
  'contact.form.interest_sexuality': 'Educació afectivosexual',
  'contact.form.interests_legend': 'Quin és el teu interès?',
  'contact.form.interests_validation': "Si us plau, selecciona almenys una àrea d'interès",
  'contact.form.message': 'Missatge',
  'contact.form.newsletter': "Subscriure'm al butlletí",
  'contact.form.phone': 'Telèfon',
  'contact.form.preferences_legend': 'Les teves preferències',
  'contact.form.send': 'Enviar missatge',
  'contact.form.updates': 'Rebre actualitzacions',

  // Contact info
  'contact.info.address_label': 'Adreça:',
  'contact.info.description':
    "Em pots contactar per a qualsevol consulta sobre formació, assessorament o col·laboració en projectes d'educació afectivosexual, perspectiva de gènere o transformació comunitària.",
  'contact.info.email_label': 'Correu electrònic:',
  'contact.info.hours': 'Pendent de confirmar',
  'contact.info.hours_label': "Horari d'atenció:",
  'contact.info.phone_label': 'Telèfon:',
  'contact.info.social_facebook': "Vés a la meva pàgina de Facebook, s'obre en una pestanya nova",
  'contact.info.social_linkedin': "Vés al meu perfil de LinkedIn, s'obre en una pestanya nova",
  'contact.info.social_twitter': "Vés a la meva pàgina de Twitter, s'obre en una pestanya nova",
  'contact.info.title': "Contacta'm",
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
  'home.label': 'Inicio',
  'sitemap.label': 'Mapa del sitio',
  'thank_you.label': 'Gracias',

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

  // Formations
  'formations.label': 'Formaciones',

  // Workshops
  'workshops.label': 'Talleres',

  // Bio
  'bio.label': 'Bio',

  // Contact
  'contact.label': 'Contacto',
  'contact.lets_talk': 'Hablemos',
  'contact.subtitle': '¿Tienes alguna pregunta? ¡Ponte en contacto conmigo!',

  // Contact form
  'contact.form.email': 'Correo electrónico',
  'contact.form.experience_advanced': 'Avanzado',
  'contact.form.experience_beginner': 'Principiante',
  'contact.form.experience_intermediate': 'Intermedio',
  'contact.form.experience_legend': 'Tu nivel de experiencia',
  'contact.form.first_name': 'Nombre',
  'contact.form.first_name_validation': 'Necesito tu nombre para poder dirigirme a ti correctamente',
  'contact.form.interest_community': 'Transformación comunitaria',
  'contact.form.interest_education': 'Educación y formación',
  'contact.form.interest_gender': 'Perspectiva de género',
  'contact.form.interest_sexuality': 'Educación afectivosexual',
  'contact.form.interests_legend': '¿Cuál es tu interés?',
  'contact.form.interests_validation': 'Por favor, selecciona al menos un área de interés',
  'contact.form.message': 'Mensaje',
  'contact.form.newsletter': 'Suscribirme al boletín',
  'contact.form.phone': 'Teléfono',
  'contact.form.preferences_legend': 'Tus preferencias',
  'contact.form.send': 'Enviar mensaje',
  'contact.form.updates': 'Recibir actualizaciones',

  // Contact info
  'contact.info.address_label': 'Dirección:',
  'contact.info.description':
    'Puedes contactarme para cualquier consulta sobre formación, asesoramiento o colaboración en proyectos de educación afectivosexual, perspectiva de género o transformación comunitaria.',
  'contact.info.email_label': 'Correo electrónico:',
  'contact.info.hours': 'Pendiente de confirmar',
  'contact.info.hours_label': 'Horario de atención:',
  'contact.info.phone_label': 'Teléfono:',
  'contact.info.social_facebook': 'Ir a mi página de Facebook, se abre en una pestaña nueva',
  'contact.info.social_linkedin': 'Ir a mi perfil de LinkedIn, se abre en una pestaña nueva',
  'contact.info.social_twitter': 'Ir a mi página de Twitter, se abre en una pestaña nueva',
  'contact.info.title': 'Contáctame',
}

export const ui = { ca, es }
