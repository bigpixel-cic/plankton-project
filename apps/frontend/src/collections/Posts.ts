import { BlocksFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'

import { YouTubeVideo } from '../blocks/YouTubeVideo'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: { useAsTitle: 'title' },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'date', type: 'date', defaultValue: () => new Date().toISOString() },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    { name: 'tags', type: 'relationship', relationTo: 'tags', hasMany: true },
    { name: 'excerpt', type: 'textarea' },
    { name: 'coverImage', type: 'upload', relationTo: 'media' },
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({ inlineBlocks: [YouTubeVideo] }),
        ],
      }),
    },
  ],
}
