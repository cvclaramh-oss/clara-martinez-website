import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'
import logoImage from '@assets/img/logoImageRosa.svg'

export default defineThemeConfig({
  name: 'Clara Martínez Hernández',
  id: 'clara-martinez-website',
  logo: logoImage,
  seo: {
    title: 'meta.title',
    description: 'meta.description',
    author: 'Clara Martínez Hernández', 
    image: previewImage,
  },
  navigation: {
    darkmode: true,
    language: true,
    items: [
      {
        type: 'link',
        label: 'home.label',
        href: '/',
      },
      {
        type: 'link',
        label: 'projects.label',
        href: '/projects',
      },
      {
        label: 'materials.label',
        type: 'dropdown',
        items: [
          {
            label: 'materials.all.label',
            href: '/materials',
          },
          {
            label: 'materials.guides.label',
            href: '/materials-guides',
          },
          {
            label: 'materials.games.label',
            href: '/materials-games',
          },
          {
            label: 'materials.publications.label',
            href: '/materials-publications',
          },
          {
            label: 'materials.campaigns.label',
            href: '/materials-campaigns',
          },
          {
            label: 'materials.audiovisual.label',
            href: '/materials-audiovisual',
          },
        ],
      },
      {
        type: 'link',
        label: 'formations.label',
        href: '/formations',
      },
      {
        type: 'link',
        label: 'workshops.label',
        href: '/workshops',
      },
      {
        type: 'link',
        label: 'bio.label',
        href: '/bio',
      },
      {
        type: 'link',
        label: 'contact.label',
        href: '/contact',
      },
    ],
  },
  socials: [
    { label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/clara-martinez-/',
      icon: 'lucide:linkedin',
      external: true }
  ],
  contactEmail: 'hola@claramartinezhernandez.net',
})
