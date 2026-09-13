import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons/DocumentText'

const blockContent = defineArrayMember({
  type: 'block',
  styles: [
    {title: 'Normal', value: 'normal'},
    {title: 'Subtítol', value: 'h2'},
  ],
  lists: [{title: 'Llista', value: 'bullet'}],
  marks: {
    decorators: [
      {title: 'Negreta', value: 'strong'},
      {title: 'Cursiva', value: 'em'},
    ],
    annotations: [{type: 'link'}],
  },
})

const videoMember = defineArrayMember({
  name: 'video',
  title: 'Vídeo',
  type: 'object',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Títol (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Enllaç (YouTube / Vimeo)',
      type: 'url',
      description: 'O el enllaç extern, o el fitxer. Mai ambdós.',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'file',
      title: 'Fitxer (.mp4)',
      type: 'file',
      description: 'O el fitxer, o l’enllaç extern. Mai ambdós.',
      options: {accept: 'video/mp4'},
    }),
  ],
  validation: (rule) =>
    rule.custom((value) => {
      if (!value) return true
      const hasUrl = Boolean(value.url)
      const hasFile = Boolean(value.file)
      if (hasUrl && hasFile) return 'Tria només una opció: enllaç extern o fitxer'
      if (!hasUrl && !hasFile) return 'Afegeix un enllaç extern o un fitxer de vídeo'
      return true
    }),
  preview: {
    select: {
      title: 'titulo',
      media: 'file',
    },
  },
})

const imageMember = defineArrayMember({
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Text alternatiu',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})

const documentMember = defineArrayMember({
  name: 'document',
  title: 'Document',
  type: 'object',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Títol',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'Arxiu (PDF)',
      type: 'file',
      options: {accept: 'application/pdf'},
      validation: (rule) => rule.required(),
    }),
  ],
})

const sectionMember = defineArrayMember({
  name: 'seccio',
  title: 'Secció',
  type: 'object',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Títol de la secció',
      type: 'string',
    }),
    defineField({
      name: 'texto',
      title: 'Text',
      type: 'text',
      rows: 4,
    }),
  ],
})

