import type { GlobalConfig } from 'payload'

export const Resource: GlobalConfig = {
  slug: 'resource',
  label: 'Resources Page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'text' },
            { name: 'introText', type: 'richText' },
          ],
        },
        { label: 'SEO', fields: [] },
      ],
    },
  ],
}
