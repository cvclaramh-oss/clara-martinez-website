import type { CatalogItemCategory, CatalogItemSubcategory } from '@lib/sanity/catalogItemsQuery'
import type { TranslationKey } from '@utils/i18n'

export const CATALOGS_PAGE_SIZE = 12

/** Route segments that list catalog items. The keys match the canonical names in `i18n/routes.ts`. */
export type CatalogPage =
  | 'projects'
  | 'materials'
  | 'materials-guides'
  | 'materials-games'
  | 'materials-publications'
  | 'materials-campaigns'
  | 'materials-audiovisual'
  | 'formations'
  | 'workshops'

interface CatalogPageConfig {
  /** Category the page lists. */
  category: CatalogItemCategory
  /** Only the items of this subcategory; without it the page lists the whole category. */
  subcategory?: CatalogItemSubcategory
  subtitleKey: TranslationKey
}

export const CATALOG_PAGES: Record<CatalogPage, CatalogPageConfig> = {
  projects: { category: 'projects', subtitleKey: 'projects.subtitle' },
  materials: { category: 'materials', subtitleKey: 'materials.subtitle' },
  'materials-guides': { category: 'materials', subcategory: 'guides', subtitleKey: 'materials.guides.subtitle' },
  'materials-games': { category: 'materials', subcategory: 'games', subtitleKey: 'materials.games.subtitle' },
  'materials-publications': {
    category: 'materials',
    subcategory: 'publications',
    subtitleKey: 'materials.publications.subtitle',
  },
  'materials-campaigns': {
    category: 'materials',
    subcategory: 'campaigns',
    subtitleKey: 'materials.campaigns.subtitle',
  },
  'materials-audiovisual': {
    category: 'materials',
    subcategory: 'audiovisual',
    subtitleKey: 'materials.audiovisual.subtitle',
  },
  formations: { category: 'formations', subtitleKey: 'formations.subtitle' },
  workshops: { category: 'workshops', subtitleKey: 'workshops.subtitle' },
}
