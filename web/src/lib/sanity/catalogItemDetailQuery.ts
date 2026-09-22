import { fetchAllInBatches } from './fetchAllInBatchesQuery'
import { catalogItemCardFields } from './catalogItemsQuery'
import type { CatalogItem, CatalogItemCategory } from './catalogItemsQuery'
import type { SanityImage } from './imageUrlBuilder'
import type { PortableTextBlock } from '@lib/sanity/renders/portableTextRender'
import type { Locale } from '@utils/i18n'

/** Full document of one catalog item: the card fields plus everything the detail page shows. */
export interface CatalogItemDetail {
  slug: string
  data: CatalogItem['data'] & {
    /** Long description as Portable Text; render it with `portableTextToHtml`. */
    descriptionLong: PortableTextBlock[]
    institutionalAuthorship: string | null
    /** Free text: allows values such as "2023" or "2023–24". */
    year: string | null
    externalLink: string | null
    // Multimedia (file fields come resolved to their CDN url)
    /** Each video has either an external `url` or an uploaded `fileUrl`, never both. */
    videos: { title: string | null; url: string | null; fileUrl: string | null }[]
    gallery: (SanityImage & { alt: string })[]
    documents: { title: string | null; fileUrl: string | null }[]
    /** Optional call to action: a link (`url`) or a download (`fileUrl`), depending on `type`. */
    button: {
      visible: boolean | null
      label: string | null
      type: 'link' | 'download' | null
      url: string | null
      fileUrl: string | null
    } | null
    // Flexible information
    /** Credits: who made it and who designed and laid it out. */
    createdBy: string | null
    designedBy: string | null
    /** Free extra blocks (team, awards, collaborators…) added from the Studio. */
    sections: { title: string | null; text: string | null }[]
  }
}

// Built on the card fields; `file` fields resolve to their CDN url and lists
// come back as [] instead of null.
const catalogItemDetailProjection = `{
  "slug": slug.current,
  "data": {${catalogItemCardFields},
    descriptionLong,
    institutionalAuthorship,
    year,
    externalLink,
    "videos": coalesce(videos[]{ title, url, "fileUrl": file.asset->url }, []),
    "gallery": coalesce(gallery, []),
    "documents": coalesce(documents[]{ title, "fileUrl": file.asset->url }, []),
    button{ visible, label, type, url, "fileUrl": file.asset->url },
    createdBy,
    designedBy,
    "sections": coalesce(sections[]{ title, text }, [])
  }
}`

/**
 * Full catalog items of one category, for the detail pages.
 *
 * @description One query per category and language (called once from the detail view), not one
 * per document.
 *
 * @param locale - Language of the documents to fetch.
 * @param category - Catalog category to fetch.
 * @returns The full documents ordered by slug.
 */
export async function getCatalogItemDetailsByCategory(
  locale: Locale,
  category: CatalogItemCategory,
): Promise<CatalogItemDetail[]> {
  return fetchAllInBatches<CatalogItemDetail>(
    '*[_type == "catalogItem" && category == $category && language == $locale] | order(slug.current asc, _id asc) ',
    catalogItemDetailProjection,
    { locale, category },
  )
}
