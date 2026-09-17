import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from './client'

const imageBuilder = createImageUrlBuilder(sanityClient)

export interface SanityImage {
  asset: { _ref: string }
  hotspot?: { x: number; y: number }
}

/**
 * Builds a Sanity CDN image URL cropped to the exact size the caller needs.
 *
 * @description Astro's <Image> doesn't optimize remote domains it doesn't
 * know about (cdn.sanity.io isn't in astro.config's image.domains) — it just
 * passes the src through and lets the browser scale it to fit the given
 * width/height attributes. So the size requested here IS the real delivered
 * resolution: always match it to where the image is actually displayed,
 * don't reuse one fixed size everywhere (a small card crop stretched up to
 * a large hero looks blurry).
 */
export function urlFor(image?: SanityImage, width = 640, height = 360): string {
  if (!image?.asset) return ''
  return imageBuilder.image(image).width(width).height(height).fit('crop').auto('format').url()
}
