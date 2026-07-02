import type { GlobalConfig } from 'payload'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'text' },
            { name: 'additionalText', type: 'textarea' },
            {
              name: 'socials',
              type: 'relationship',
              relationTo: 'social-media-accounts',
              hasMany: true,
            },
          ],
        },
        { label: 'SEO', fields: [] },
      ],
    },
  ],
}
