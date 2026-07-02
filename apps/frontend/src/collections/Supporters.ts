import type { CollectionConfig } from 'payload'

export const Supporters: CollectionConfig = {
  slug: 'supporters',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'website',
      type: 'text',
      admin: { description: "Optional link to the supporter's website." },
    },
    { name: 'logo', type: 'upload', relationTo: 'media' },
  ],
}
