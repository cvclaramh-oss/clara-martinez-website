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
      name: 'title',
      title: 'Títol (opcional)',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Enllaç (YouTube / Vimeo)',
      type: 'url',
      description: 'O l’enllaç extern, o el fitxer. Mai ambdós.',
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
      title: 'title',
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
  name: 'documentFile',
  title: 'Document',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
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
  name: 'section',
  title: 'Secció',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Títol de la secció',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 4,
    }),
  ],
})

export const catalogItem = defineType({
  name: 'catalogItem',
  title: 'Element',
  type: 'document',
  icon: DocumentTextIcon,
  fieldsets: [
    {name: 'card', title: 'Targeta (portada del grid)', options: {collapsible: true, collapsed: false}},
    {name: 'home', title: 'Portada (inici)', options: {collapsible: true, collapsed: false}},
    {name: 'taxonomy', title: 'Taxonomia i filtres', options: {collapsible: true, collapsed: false}},
    {name: 'details', title: 'Detall', options: {collapsible: true, collapsed: false}},
    {name: 'multimedia', title: 'Multimèdia', options: {collapsible: true, collapsed: false}},
    {name: 'button', title: 'Botó (descarrega / enllaç)', options: {collapsible: true, collapsed: false}},
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
      fieldset: 'card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítol descriptiu',
      type: 'string',
      description: 'Text breu que es mostra sota el títol a la miniatura.',
      fieldset: 'card',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imatge de portada',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'card',
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
      options: {source: (doc) => `${doc.title}-${doc.language}`, maxLength: 96},
      fieldset: 'card',
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
      name: 'featured',
      title: 'Destacat a la portada (inici)',
      type: 'boolean',
      initialValue: false,
      fieldset: 'home',
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Ordre a la portada',
      type: 'number',
      initialValue: 0,
      description: 'Número més baix = primer lloc a la portada.',
      fieldset: 'home',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          {title: 'Projectes', value: 'projects'},
          {title: 'Materials', value: 'materials'},
          {title: 'Formacions', value: 'formations'},
          {title: 'Tallers', value: 'workshops'},
        ],
        layout: 'radio',
      },
      fieldset: 'taxonomy',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subcategory',
      title: 'Subcategoria (només Materials)',
      type: 'string',
      options: {
        list: [
          {title: 'Guies i recursos didàctics', value: 'guides'},
          {title: 'Jocs', value: 'games'},
          {title: 'Publicacions', value: 'publications'},
          {title: 'Campanyes', value: 'campaigns'},
          {title: 'Audiovisuals', value: 'audiovisual'},
        ],
      },
      fieldset: 'taxonomy',
      hidden: ({document}) => document?.category !== 'materials',
      validation: (rule) =>
        rule.custom((value, context) => {
          if (context.document?.category === 'materials' && !value) {
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
      fieldset: 'taxonomy',
      validation: (rule) => rule.unique(),
    }),
    defineField({
      name: 'descriptionLong',
      title: 'Descripció llarga',
      type: 'array',
      of: [blockContent],
      fieldset: 'details',
    }),
    defineField({
      name: 'myWork',
      title: 'La meva feina',
      type: 'text',
      rows: 3,
      fieldset: 'details',
    }),
    defineField({
      name: 'institutionalAuthorship',
      title: 'Autoria institucional',
      type: 'text',
      rows: 2,
      fieldset: 'details',
    }),
    defineField({
      name: 'year',
      title: 'Any',
      type: 'string',
      description: 'Permet valors com «2023» o «2023–24».',
      fieldset: 'details',
    }),
    defineField({
      name: 'externalLink',
      title: 'Enllaç extern',
      type: 'url',
      fieldset: 'details',
      validation: (rule) => rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'videos',
      title: 'Vídeos',
      description: 'Pot no contenir cap vídeo.',
      type: 'array',
      of: [videoMember],
      fieldset: 'multimedia',
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria d’imatges',
      description: 'Fotos addicionals de la pàgina de detall. Pot no contenir cap.',
      type: 'array',
      of: [imageMember],
      fieldset: 'multimedia',
    }),
    defineField({
      name: 'documents',
      title: 'Documents',
      description: 'Arxius descarregables. Pot no contenir cap.',
      type: 'array',
      of: [documentMember],
      fieldset: 'multimedia',
    }),
    defineField({
      name: 'button',
      title: 'Botó d’acció',
      type: 'object',
      fieldset: 'button',
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
          name: 'type',
          title: 'Tipus',
          type: 'string',
          options: {
            list: [
              {title: 'Enllaç extern', value: 'link'},
              {title: 'Descarrega', value: 'download'},
            ],
            layout: 'radio',
          },
          initialValue: 'link',
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
          if (value.type === 'download' && !value.file) {
            return 'Si el botó és visible i de descàrrega, cal un arxiu.'
          }
          if (value.type === 'link' && !value.url) {
            return 'Si el botó és visible i d’enllaç, cal una URL.'
          }
          return true
        }),
    }),
    defineField({
      name: 'createdBy',
      title: 'Elaborat per',
      type: 'text',
      rows: 2,
      fieldset: 'flex',
    }),
    defineField({
      name: 'designedBy',
      title: 'Dissenyat i maquetat per',
      type: 'text',
      rows: 2,
      fieldset: 'flex',
    }),
    defineField({
      name: 'sections',
      title: 'Seccions lliures',
      description:
        'Afegeix blocs de títol + text per a qualsevol informació extra sense tocar el codi (equip, premis, col·laboradors…).',
      type: 'array',
      of: [sectionMember],
      fieldset: 'flex',
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