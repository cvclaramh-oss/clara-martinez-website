import type { TranslationKey } from '@utils/i18n'

/** Matches studio/schemaTypes/catalogItem.ts `category` and `subcategory` field options. */
export const CATEGORY_LABEL_KEYS: Record<string, TranslationKey> = {
  projects: 'projects.label',
  materials: 'materials.label',
  'materials-guides': 'materials.guides.label',
  'materials-games': 'materials.games.label',
  'materials-publications': 'materials.publications.label',
  'materials-campaigns': 'materials.campaigns.label',
  'materials-audiovisual': 'materials.audiovisual.label',
  formations: 'formations.label',
  workshops: 'workshops.label',
}

/** Route segments that currently have no real page — show the generic "coming soon" placeholder. */
export const COMING_SOON_SECTIONS = ['bio'] as const

// `bio` isn't a catalogItem category — it's a standalone page — so it's not in CATEGORY_LABEL_KEYS.
export const SECTION_LABEL_KEYS: Record<string, TranslationKey> = {
  ...CATEGORY_LABEL_KEYS,
  bio: 'bio.label',
}
