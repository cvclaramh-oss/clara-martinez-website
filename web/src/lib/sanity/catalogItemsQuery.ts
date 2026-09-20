import { sanityClient } from './client'
import type { SanityImage } from './imageUrlBuilder'
import type { Locale } from '@utils/i18n'

/** Matches studio/schemaTypes/catalogItem.ts `category` field options. */
export type CatalogItemCategory = 'projects' | 'materials' | 'formations' | 'workshops'

/** Matches studio/schemaTypes/catalogItem.ts `subcategory` field options (only for `materials`). */
export type CatalogItemSubcategory = 'guides' | 'games' | 'publications' | 'campaigns' | 'audiovisual'

/** Card shape: only what a card or a listing needs. The full document lives in catalogItemDetailQuery.ts. */
export interface CatalogItem {
  slug: string
  data: {
    /** Title of the item (also the link text of the card). */
    title: string
    /** The short description shown on the card. */
    subtitle: string
    /** Cover image, cropped by its hotspot through `urlFor`. */
    image: SanityImage
    /** Alternative text of the cover image (required in Sanity). */
    imageAlt: string
    category: CatalogItemCategory
    /** Only set when the category is `materials`. */
    subcategory: CatalogItemSubcategory | null
    /** Free-text labels; not validated, see ADR 0008. */
    tags: string[]
    /**
     * What Clara did in the project. Free text of up to 3 rows; the card shows only its first line
     * above the title.
     */
    myWork: string | null
    /** `createdBy` without nulls, used by listings. */
    author: string
  }
}

// GROQ fields of a card. Exported so the detail projection is built from the
// same list and the two can't drift apart.
export const catalogItemCardFields = `
    title,
    subtitle,
    "image": image,
    "imageAlt": image.alt,
    category,
    subcategory,
    "tags": coalesce(tags, []),
    myWork,
    "author": coalesce(createdBy, "")`

// Shared GROQ projection: shapes every result as { slug, data } so the rest
// of the site (Card props, getTags, filterByTagSlug…) all read the same shape.
const catalogItemProjection = `{
  "slug": slug.current,
  "data": {${catalogItemCardFields}
  }
}`

/**
 * Catalog Items of one category (listing pages; the detail page uses catalogItemDetailQuery.ts).
 *
 * @description One parameterized function instead of getProjects/getMaterials/
 * getFormations/getWorkshops — those would all run the same query with only
 * the category filter changing.
 */
export async function getCatalogItemsByCategory(locale: Locale, category: CatalogItemCategory): Promise<CatalogItem[]> {
  return sanityClient.fetch<CatalogItem[]>(
    `*[_type == "catalogItem" && category == $category && language == $locale] | order(slug.current asc) ${catalogItemProjection}`,
    { locale, category },
  )
}

/** Cross-category picks for the homepage (any category, editor-curated via "featured"). */
export async function getFeaturedCatalogItems(locale: Locale): Promise<CatalogItem[]> {
  return sanityClient.fetch<CatalogItem[]>(
    `*[_type == "catalogItem" && language == $locale && featured == true] | order(featuredOrder asc) ${catalogItemProjection}`,
    { locale },
  )
}
