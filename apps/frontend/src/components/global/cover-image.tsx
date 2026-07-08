// components/media/cover-image.tsx
import { isPopulated } from '@/app/lib/payload/utils'
import type { Media } from '@/payload-types'
import Image from 'next/image'

type ImageSizeName = 'thumbnail' | 'card' | 'hero'

type Props = {
  image: number | Media | null | undefined
  size: ImageSizeName
  alt?: string
  className?: string
  priority?: boolean
}

// Falls back to the original upload if the named size wasn't generated
// (e.g. the source was smaller than that size's target dimensions).
function resolveVariant(media: Media, size: ImageSizeName) {
  const variant = media.sizes?.[size]
  if (variant?.url && variant.width && variant.height) {
    return { url: variant.url, width: variant.width, height: variant.height }
  }
  return { url: media.url, width: media.width, height: media.height }
}

export function CoverImage({ image, size, alt, className, priority }: Props) {
  if (!isPopulated<Media>(image)) return null

  const { url, width, height } = resolveVariant(image, size)
  if (!url || !width || !height) return null

  return (
    <Image
      src={url}
      width={width}
      height={height}
      alt={alt ?? image.alt ?? ''}
      className={className}
      priority={priority}
      style={{
        objectPosition: `${image.focalX ?? '50%'} ${image.focalY ?? '50%'}`,
      }}
    />
  )
}
