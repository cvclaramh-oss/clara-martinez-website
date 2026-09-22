export interface CatalogTag {
  text: string
  slug: string
}

/** Distinct tags present in a set of catalog items, sorted by their display text. */
export function getCatalogTags<T extends { data: { tags: CatalogTag[] } }>(items: T[]): CatalogTag[] {
  const bySlug = new Map<string, CatalogTag>()
  for (const item of items) {
    for (const tag of item.data.tags) {
      bySlug.set(tag.slug, tag)
    }
  }
  return [...bySlug.values()].sort((a, b) => a.text.localeCompare(b.text))
}

/** Items that carry the given tag slug. */
export function filterByTagSlug<T extends { data: { tags: CatalogTag[] } }>(items: T[], tagSlug: string): T[] {
  return items.filter((item) => item.data.tags.some((tag) => tag.slug === tagSlug))
}
