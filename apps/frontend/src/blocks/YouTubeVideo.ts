import type { Block } from 'payload'

export const YouTubeVideo: Block = {
  slug: 'youTubeVideo',
  interfaceName: 'YouTubeVideoBlock',
  fields: [
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'Paste a full YouTube video URL.' },
    },
  ],
}
