import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true },
            slugField(),
            { name: 'heading', type: 'text' },
            { name: 'subheading', type: 'text' },
            { name: 'content', type: 'richText' },
          ],
        },
        { label: 'SEO', fields: [] },
      ],
    },
  ],
}
