/** Matches studio/schemaTypes/project.ts `category` and `subcategory` field options. */
export const CATEGORY_LABEL_KEYS: Record<string, string> = {
  projects: 'nav.projects',
  materials: 'nav.materials.label',
  'materials-guides': 'nav.materials.guides',
  'materials-games': 'nav.materials.games',
  'materials-publications': 'nav.materials.publications',
  'materials-campaigns': 'nav.materials.campaigns',
  'materials-audiovisual': 'nav.materials.audiovisual',
  formations: 'nav.formations',
  workshops: 'nav.workshops',
}

/** Route segments that currently have no real page — show the generic "coming soon" placeholder. */
export const COMING_SOON_SECTIONS = [
  'materials',
  'materials-guides',
  'materials-games',
  'materials-publications',
  'materials-campaigns',
  'materials-audiovisual',
  'formations',
  'workshops',
  'bio',
] as const

// `bio` isn't a project category — it's a standalone page — so it's not in CATEGORY_LABEL_KEYS.
export const SECTION_LABEL_KEYS: Record<string, string> = {
  ...CATEGORY_LABEL_KEYS,
  bio: 'nav.bio',
}
