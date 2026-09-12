import {defineType, defineField} from 'sanity'
import {TranslateIcon} from '@sanity/icons/Translate'

export const locale = defineType({
  name: 'locale',
  title: 'Locale',
  type: 'document',
  icon: TranslateIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'IANA tag: "ca" o "es"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fallback',
      title: 'Fallback',
      type: 'reference',
      to: [{type: 'locale'}],
    }),
    defineField({
      name: 'default',
      title: 'Default',
      type: 'boolean',
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'tag'},
  },
})