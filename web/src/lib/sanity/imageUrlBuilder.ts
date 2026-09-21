import { createImageUrlBuilder } from '@sanity/image-url'
import { sanityClient } from './client'

const imageBuilder = createImageUrlBuilder(sanityClient)

export interface SanityImage {
  asset: { _ref: string }
  hotspot?: { x: number; y: number }
  /** Crop set in the Studio, as the fraction removed from each side. */
  crop?: { top: number; bottom: number; left: number; right: number }
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
 *
 * Without `height` the image keeps its own proportions (only the Studio crop, if any, applies).
 */
export function urlFor(image?: SanityImage, width = 640, height?: number): string {
  if (!image?.asset) return ''
  const builder = imageBuilder.image(image).width(width).auto('format')
  return (height ? builder.height(height).fit('crop') : builder).url()
}

/**
 * Size of a Sanity image once the Studio crop is applied, read from its asset id
 * (`image-<hash>-<width>x<height>-<format>`), so no extra query is needed to set
 * the `width` and `height` attributes of an image shown at its own proportions.
 */
export function imageSize(image?: SanityImage): { width: number; height: number } | undefined {
  const match = image?.asset?._ref.match(/-(\d+)x(\d+)-[a-z]+$/)
  if (!image || !match) return undefined
  const { top = 0, bottom = 0, left = 0, right = 0 } = image.crop ?? {}
  return {
    width: Math.round(Number(match[1]) * (1 - left - right)),
    height: Math.round(Number(match[2]) * (1 - top - bottom)),
  }
}
