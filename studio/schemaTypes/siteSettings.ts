import {defineType, defineField, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons/Cog'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
    }),
    defineField({
      name: 'shortBio',
      title: 'Short bio',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'profileImage',
      title: 'Profile image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [defineArrayMember({type: 'socialLink'})],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'welcomeText',
      title: 'Welcome text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cvFile',
      title: 'CV (PDF)',
      type: 'file',
      options: {accept: 'application/pdf'},
    }),
  ],
})