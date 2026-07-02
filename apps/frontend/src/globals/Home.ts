import type { GlobalConfig } from 'payload'

export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home Page',
  admin: {
    description: 'Content shown on the homepage.',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'heading', type: 'text', required: true },
            { name: 'subheading', type: 'text' },
            {
              name: 'animation',
              type: 'group',
              label: 'Homepage Animation',
              admin: {
                description:
                  'Optional — the interactive Rive animation shown on the homepage hero. Leave blank if not using one.',
              },
              fields: [
                { name: 'title', type: 'text' },
                {
                  name: 'stateMachine',
                  type: 'text',
                  admin: { description: 'The Rive state machine name, e.g. "State Machine 1".' },
                },
                {
                  name: 'riveFile',
                  type: 'upload',
                  relationTo: 'media',
                  filterOptions: { mimeType: { contains: 'riv' } },
                },
              ],
            },
            {
              name: 'supporterHeading',
              type: 'text',
              admin: { description: 'Heading shown above the supporter logos section.' },
            },
            {
              name: 'supporters',
              type: 'relationship',
              relationTo: 'supporters',
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
