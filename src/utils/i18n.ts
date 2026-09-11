import ca from '../i18n/ca.json'
import es from '../i18n/es.json'
import { routes } from '../i18n/routes'

const translations = { ca, es }

export type Locale = keyof typeof translations

/**
 * Build a reverse index that maps every localized segment (plus the English
 * canonical names) back to the canonical route key.
 */
function buildSegmentIndex(): Map<string, string> {
  const index = new Map<string, string>()
  for (const locale of Object.keys(routes) as Locale[]) {
    for (const [canonical, segment] of Object.entries(routes[locale])) {
      index.set(segment, canonical)
      index.set(canonical, canonical)
    }
  }
  return index
}

const segmentToCanonical = buildSegmentIndex()

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

/**
 * Translate a path to a given locale. Every known segment (localized or
 * English) is mapped to its canonical route name and rendered with the target
 * locale segment. Unknown segments (ids, page numbers, tags) are preserved.
 */
export function localizeUrl(path: string, locale: Locale): string {
  const isEs = path === '/es' || path.startsWith('/es/')
  const rest = isEs ? path.slice(3) : path
  const parts = rest.split('/').filter(Boolean)

  if (parts.length === 0) {
    return locale === 'es' ? '/es/' : '/'
  }

  const routeMap = routes[locale] as Record<string, string>
  const translated = parts.map((segment) => {
    const canonical = segmentToCanonical.get(segment)
    return canonical ? (routeMap[canonical] ?? segment) : segment
  })

  return (locale === 'es' ? '/es/' : '/') + translated.join('/')
}

export function getHref(baseHref: string, isExternal: boolean, locale: string): string {
  if (isExternal) return baseHref
  const path = baseHref.startsWith('/') ? baseHref : `/${baseHref}`
  return localizeUrl(path, locale as Locale)
}

/**
 * Return the canonical route name that a URL segment (localized or English)
 * maps to, if any. Used to derive breadcrumb labels from translated segments.
 */
export function getSegmentCanonical(segment: string): string | undefined {
  return segmentToCanonical.get(segment)
}