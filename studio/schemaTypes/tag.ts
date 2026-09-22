import {defineType, defineField} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const tag = defineType({
  name: 'tag',
  title: 'Etiqueta',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'ca',
      title: 'Text (català)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'es',
      title: 'Text (castellà)',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slugCa',
      title: 'Slug (català)',
      type: 'slug',
      options: {source: 'ca', maxLength: 96},
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
      name: 'slugEs',
      title: 'Slug (castellà)',
      type: 'slug',
      options: {source: 'es', maxLength: 96},
      validation: (rule) =>
        rule.required().custom((slug) => {
          if (!slug?.current) return 'Required'
          if (!/^[a-z0-9-]+$/.test(slug.current)) {
            return 'Slug must be lowercase with hyphens only'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {ca: 'ca', es: 'es'},
    prepare: ({ca, es}) => ({title: `${ca} / ${es}`}),
  },
})
