import { sanityClient } from './client'

const BATCH_SIZE = 50

/**
 * Fetches every document a GROQ selection matches, in batches of `BATCH_SIZE`.
 *
 * @description A query without a slice returns the whole result set in one response, which is subject to
 * API limits. Slicing keeps each response small however many documents there are. The selection must end in
 * a deterministic `order(...)` (ties broken by `_id`), otherwise batches can repeat or skip documents.
 *
 * @param selection - GROQ up to and including the `order(...)`, without slice or projection.
 * @param projection - GROQ projection applied to each document (e.g. `{ title }`), or an empty string.
 * @param params - Query parameters.
 * @returns Every matching document, in the order of the selection.
 */
export async function fetchAllInBatches<T>(
  selection: string,
  projection: string,
  params: Record<string, unknown> = {},
): Promise<T[]> {
  const documents: T[] = []
  for (let from = 0; ; from += BATCH_SIZE) {
    const batch = await sanityClient.fetch<T[]>(`${selection}[${from}...${from + BATCH_SIZE}]${projection}`, params)
    documents.push(...batch)
    if (batch.length < BATCH_SIZE) return documents
  }
}
