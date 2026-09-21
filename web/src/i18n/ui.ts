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
  'nav.skip_link': 'Saltar al contingut principal',

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
  'featured_projects.eyebrow': 'Catàleg seleccionat',
  'featured_projects.title': 'Continguts destacats',
  'project_share.back': 'Tornar als projectes',
  'project_share.description': "T'agrada aquest projecte? Comparteix-lo amb la teva xarxa!",
  'project_share.title': 'Comparteix aquest projecte',

  // Projects
  'projects.label': 'Projectes',
  'projects.subtitle':
    'Col·lecció de projectes educatius, materials didàctics i investigacions en educació afectivosexual, perspectiva de gènere i transformació comunitària.',

  // Catalog
  'catalog.empty_text': 'Estem preparant aquesta secció. Torna aviat o consulta la resta del catàleg.',
  'catalog.empty_title': 'Encara no hi ha continguts',
  'catalog.eyebrow': 'Arxiu & recursos oberts',
  'catalog.item_many': 'continguts',
  'catalog.item_one': 'contingut',
  'catalog.next_page': 'Pàgina següent',
  'catalog.no_next_page': 'No hi ha pàgina següent',
  'catalog.no_previous_page': 'No hi ha pàgina anterior',
  'catalog.of': 'de',
  'catalog.page': 'Pàgina',
  'catalog.pagination_aria': 'Paginació',
  'catalog.previous_page': 'Pàgina anterior',
  'catalog.showing': 'Mostrant',

  // Materials
  'materials.all.label': 'Veure-ho tot',
  'materials.audiovisual.label': 'Audiovisuals',
  'materials.audiovisual.subtitle':
    '[PENDENT] Subtítol de materials.audiovisual',
  'materials.campaigns.label': 'Campanyes',
  'materials.campaigns.subtitle':
    '[PENDENT] Subtítol de materials.campaigns',
  'materials.games.label': 'Jocs',
  'materials.games.subtitle':
    '[PENDENT] Subtítol de materials.games',
  'materials.guides.label': 'Guies i recursos didàctics',
  'materials.guides.subtitle':
    '[PENDENT] Subtítol de materials.guides',
  'materials.label': 'Materials',
  'materials.publications.label': 'Publicacions',
  'materials.publications.subtitle':
    '[PENDENT] Subtítol de materials.publications',
  'materials.subtitle':
    '[PENDENT] Subtítol de materials',

  // Formations
  'formations.label': 'Formacions',
  'formations.subtitle':
    '[PENDENT] Subtítol de formations',

  // Workshops
  'workshops.label': 'Tallers',
  'workshops.subtitle':
    '[PENDENT] Subtítol de workshops',

  // Bio
  'bio.label': 'Bio',

  // Contact
  'contact.channel.cv.badge': 'Documentació',
  'contact.channel.cv.button': 'Descarregar CV (PDF)',
  'contact.channel.cv.text': 'Descarrega el dossier professional amb detall de formacions i projectes:',
  'contact.channel.cv.title': '03 / Currículum & expertesa',
  'contact.channel.email.badge': 'Principal',
  'contact.channel.email.text': 'Atenció directa per a consultes, premsa i col·laboracions:',
  'contact.channel.email.title': '01 / Correu directe',
  'contact.channel.linkedin.badge': 'Perfil',
  'contact.channel.linkedin.text': 'Connexió professional, actualitzacions i projectes recents:',
  'contact.channel.linkedin.title': '02 / Xarxa professional',
  'contact.channels.description':
    'Pots posar-te en contacte mitjançant el formulari o directament a través dels canals següents.',
  'contact.channels.eyebrow': 'Canals directes',
  'contact.channels.title': 'Dades de contacte & documentació',
  'contact.eyebrow': 'Contacte directe',
  'contact.label': 'Contacte',
  'contact.new_tab': "(s'obre en una pestanya nova)",
  'contact.subtitle':
    'Per a col·laboracions, encàrrecs institucionals, projectes educatius o consultories pedagògiques.',

  // Contact form
  'contact.form.email': 'Correu electrònic',
  'contact.form.email_placeholder': 'nom@exemple.cat',
  'contact.form.email_validation': 'Escriu un correu electrònic vàlid, per exemple nom@exemple.cat',
  'contact.form.entity': 'Entitat / organització',
  'contact.form.entity_placeholder': 'Escola, Ajuntament, Associació…',
  'contact.form.error_config':
    'El formulari encara no està configurat per enviar missatges. Escriu-me directament al correu.',
  'contact.form.error_generic':
    "No s'ha pogut enviar la consulta. Torna-ho a provar en uns minuts o escriu-me directament al correu.",
  'contact.form.error_rate': "S'han fet massa enviaments seguits. Espera uns minuts i torna-ho a provar.",
  'contact.form.error_summary': "Hi ha un problema amb l'enviament. Cal revisar aquests camps:",
  'contact.form.eyebrow': "Formulari d'inici de projecte",
  'contact.form.message': 'Missatge / descripció del projecte',
  'contact.form.message_placeholder':
    "Explica breument el context, els objectius, les dates previstes o el nombre d'assistents aproximat…",
  'contact.form.message_validation': 'Escriu el teu missatge',
  'contact.form.name': 'Nom i cognoms',
  'contact.form.name_placeholder': 'Ex. Maria Puig i Soler',
  'contact.form.name_validation': 'Escriu el teu nom i cognoms',
  'contact.form.privacy': 'He llegit i accepto la política de privacitat',
  'contact.form.privacy_note':
    "El tractament de dades és d'acord amb el RGPD. Les teves dades només s'utilitzaran per respondre a aquesta sol·licitud.",
  'contact.form.privacy_validation': 'Cal acceptar la política de privacitat per enviar la consulta',
  'contact.form.required_note': '* Camps obligatoris',
  'contact.form.required_validation': 'Aquest camp és obligatori',
  'contact.form.send': 'Enviar consulta',
  'contact.form.sending': 'Enviant…',
  'contact.form.subject': 'Nova consulta des del web',
  'contact.form.type': 'Tipus de consulta',
  'contact.form.type_collaboration': 'Col·laboració',
  'contact.form.type_consulting': 'Consultoria',
  'contact.form.type_institutional': 'Encàrrec institucional',
  'contact.form.type_other': 'Altres',
  'contact.form.type_placeholder': 'Selecciona una opció',
  'contact.form.type_training': 'Formació',
  'contact.form.type_validation': 'Selecciona un tipus de consulta',

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
  'thank_you.notice': 'Hem rebut el teu missatge i et respondrem tan aviat com sigui possible.',
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
  'nav.skip_link': 'Saltar al contenido principal',

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
  'featured_projects.eyebrow': 'Catálogo seleccionado',
  'featured_projects.title': 'Contenidos destacados',
  'project_share.back': 'Volver a los proyectos',
  'project_share.description': '¿Te gusta este proyecto? ¡Compártelo con tu red!',
  'project_share.title': 'Comparte este proyecto',

  // Projects
  'projects.label': 'Proyectos',
  'projects.subtitle':
    'Colección de proyectos educativos, materiales didácticos e investigaciones en educación afectivosexual, perspectiva de género y transformación comunitaria.',

  // Catalog
  'catalog.empty_text': 'Estamos preparando esta sección. Vuelve pronto o consulta el resto del catálogo.',
  'catalog.empty_title': 'Todavía no hay contenidos',
  'catalog.eyebrow': 'Archivo & recursos abiertos',
  'catalog.item_many': 'contenidos',
  'catalog.item_one': 'contenido',
  'catalog.next_page': 'Página siguiente',
  'catalog.no_next_page': 'No hay página siguiente',
  'catalog.no_previous_page': 'No hay página anterior',
  'catalog.of': 'de',
  'catalog.page': 'Página',
  'catalog.pagination_aria': 'Paginación',
  'catalog.previous_page': 'Página anterior',
  'catalog.showing': 'Mostrando',

  // Materials
  'materials.all.label': 'Ver todo',
  'materials.audiovisual.label': 'Audiovisuales',
  'materials.audiovisual.subtitle':
    '[PENDENT] Subtítol de materials.audiovisual',
  'materials.campaigns.label': 'Campañas',
  'materials.campaigns.subtitle':
    '[PENDENT] Subtítol de materials.campaigns',
  'materials.games.label': 'Juegos educativos',
  'materials.games.subtitle':
    '[PENDENT] Subtítol de materials.games',
  'materials.guides.label': 'Guías y recursos didácticos',
  'materials.guides.subtitle':
    '[PENDENT] Subtítol de materials.guides',
  'materials.label': 'Materiales',
  'materials.publications.label': 'Publicaciones',
  'materials.publications.subtitle':
    '[PENDENT] Subtítol de materials.publications',
  'materials.subtitle':
    '[PENDENT] Subtítol de materials',

  // Formations
  'formations.label': 'Formaciones',
  'formations.subtitle':
    '[PENDENT] Subtítol de formations',

  // Workshops
  'workshops.label': 'Talleres',
  'workshops.subtitle':
    '[PENDENT] Subtítol de workshops',

  // Bio
  'bio.label': 'Bio',

  // Contact
  'contact.channel.cv.badge': 'Documentación',
  'contact.channel.cv.button': 'Descargar CV (PDF)',
  'contact.channel.cv.text': 'Descarga el dosier profesional con el detalle de formaciones y proyectos:',
  'contact.channel.cv.title': '03 / Currículum y experiencia',
  'contact.channel.email.badge': 'Principal',
  'contact.channel.email.text': 'Atención directa para consultas, prensa y colaboraciones:',
  'contact.channel.email.title': '01 / Correo directo',
  'contact.channel.linkedin.badge': 'Perfil',
  'contact.channel.linkedin.text': 'Conexión profesional, novedades y proyectos recientes:',
  'contact.channel.linkedin.title': '02 / Red profesional',
  'contact.channels.description':
    'Puedes ponerte en contacto mediante el formulario o directamente a través de los canales siguientes.',
  'contact.channels.eyebrow': 'Canales directos',
  'contact.channels.title': 'Datos de contacto y documentación',
  'contact.eyebrow': 'Contacto directo',
  'contact.label': 'Contacto',
  'contact.new_tab': '(se abre en una pestaña nueva)',
  'contact.subtitle':
    'Para colaboraciones, encargos institucionales, proyectos educativos o consultorías pedagógicas.',

  // Contact form
  'contact.form.email': 'Correo electrónico',
  'contact.form.email_placeholder': 'nombre@ejemplo.es',
  'contact.form.email_validation': 'Escribe un correo electrónico válido, por ejemplo nombre@ejemplo.es',
  'contact.form.entity': 'Entidad / organización',
  'contact.form.entity_placeholder': 'Escuela, Ayuntamiento, Asociación…',
  'contact.form.error_config':
    'El formulario todavía no está configurado para enviar mensajes. Escríbeme directamente al correo.',
  'contact.form.error_generic':
    'No se ha podido enviar la consulta. Inténtalo de nuevo en unos minutos o escríbeme directamente al correo.',
  'contact.form.error_rate': 'Se han hecho demasiados envíos seguidos. Espera unos minutos e inténtalo de nuevo.',
  'contact.form.error_summary': 'Hay un problema con el envío. Hay que revisar estos campos:',
  'contact.form.eyebrow': 'Formulario de inicio de proyecto',
  'contact.form.message': 'Mensaje / descripción del proyecto',
  'contact.form.message_placeholder':
    'Explica brevemente el contexto, los objetivos, las fechas previstas o el número aproximado de asistentes…',
  'contact.form.message_validation': 'Escribe tu mensaje',
  'contact.form.name': 'Nombre y apellidos',
  'contact.form.name_placeholder': 'Ej. María Pérez García',
  'contact.form.name_validation': 'Escribe tu nombre y apellidos',
  'contact.form.privacy': 'He leído y acepto la política de privacidad',
  'contact.form.privacy_note':
    "El tratamiento de datos es de acuerdo con el RGPD. Tus datos solo se utilizarán para responder a esta solicitud.",
  'contact.form.privacy_validation': 'Hay que aceptar la política de privacidad para enviar la consulta',
  'contact.form.required_note': '* Campos obligatorios',
  'contact.form.required_validation': 'Este campo es obligatorio',
  'contact.form.send': 'Enviar consulta',
  'contact.form.sending': 'Enviando…',
  'contact.form.subject': 'Nueva consulta desde la web',
  'contact.form.type': 'Tipo de consulta',
  'contact.form.type_collaboration': 'Colaboración',
  'contact.form.type_consulting': 'Consultoría',
  'contact.form.type_institutional': 'Encargo institucional',
  'contact.form.type_other': 'Otros',
  'contact.form.type_placeholder': 'Selecciona una opción',
  'contact.form.type_training': 'Formación',
  'contact.form.type_validation': 'Selecciona un tipo de consulta',

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
  'thank_you.notice': 'Hemos recibido tu mensaje y te responderemos lo antes posible.',
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
