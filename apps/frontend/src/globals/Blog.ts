import type { GlobalConfig } from 'payload'

export const Blog: GlobalConfig = {
  slug: 'blog-page',
  label: 'Blog Page',
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
              name: 'featuredPost',
              type: 'relationship',
              relationTo: 'posts',
              admin: { description: 'Optional — pin a specific post to the top of the blog page.' },
            },
          ],
        },
        { label: 'SEO', fields: [] },
      ],
    },
  ],
}
