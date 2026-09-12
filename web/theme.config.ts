import { defineThemeConfig } from '@utils/defineThemeConfig'
import previewImage from '@assets/img/social-preview-image.png'
import logoImage from '@assets/img/logo.svg'

export default defineThemeConfig({
  name: 'Clara Martínez Hernández',
  id: 'clara-martinez-website',
  logo: logoImage,
  seo: {
    title: 'Clara Martínez Hernández | Educación, género y sexualidades',
    description:
      'Diseño y desarrollo proyectos educativos, materiales y procesos de formación desde una perspectiva feminista, interseccional y crítica.',
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
        label: 'Inici',
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
        label: 'Projectes',
        href: '/projects',
      },
      //TODO
     /* {
        label: 'Materials',
        type: 'dropdown',
        items: [
          {
            label: 'Accessibility statement',
            href: '/accessibility-statement',
          },
          {
            label: 'Accessible components',
            href: '/accessible-components',
          },
          {
            label: 'Accessible launcher',
            href: '/accessible-launcher',
          },
          {
            label: 'Color contrast checker',
            href: '/color-contrast-checker',
          },
          {
            label: 'Markdown page',
            href: '/markdown-page',
          },
          {
            label: 'MDX page',
            href: '/mdx-page',
          },
          {
            label: '404 page',
            href: '/404',
          },
          {
            label: 'Sitemap',
            href: '/sitemap',
          },
        ],
      },*/
      {
        type: 'link',
        label: 'Contact',
        href: '/contact',
      },
      {
        type: 'link',
        label: 'Visita el meu perfil de LinkedIn, s’obre en una pestanya nova',
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
