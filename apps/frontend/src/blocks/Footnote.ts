import type { Block } from 'payload'

export const Footnote: Block = {
  slug: 'footnote',
  interfaceName: 'FootnoteBlock',
  fields: [
    {
      name: 'text',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The footnote content — shown in the numbered list at the end of the article.',
      },
    },
  ],
}
