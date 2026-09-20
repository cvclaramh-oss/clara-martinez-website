import { createClient } from '@sanity/client'

/**
 * Sanity client.
 *
 * @description The `production` dataset is public, so no API token is needed
 * for these read-only build-time queries. `useCdn: false` because this is a
 * static build — we want the freshest content baked in, not a cached copy.
 */
export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: '2026-09-17',
  useCdn: false,
})
