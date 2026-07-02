import type { GlobalConfig } from 'payload'

export const Resource: GlobalConfig = {
  slug: 'resource',
  label: 'Resources Page',
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'text' },
    { name: 'introText', type: 'richText' },
  ],
}
