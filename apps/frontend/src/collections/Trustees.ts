import type { CollectionConfig } from 'payload'

export const Trustees: CollectionConfig = {
  slug: 'trustees',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'position', type: 'text' },
    { name: 'portrait', type: 'upload', relationTo: 'media' },
    { name: 'bio', type: 'textarea' },
  ],
}
