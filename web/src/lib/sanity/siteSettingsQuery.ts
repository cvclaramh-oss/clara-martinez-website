import { sanityClient } from './client'

let cvFileUrlPromise: Promise<string | null> | null = null

/**
 * URL of the CV PDF from the singleton `siteSettings` document, or null if it hasn't been uploaded yet.
 * Cached at module level: this is read on every page (the footer), and a static build would otherwise
 * repeat the same query once per page.
 */
export function getCvFileUrl(): Promise<string | null> {
  cvFileUrlPromise ??= sanityClient.fetch<string | null>('*[_type == "siteSettings"][0].cvFile.asset->url')
  return cvFileUrlPromise
}
