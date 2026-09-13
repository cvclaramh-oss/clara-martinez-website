import {defineType, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons/Link'

export const link = defineType({
  name: 'link',
  title: 'Enllaç',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['http', 'https', 'mailto', 'tel']}),
    }),
  ],
})