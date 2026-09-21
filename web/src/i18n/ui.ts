// Flat dictionary of every text shown on the site. `es` is typed from `ca`, so both languages always share the same keys.
// One key per concept, named by what it is, not where it is used. Page names are `<page>.label`, so a different heading can later be `<page>.title`.
// Prefix only zone-specific text (`footer.rights`).
// Sections in order: metadata (SEO only), personal data, shared names, common actions, navigation accessibility, PAGES (one subsection per page). Alphabetical inside each.

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

  // Shared names
  'home.label': 'Inici',
  'tag.label': 'Etiqueta',

  // Common actions
  back_home: "Tornar a l'inici",
  button_contact: 'Contactar',
  button_cv_download: 'Descarregar CV (PDF)',
  view_all_projects: 'Veure tots els projectes',
  view_details: 'Veure detalls',
  view_featured: 'Veure contingut destacat',

  // Navigation accessibility
  'nav.a11y': 'Menú de navegació principal',
  'nav.close_menu': 'Tancar el menú de navegació',
  'nav.darkmode': 'Canviar mode de llum',
  'nav.lang_ca': 'Canviar a la versió en català',
  'nav.lang_es': 'Canviar a la versió en espanyol',
  'nav.open_menu': 'Obrir el menú de navegació',

  // Footer
  'footer.accessibility_description':
    "Arquitectura web d'alt contrast, tipografia llegible i navegació semàntica conforme a WCAG 2.2 nivell AA.",
  'footer.accessibility_heading': 'Accessibilitat & criteris',
  'footer.contact_heading': 'Contacte & documentació',
  'footer.cta_button': 'Iniciar conversa',
  'footer.cta_description':
    'Assessoro administracions, centres educatius i entitats socials per construir programes efectius amb solvència tècnica i visió transformadora.',
  'footer.cta_eyebrow': 'Col·laboracions & contractació',
  'footer.cta_heading': 'Tens un projecte o vols organitzar una formació?',
  'footer.portfolio_index': 'Índex de continguts',
  'footer.rights': 'Tots els drets reservats.',
  'footer.wcag_badge': 'WCAG 2.2 AA',

  // PAGES

  // Catalog item detail
  'detail.back': 'Tornar a',
  'detail.breadcrumb': 'Ruta',
  'detail.category': 'Categoria',
  'detail.created_by': 'Elaborat per',
  'detail.description': 'Descripció',
  'detail.designed_by': 'Dissenyat i maquetat per',
  'detail.documents': 'Documents',
  'detail.download': 'Descarregar',
  'detail.external_link': 'Enllaç extern',
  'detail.fact_sheet': 'Fitxa tècnica',
  'detail.figure': 'Fig.',
  'detail.gallery': 'Galeria',
  'detail.institutional_authorship': 'Autoria institucional',
  'detail.my_work': 'La meva feina',
  'detail.new_tab': "(s'obre en una pestanya nova)",
  'detail.next': 'Següent',
  'detail.open_link': 'Obrir enllaç',
  'detail.play_video': 'Reproduir el vídeo',
  'detail.previous': 'Anterior',
  'detail.previous_next': 'Anterior i següent',
  'detail.tags': 'Etiquetes',
  'detail.video': 'Vídeo',
  'detail.watch_video': 'Veure el vídeo',
  'detail.year': 'Any',

  // Item detail
  'featured_projects.author_prefix': 'Autor/a: ',
  'featured_projects.eyebrow': 'Catàleg seleccionat',
  'featured_projects.title': 'Continguts destacats',
  'project_share.back': 'Tornar als projectes',
  'project_share.description': "T'agrada aquest projecte? Comparteix-lo amb la teva xarxa!",
  'project_share.title': 'Comparteix aquest projecte',
  'tag.subtitle_prefix': "Projectes amb l'etiqueta",

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

  // Sitemap
  'sitemap.auto_updated': 'Actualitzat automàticament en cada construcció',
  'sitemap.explore': 'Explora la nostra col·lecció de',
  'sitemap.generated_by': 'Generat per:',
  'sitemap.label': 'Mapa del lloc',
  'sitemap.last_updated': 'Última actualització:',
  'sitemap.main_pages': 'Pàgines principals',
  'sitemap.pages.accessibility_statement.description':
    "El nostre compromís amb l'accessibilitat i informació sobre les característiques d'accessibilitat d'aquest lloc web.",
  'sitemap.pages.contact.description':
    'Contacta amb Clara Martínez Hernández per a consultes sobre formació, assessorament o col·laboració en projectes educatius.',
  'sitemap.pages.home.description':
    "Pàgina principal del portfolio de Clara Martínez Hernández, especialista en disseny i desenvolupament de projectes educatius, materials i processos de formació des d'una perspectiva feminista, interseccional i crítica..",
  'sitemap.pages.projects.description':
    'Col·lecció de projectes educatius, materials didàctics i investigacions en educació afectivosexual i perspectiva de gènere.',
  'sitemap.pages.thank_you.description': 'Pàgina de confirmació per a enviaments de formularis exitosos.',
  'sitemap.projects_suffix': 'projectes amb enfocament en accessibilitat i disseny inclusiu.',
  'sitemap.subtitle':
    'Una visió completa de totes les pàgines i continguts disponibles, organitzats per a una navegació fàcil.',
  'sitemap.technical_info': 'Informació tècnica',
  'sitemap.xml_description': 'Es genera automàticament un mapa del lloc XML a',
  'sitemap.xml_for': "per a l'optimització de motors de cerca.",
  'sitemap.xml_sitemap': 'Mapa del lloc XML:',

  // Accessibility statement
  'accessibility.commitment': "Compromís amb l'accessibilitat",
  'accessibility.label': "Declaració d'accessibilitat",
  'accessibility.pending_notice':
    'Aquest contingut és el text plantilla del starter i està pendent de redactar amb les dades reals.',
  'accessibility.placeholder':
    "Treballarem perquè aquest web sigui accessible per a totes les persones, independentment de la seva capacitat o circumstància. La declaració completa s'està redactant i es publicarà aquí properament.",
  'accessibility.subtitle': 'El nostre compromís perquè aquest lloc web sigui accessible per a tothom.',

  // Thank you
  'thank_you.label': 'Gràcies',
  'thank_you.notice': "Això és una prova del sistema de validació de formularis, no s'ha enviat cap correu electrònic.",
  'thank_you.send_another': 'Enviar un altre missatge',
  'thank_you.subtitle': "El formulari s'ha enviat correctament.",
  'thank_you.title': 'Gràcies!',

  // 404
  'page_404.message': "Aquesta pàgina no existeix. No et preocupis, t'ajudem a tornar.",

  // Coming soon
  'coming_soon.message': "Aquesta secció encara s'està elaborant. Properament hi trobaràs el contingut.",
  'coming_soon.title': 'En construcció',
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

  // Shared names
  'home.label': 'Inicio',
  'tag.label': 'Etiqueta',

  // Common actions
  back_home: 'Volver al inicio',
  button_contact: 'Contactar',
  button_cv_download: 'Descargar CV (PDF)',
  view_all_projects: 'Ver todos los proyectos',
  view_details: 'Ver detalles',
  view_featured: 'Ver contenido destacado',

  // Navigation accessibility
  'nav.a11y': 'Menú de navegación principal',
  'nav.close_menu': 'Cerrar el menú de navegación',
  'nav.darkmode': 'Cambiar modo de luz',
  'nav.lang_ca': 'Cambiar a la versión en catalán',
  'nav.lang_es': 'Cambiar a la versión en español',
  'nav.open_menu': 'Abrir el menú de navegación',

  // Footer
  'footer.accessibility_description':
    'Arquitectura web de alto contraste, tipografía legible y navegación semántica conforme a WCAG 2.2 nivel AA.',
  'footer.accessibility_heading': 'Accesibilidad & criterios',
  'footer.contact_heading': 'Contacto & documentación',
  'footer.cta_button': 'Iniciar conversación',
  'footer.cta_description':
    'Asesoro a administraciones, centros educativos y entidades sociales para construir programas efectivos con solvencia técnica y visión transformadora.',
  'footer.cta_eyebrow': 'Colaboraciones & contratación',
  'footer.cta_heading': '¿Tienes un proyecto o quieres organizar una formación?',
  'footer.portfolio_index': 'Índice de contenidos',
  'footer.rights': 'Todos los derechos reservados.',
  'footer.wcag_badge': 'WCAG 2.2 AA',

  // PAGES

  // Catalog item detail
  'detail.back': 'Volver a',
  'detail.breadcrumb': 'Ruta',
  'detail.category': 'Categoría',
  'detail.created_by': 'Elaborado por',
  'detail.description': 'Descripción',
  'detail.designed_by': 'Diseñado y maquetado por',
  'detail.documents': 'Documentos',
  'detail.download': 'Descargar',
  'detail.external_link': 'Enlace externo',
  'detail.fact_sheet': 'Ficha técnica',
  'detail.figure': 'Fig.',
  'detail.gallery': 'Galería',
  'detail.institutional_authorship': 'Autoría institucional',
  'detail.my_work': 'Mi trabajo',
  'detail.new_tab': '(se abre en una pestaña nueva)',
  'detail.next': 'Siguiente',
  'detail.open_link': 'Abrir enlace',
  'detail.play_video': 'Reproducir el vídeo',
  'detail.previous': 'Anterior',
  'detail.previous_next': 'Anterior y siguiente',
  'detail.tags': 'Etiquetas',
  'detail.video': 'Vídeo',
  'detail.watch_video': 'Ver el vídeo',
  'detail.year': 'Año',

  // Item detail
  'featured_projects.author_prefix': 'Autor/a: ',
  'featured_projects.eyebrow': 'Catálogo seleccionado',
  'featured_projects.title': 'Contenidos destacados',
  'project_share.back': 'Volver a los proyectos',
  'project_share.description': '¿Te gusta este proyecto? ¡Compártelo con tu red!',
  'project_share.title': 'Comparte este proyecto',
  'tag.subtitle_prefix': 'Proyectos con la etiqueta',

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

  // Sitemap
  'sitemap.auto_updated': 'Actualizado automáticamente en cada construcción',
  'sitemap.explore': 'Explora nuestra colección de',
  'sitemap.generated_by': 'Generado por:',
  'sitemap.label': 'Mapa del sitio',
  'sitemap.last_updated': 'Última actualización:',
  'sitemap.main_pages': 'Páginas principales',
  'sitemap.pages.accessibility_statement.description':
    'Nuestro compromiso con la accesibilidad e información sobre las características de accesibilidad de este sitio web.',
  'sitemap.pages.contact.description':
    'Contacta con Clara Martínez Hernández para consultas sobre formación, asesoramiento o colaboración en proyectos educativos.',
  'sitemap.pages.home.description':
    'Página principal del portfolio de Clara Martínez Hernández, especialista en diseño y desarrollo proyectos educativos, materiales y procesos de formación desde una perspectiva feminista, interseccional y crítica.',
  'sitemap.pages.projects.description':
    'Colección de proyectos educativos, materiales didácticos e investigaciones en educación afectivosexual y perspectiva de género.',
  'sitemap.pages.thank_you.description': 'Página de confirmación para envíos de formularios exitosos.',
  'sitemap.projects_suffix': 'proyectos con enfoque en accesibilidad y diseño inclusivo.',
  'sitemap.subtitle':
    'Una visión completa de todas las páginas y contenidos disponibles, organizados para una navegación fácil.',
  'sitemap.technical_info': 'Información técnica',
  'sitemap.xml_description': 'Se genera automáticamente un mapa del sitio XML en',
  'sitemap.xml_for': 'para la optimización de motores de búsqueda.',
  'sitemap.xml_sitemap': 'Mapa del sitio XML:',

  // Accessibility statement
  'accessibility.commitment': 'Compromiso con la accesibilidad',
  'accessibility.label': 'Declaración de accesibilidad',
  'accessibility.pending_notice':
    'Este contenido es el texto plantilla del starter y está pendiente de redactar con los datos reales.',
  'accessibility.placeholder':
    'Trabajaremos para que este sitio web sea accesible para todas las personas, independientemente de su capacidad o circunstancia. La declaración completa se está redactando y se publicará aquí próximamente.',
  'accessibility.subtitle': 'Nuestro compromiso para que este sitio web sea accesible para todas las personas.',

  // Thank you
  'thank_you.label': 'Gracias',
  'thank_you.notice':
    'Esto es una prueba del sistema de validación de formularios, no se ha enviado ningún correo electrónico.',
  'thank_you.send_another': 'Enviar otro mensaje',
  'thank_you.subtitle': 'El formulario se ha enviado correctamente.',
  'thank_you.title': '¡Gracias!',

  // 404
  'page_404.message': 'Esta página no existe. No te preocupes, te ayudamos a volver.',

  // Coming soon
  'coming_soon.message': 'Esta sección todavía se está elaborando. Próximamente encontrarás el contenido aquí.',
  'coming_soon.title': 'En construcción',
}

export const ui = { ca, es }
