import ca from '../i18n/ca.json'
import es from '../i18n/es.json'
import { routes } from '../i18n/routes'

const translations = { ca, es }

export function getLangFromUrl(url: URL): string {
  return url.pathname.startsWith('/es') ? 'es' : 'ca'
}

export function useTranslations(locale: string) {
  return function t(key: string): string {
    const keys = key.split('.')
    let value: any = translations[locale as keyof typeof translations]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }
}

export function useTranslatedPath(locale: string) {
  return function translatePath(path: string): string {
    if (path === '/') return locale === 'ca' ? '/' : '/es/'
    
    const routeName = path.replace(/^\//, '')
    
    const routeMap = routes[locale as keyof typeof routes]
    const translated = routeMap?.[routeName as keyof typeof routeMap]
    
    if (translated) {
      return locale === 'ca' ? `/${translated}` : `/es/${translated}`
    }
    
    return path
  }
}