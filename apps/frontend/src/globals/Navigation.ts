import type { GlobalConfig } from 'payload'
import { linkFields } from '../fields/linkFields'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation',
  fields: [
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
