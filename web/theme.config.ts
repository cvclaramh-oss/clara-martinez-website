import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'
import logoImage from '@assets/img/logo.svg'

export default defineThemeConfig({
  name: 'Clara Martínez Hernández',
  id: 'clara-martinez-website',
  logo: logoImage,
  seo: {
    title: 'meta.title',
    description: 'meta.description',
    author: 'Clara Martínez Hernández',
    image: previewImage, // Can also be a string e.g. '/social-preview-image.png', //TODO
  },
  navigation: {
    darkmode: true,
    items: [
      {
        type: 'link',
        label: 'nav.home',
        href: '/',
      },
      {
        type: 'link',
        label: 'nav.projects',
        href: '/projects',
      },
      {
        label: 'nav.materials.label',
        type: 'dropdown',
        href: '/materials',
        items: [
          {
            label: 'nav.materials.guides',
            href: '/materials-guides',
          },
          {
            label: 'nav.materials.games',
            href: '/materials-games',
          },
          {
            label: 'nav.materials.publications',
            href: '/materials-publications',
          },
          {
            label: 'nav.materials.campaigns',
            href: '/materials-campaigns',
          },
        ],
      },
      {
        type: 'link',
        label: 'nav.formations',
        href: '/formations',
      },
      {
        type: 'link',
        label: 'nav.workshops',
        href: '/workshops',
      },
      {
        type: 'link',
        label: 'nav.bio',
        href: '/bio',
      },
      {
        type: 'link',
        label: 'nav.contact',
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
})
