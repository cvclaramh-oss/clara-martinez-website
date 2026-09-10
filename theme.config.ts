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
  colors: {
    primary: '#d648ff',
    secondary: '#00d1b7',
    neutral: '#b9bec4',
    outline: '#ff4500',
  },
  navigation: {
    darkmode: true,
    items: [
      {
        type: 'link',
        label: 'nav.home',
        href: '/',
      },
      //TODO
    /*{
        type: 'link',
        label: 'Sobre Mi',
        href: '/about-me',
      },*/
      {
        type: 'link',
        label: 'nav.projects',
        href: '/projects',
      },
      //TODO
      /*{
        label: 'nav.materials',
        type: 'dropdown',
        items: [
          /*{
            label: 'Accessibility statement',
            href: '/accessibility-statement',
          },
          {
            label: 'sitemap.title',
            href: '/sitemap',
          },
        ],
      },*/
      {
        type: 'link',
        label: 'nav.contact',
        href: '/contact',
      },
      {
        type: 'link',
        label: 'nav.linkedin_sr',
        href: 'https://www.linkedin.com/in/clara-martinez-/',
        icon: 'lucide:linkedin',
        external: true,
        excludeFromLauncher: true,
      },
    ],
  },
  socials: [
    {
      label: 'Instagram',
      href: '/404',
      icon: 'lucide:instagram',
    }
  ],
})
