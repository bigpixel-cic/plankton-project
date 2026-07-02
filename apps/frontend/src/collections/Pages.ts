import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { Footnote, YouTubeVideo } from '../blocks'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'heading', type: 'text' },
    { name: 'subheading', type: 'text' },
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
  ],
}