export const project = defineType({
  name: 'project',
  title: 'Projecte',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {name: 'card', title: 'Targeta (portada del grid)', options: {collapsible: true, collapsed: false}},
    {name: 'portada', title: 'Portada (inici)', options: {collapsible: true, collapsed: false}},
    {name: 'taxonomia', title: 'Taxonomia i filtres', options: {collapsible: true, collapsed: false}},
    {name: 'detall', title: 'Detall', options: {collapsible: true, collapsed: false}},
    {name: 'multimedia', title: 'Multimèdia', options: {collapsible: true, collapsed: false}},
    {name: 'boto', title: 'Botó (descarrega / enllaç)', options: {collapsible: true, collapsed: false}},
    {name: 'flex', title: 'Informació flexible', options: {collapsible: true, collapsed: false}},
  ],
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: 'ca',
    }),
    defineField({
      name: 'title',
      title: 'Títol',
      type: 'string',
      group: 'card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítol descriptiu',
      type: 'string',
      description: 'Text breu que es mostra sota el títol a la miniatura.',
      group: 'card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imatge de portada',
      type: 'image',
      options: {hotspot: true},
      group: 'card',
      fields: [
        defineField({
          name: 'alt',
          title: 'Text alternatiu',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      group: 'card',
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return 'Required'
          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return 'Slug must be lowercase with hyphens only'
          }
          return true
        }),
    }),
    defineField({
      name: 'destacado',
      title: 'Destacat a la portada (inici)',
      type: 'boolean',
      initialValue: false,
      group: 'portada',
    }),
    defineField({
      name: 'ordenPortada',
      title: 'Ordre a la portada',
      type: 'number',
      initialValue: 0,
      description: 'Número més baix = primer lloc a la portada.',
      group: 'portada',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          {title: 'Projectes', value: 'Proyectos'},
          {title: 'Materials', value: 'Materiales'},
          {title: 'Formacions', value: 'Formaciones'},
          {title: 'Tallers', value: 'Talleres'},
        ],
        layout: 'radio',
      },
      group: 'taxonomia',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategoria (només Materials)',
      type: 'string',
      options: {
        list: [
          {title: 'Guies i recursos didàctics', value: 'Guías y recursos didácticos'},
          {title: 'Jocs', value: 'Juegos'},
          {title: 'Publicacions', value: 'Publicaciones'},
          {title: 'Campanyes', value: 'Campañas'},
        ],
      },
      group: 'taxonomia',
      hidden: ({document}) => document?.category !== 'Materiales',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.category === 'Materiales' && !value) {
            return 'Obligatori quan la categoria és Materials'
          }
          return true
        }),
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetes',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      group: 'taxonomia',
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'descriptionLong',
      title: 'Descripció llarga',
      type: 'array',
      of: [blockContent],
      group: 'detall',
    }),
    defineField({
      name: 'miTrabajo',
      title: 'La meva feina',
      type: 'text',
      rows: 3,
      group: 'detall',
    }),
    defineField({
      name: 'autoriaInstitucional',
      title: 'Autoria institucional',
      type: 'text',
      rows: 2,
      group: 'detall',
    }),
    defineField({
      name: 'year',
      title: 'Any',
      type: 'string',
      description: 'Permet valors com «2023» o «2023–24».',
      group: 'detall',
    }),
    defineField({
      name: 'externalLink',
      title: 'Enllaç extern',
      type: 'url',
      group: 'detall',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'videos',
      title: 'Vídeos',
      description: 'Pot no contenir cap vídeo.',
      type: 'array',
      of: [videoMember],
      group: 'multimedia',
    }),
    defineField({
      name: 'galeria',
      title: 'Galeria d’imatges',
      description: 'Fotos addicionals de la pàgina de detall. Pot no contenir cap.',
      type: 'array',
      of: [imageMember],
      group: 'multimedia',
    }),
    defineField({
      name: 'documents',
      title: 'Documents',
      description: 'Arxius descarregables. Pot no contenir cap.',
      type: 'array',
      of: [documentMember],
      group: 'multimedia',
    }),
    defineField({
      name: 'boton',
      title: 'Botó d’acció',
      type: 'object',
      group: 'boto',
      fields: [
        defineField({
          name: 'visible',
          title: 'Visible',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'label',
          title: 'Text del botó',
          type: 'string',
          initialValue: 'Més informació',
          description: 'Editable. Exemples: «Més informació», «Descarrega la guia».',
        }),
        defineField({
          name: 'tipo',
          title: 'Tipus',
          type: 'string',
          options: {
            list: [
              {title: 'Enllaç extern', value: 'enlace'},
              {title: 'Descarrega', value: 'descarga'},
            ],
            layout: 'radio',
          },
          initialValue: 'enlace',
        }),
        defineField({
          name: 'url',
          title: 'URL (si el tipus és «Enllaç extern»)',
          type: 'url',
          validation: (rule) => rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
          name: 'file',
          title: 'Arxiu (si el tipus és «Descarrega»)',
          type: 'file',
          options: {accept: 'application/pdf,application/msword'},
        }),
      ],
      validation: (rule) =>
        rule.custom((value) => {
          if (!value?.visible) return true
          if (value.tipo === 'descarga' && !value.file) {
            return 'Si el botó és visible i de descàrrega, cal un arxiu.'
          }
          if (value.tipo === 'enlace' && !value.url) {
            return 'Si el botó és visible i d’enllaç, cal una URL.'
          }
          return true
        }),
    }),
    defineField({
      name: 'elaboratPer',
      title: 'Elaborat per',
      type: 'text',
      rows: 2,
      group: 'flex',
    }),
    defineField({
      name: 'dissenyatPer',
      title: 'Dissenyat i maquetat per',
      type: 'text',
      rows: 2,
      group: 'flex',
    }),
    defineField({
      name: 'sections',
      title: 'Seccions lliures',
      description:
        'Afegeix blocs de títol + text per a qualsevol informació extra sense tocar el codi (equip, premis, col·laboradors…).',
      type: 'array',
      of: [sectionMember],
      group: 'flex',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
  },
})