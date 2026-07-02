import type { CollectionConfig } from 'payload'

export const SocialMediaAccounts: CollectionConfig = {
  slug: 'social-media-accounts',
  admin: { useAsTitle: 'platform' },
  fields: [
    {
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        { label: 'Bluesky', value: 'bluesky' },
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'Instagram', value: 'instagram' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'YouTube', value: 'youtube' },
      ],
    },
    { name: 'link', type: 'text' },
    { name: 'icon', type: 'upload', relationTo: 'media', required: true },
  ],
}
