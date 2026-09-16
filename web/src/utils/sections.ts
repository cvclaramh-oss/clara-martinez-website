export const COMING_SOON_SECTIONS = [
  'materials',
  'materials-guides',
  'materials-games',
  'materials-publications',
  'materials-campaigns',
  'formations',
  'workshops',
  'bio',
] as const

export const SECTION_LABEL_KEYS: Record<string, string> = {
  materials: 'nav.materials.label',
  'materials-guides': 'nav.materials.guides',
  'materials-games': 'nav.materials.games',
  'materials-publications': 'nav.materials.publications',
  'materials-campaigns': 'nav.materials.campaigns',
  formations: 'nav.formations',
  workshops: 'nav.workshops',
  bio: 'nav.bio',
}