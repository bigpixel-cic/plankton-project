import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: { useAsTitle: 'name' },
  fields: [
    { name: 'name', type: 'text', required: true },
    slugField({ useAsSlug: 'name' }),
    { name: 'description', type: 'textarea' },
  ],
}
