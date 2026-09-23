/** Attributes for a link that opens an external destination in a new tab. */
export function getExternalLinkAttributes() {
  return { target: '_blank', rel: 'noopener noreferrer' } as const
}
