import type { ImageMetadata } from 'astro'
import type { TranslationKey } from '@utils/i18n'

export type NavigationItem =
  | {
      type?: 'link'
      label: TranslationKey
      href: string
      external?: boolean
      highlight?: boolean
      icon?: string
      excludeFromLauncher?: boolean
    }
  | {
      type: 'dropdown'
      label: TranslationKey
      icon?: string
      items: {
        label: TranslationKey
        href: string
        external?: boolean
      }[]
      excludeFromLauncher?: boolean
    }

export type SocialItem = {
  label: string
  href: string
  icon: string
  external?: boolean
}

export type ThemeConfig = {
  name: string
  id: string
  logo?: ImageMetadata | null
  seo: {
    title: string
    subtitle?: string
    description?: string
    author?: string
    image?: ImageMetadata | string | null
  }
  colors?: {
    primary: string
    secondary: string
    neutral: string
    outline: string
  }
  navigation: {
    darkmode?: boolean
    items: NavigationItem[]
    language?: boolean
  }
  socials?: SocialItem[]
  contactEmail?: string
}

const defaultConfig: Omit<ThemeConfig, 'name' | 'id'> = {
  seo: {
    title: 'Clara Martínez Hernández | Educació, gènere i sexualitats',
    subtitle: 'Educació, gènere i sexualitats',
    description: "Disseny i desenvolupament de projectes educatius, materials i processos de formació des d'una perspectiva feminista, interseccional i crítica.",
    author: 'Clara Martínez Hernández',
    image: null,
  },
  navigation: {
    darkmode: true,
    items: [],
    language: true,
  },
  socials: [],
}

export function defineThemeConfig(config: ThemeConfig): ThemeConfig {
  return {
    ...config,
    seo: {
      ...defaultConfig.seo,
      ...config.seo,
    },
    socials: config.socials ?? defaultConfig.socials,
    navigation: {
      ...defaultConfig.navigation,
      ...config.navigation,
    },
  }
}
