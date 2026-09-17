import { sanityClient } from './client'
import type { SanityImage } from './imageUrlBuilder'
import type { PortableTextBlock } from '@lib/sanity/renders/portableTextRender'
import type { Locale } from '@utils/i18n'

/** Matches studio/schemaTypes/project.ts `category` field options. */
export type ProjectCategory = 'projects' | 'materials' | 'formations' | 'workshops'

export interface CatalogItem {
  slug: string
  data: {
    title: string
    subtitle: string
    author: string
    tags: string[]
    image: SanityImage
    imageAlt: string
    descriptionLong: PortableTextBlock[]
  }
}

// Shared GROQ projection: shapes every result as { slug, data } so the rest
// of the site (Card props, getTags, filterByTagSlug…) all read the same shape.
const catalogItemProjection = `{
  "slug": slug.current,
  "data": {
    title,
    subtitle,
    "author": coalesce(createdBy, ""),
    "tags": coalesce(tags, []),
    "image": image,
    "imageAlt": image.alt,
    descriptionLong
  }
}`

/**
 * Projects of one category (listing + detail pages).
 *
 * @description One parameterized function instead of getProjects/getMaterials/
 * getFormations/getWorkshops — those would all run the same query with only
 * the category filter changing.
 */
export async function getProjectsByCategory(locale: Locale, category: ProjectCategory): Promise<CatalogItem[]> {
  return sanityClient.fetch<CatalogItem[]>(
    `*[_type == "project" && category == $category && language == $locale] | order(slug.current asc) ${catalogItemProjection}`,
    { locale, category },
  )
}

/** Cross-category picks for the homepage (any category, editor-curated via "featured"). */
export async function getFeaturedProjects(locale: Locale): Promise<CatalogItem[]> {
  return sanityClient.fetch<CatalogItem[]>(
    `*[_type == "project" && language == $locale && featured == true] | order(featuredOrder asc) ${catalogItemProjection}`,
    { locale },
  )
}
