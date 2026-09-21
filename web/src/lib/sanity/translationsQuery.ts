import { sanityClient } from './client'
import type { CatalogItemCategory, CatalogItemSubcategory } from './catalogItemsQuery'
import { getSegmentCanonical, localizeUrl } from '@utils/i18n'
import type { Locale } from '@utils/i18n'

const CATALOG_CATEGORIES: CatalogItemCategory[] = ['projects', 'materials', 'formations', 'workshops']

interface ItemTranslations {
  subcategory: CatalogItemSubcategory | null
  /** Slug of the same item in each language it is linked to (Studio "translation.metadata"). */
  slugs: Partial<Record<Locale, string>>
}

interface RawItem {
  category: CatalogItemCategory
  subcategory: CatalogItemSubcategory | null
  language: Locale
  slug: string
  translations: { language: Locale; slug: string }[] | null
}

// Translations are linked through a `translation.metadata` document that references every language version.
// Its `_key`s are not language codes, so the language comes from the referenced document.
const itemsQuery = `*[_type == "catalogItem"]{
  category,
  subcategory,
  language,
  "slug": slug.current,
  "translations": *[_type == "translation.metadata" && references(^._id)][0].translations[]{
    "language": value->language,
    "slug": value->slug.current
  }
}`

// One query for the whole build: every page needs it for the language switch.
let itemIndex: Promise<Map<string, ItemTranslations>> | undefined

function getItemIndex(): Promise<Map<string, ItemTranslations>> {
  itemIndex ??= sanityClient.fetch<RawItem[]>(itemsQuery).then((items) => {
    const index = new Map<string, ItemTranslations>()
    for (const item of items) {
      const slugs: Partial<Record<Locale, string>> = { [item.language]: item.slug }
      for (const translation of item.translations ?? []) slugs[translation.language] = translation.slug
      index.set(`${item.language}/${item.category}/${item.slug}`, { subcategory: item.subcategory, slugs })
    }
    return index
  })
  return itemIndex
}

/**
 * Url of the page a language switch should point to when the current page is the detail page of a catalog item.
 *
 * @description The slug of an item differs between languages, so translating only the route segments (as
 * `localizeUrl` does) points to a page that does not exist. This resolves the slug of the linked translation.
 * If the item has no linked translation, it points to the catalog page of the other language instead of a 404.
 *
 * @param pathname - Path of the current page.
 * @param target - Language the switch leads to.
 * @returns The url, or `undefined` when the current page is not the detail page of a catalog item.
 */
export async function getAlternateItemHref(pathname: string, target: Locale): Promise<string | undefined> {
  const isEs = pathname === '/es' || pathname.startsWith('/es/')
  const parts = (isEs ? pathname.slice(3) : pathname).split('/').filter(Boolean)
  if (parts.length !== 2) return undefined

  const category = getSegmentCanonical(parts[0]) as CatalogItemCategory | undefined
  if (!category || !CATALOG_CATEGORIES.includes(category)) return undefined

  const item = (await getItemIndex()).get(`${isEs ? 'es' : 'ca'}/${category}/${parts[1]}`)
  if (!item) return undefined

  const slug = item.slugs[target]
  if (slug) return localizeUrl(`/${category}/${slug}`, target)

  const catalogPage = category === 'materials' && item.subcategory ? `materials-${item.subcategory}` : category
  return localizeUrl(`/${catalogPage}`, target)
}
