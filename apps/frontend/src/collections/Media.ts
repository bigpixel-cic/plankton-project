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
  ],
  upload: true,
}
