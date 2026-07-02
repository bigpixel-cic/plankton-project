import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'text' },
            { name: 'mainImage', type: 'upload', relationTo: 'media' },
            {
              name: 'content',
              type: 'richText',
              editor: lexicalEditor(),
            },
            {
              name: 'trustees',
              type: 'relationship',
              relationTo: 'trustees',
              hasMany: true,
            },
          ],
        },
        {
          label: 'SEO',
          fields: [],
        },
      ],
    },
  ],
}
