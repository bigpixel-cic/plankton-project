import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

import { Footnote, YouTubeVideo } from '../blocks'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'mainImage', type: 'upload', relationTo: 'media' },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ inlineBlocks: [YouTubeVideo, Footnote] }),
        ],
      }),
    },
    {
      name: 'trustees',
      type: 'relationship',
      relationTo: 'trustees',
      hasMany: true,
    },
  ],
}
