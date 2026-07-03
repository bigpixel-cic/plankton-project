// collections/Media.ts
import type { CollectionConfig, TextFieldValidation } from 'payload'
import type { Media as MediaType } from '../payload-types'

const validateAlt: TextFieldValidation = (value, { siblingData }) => {
  const data = siblingData as Partial<MediaType>
  const isImage = typeof data?.mimeType === 'string' && data.mimeType.startsWith('image/')

  if (isImage && !value) {
    return 'Alt text is required for images.'
  }

  return true
}

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  admin: {
    description: 'Max. file size is no more 4.5MB',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: false,
      validate: validateAlt,
      admin: {
        description:
          'Required for images (accessibility/SEO). Optional for non-image files like animations or documents.',
      },
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
      admin: {
        description: 'Optional, use if you would like a small caption to appear under the image.',
      },
    },
  ],
  upload: {
    adminThumbnail: 'thumbnail',
    crop: true,
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 640, height: 640, position: 'centre', fit: 'cover' },
      { name: 'card', width: 830, height: undefined, position: 'centre', fit: 'cover' },
      { name: 'hero', width: 1280, height: 720, position: 'centre', fit: 'cover' },
    ],
  },
}
