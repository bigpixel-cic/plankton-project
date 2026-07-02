import type { Field } from 'payload'

export const linkFields: Field[] = [
  {
    name: 'linkType',
    type: 'radio',
    defaultValue: 'href',
    options: [
      { label: 'URL', value: 'href' },
      { label: 'Site Section', value: 'section' },
      { label: 'Page', value: 'page' },
      { label: 'Post', value: 'post' },
    ],
  },
  { name: 'label', type: 'text', required: true },
  {
    name: 'href',
    type: 'text',
    admin: { condition: (_, siblingData) => siblingData?.linkType === 'href' },
  },
  {
    name: 'section',
    type: 'select',
    options: [
      { label: 'Home', value: '/' },
      { label: 'About', value: '/about' },
      { label: 'Contact', value: '/contact' },
      { label: 'Blog', value: '/blog' },
      { label: 'Resources', value: '/resources' },
    ],
    admin: { condition: (_, siblingData) => siblingData?.linkType === 'section' },
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    admin: { condition: (_, siblingData) => siblingData?.linkType === 'page' },
  },
  {
    name: 'post',
    type: 'relationship',
    relationTo: 'posts',
    admin: { condition: (_, siblingData) => siblingData?.linkType === 'post' },
  },
  { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
]
