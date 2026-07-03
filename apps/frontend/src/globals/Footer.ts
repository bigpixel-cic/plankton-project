// globals/Footer.ts
import type { GlobalConfig } from 'payload'
import { linkFields } from '../fields'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  fields: [
    { name: 'organisationName', type: 'text' },
    { name: 'orgDetails', type: 'textarea' },
    {
      name: 'socialMedia',
      type: 'relationship',
      relationTo: 'social-media-accounts',
      hasMany: true,
    },
    {
      name: 'navigation',
      type: 'array',
      fields: linkFields,
      admin: {
        components: {
          RowLabel: '@/components/payload/LinkRowLabel',
        },
      },
    },
  ],
}
