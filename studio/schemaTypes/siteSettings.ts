import {defineType, defineField, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

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

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Configuració del lloc',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Nom del lloc',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítol (presentació curta)',
      type: 'string',
      description: 'El ganxo que acompanya el nom del lloc (home i capçaleres).',
    }),
    defineField({
      name: 'bio',
      title: 'Bio (text de la pàgina Bio)',
      type: 'array',
      of: [blockContent],
    }),
    defineField({
      name: 'profileImage',
      title: 'Foto de perfil',
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
    }),
    defineField({
      name: 'socialLinks',
      title: 'Enllaços socials',
      type: 'array',
      of: [defineArrayMember({type: 'socialLink'})],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Correu de contacte',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'cvFile',
      title: 'CV (PDF)',
      type: 'file',
      options: {accept: 'application/pdf'},
    }),
  ],
})