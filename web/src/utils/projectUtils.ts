import { slugify } from './slugify'

export const PROJECTS_PAGE_SIZE = 6

export interface Tag {
  label: string
  slug: string
}

export function getTags<T extends { data: { tags: string[] } }>(projects: T[]): Tag[] {
  const labels = [...new Set(projects.flatMap((project) => project.data.tags))]
  return labels
    .sort((a, b) => a.localeCompare(b))
    .map((label) => ({ label, slug: slugify(label) }))
}

export function filterByTagSlug<T extends { data: { tags: string[] } }>(projects: T[], tagSlug: string): T[] {
  return projects.filter((project) => project.data.tags.map((tag) => slugify(tag)).includes(tagSlug))
}