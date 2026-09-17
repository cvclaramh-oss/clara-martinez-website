// Minimal Portable Text -> HTML renderer.
// The `descriptionLong` schema only allows: paragraph/h2 styles, bullet
// lists, and bold/italic/link marks (see studio/schemaTypes/project.ts) —
// small enough that a hand-rolled renderer beats adding a dependency for it.

interface PortableTextSpan {
  text?: string
  marks?: string[]
}

interface PortableTextMarkDef {
  _key: string
  _type: string
  href?: string
}

export interface PortableTextBlock {
  _type: string
  style?: string
  listItem?: string
  children?: PortableTextSpan[]
  markDefs?: PortableTextMarkDef[]
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderSpan(span: PortableTextSpan, markDefs: PortableTextMarkDef[]): string {
  let text = escapeHtml(span.text ?? '')
  for (const mark of span.marks ?? []) {
    if (mark === 'strong') text = `<strong>${text}</strong>`
    else if (mark === 'em') text = `<em>${text}</em>`
    else {
      const link = markDefs.find((def) => def._key === mark && def._type === 'link')
      if (link?.href) text = `<a href="${escapeHtml(link.href)}">${text}</a>`
    }
  }
  return text
}

export function portableTextToHtml(blocks?: PortableTextBlock[]): string {
  if (!blocks?.length) return ''

  const html: string[] = []
  let listOpen = false

  for (const block of blocks) {
    if (block._type !== 'block') continue

    const isListItem = block.listItem === 'bullet'
    if (isListItem && !listOpen) {
      html.push('<ul>')
      listOpen = true
    } else if (!isListItem && listOpen) {
      html.push('</ul>')
      listOpen = false
    }

    const inner = (block.children ?? []).map((span) => renderSpan(span, block.markDefs ?? [])).join('')
    if (isListItem) html.push(`<li>${inner}</li>`)
    else if (block.style === 'h2') html.push(`<h2>${inner}</h2>`)
    else html.push(`<p>${inner}</p>`)
  }

  if (listOpen) html.push('</ul>')
  return html.join('\n')
}
