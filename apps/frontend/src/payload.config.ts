import { postgresAdapter } from '@payloadcms/db-postgres'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import {
  Categories,
  Media,
  Pages,
  Posts,
  Resources,
  SocialMediaAccounts,
  Supporters,
  Tags,
  Trustees,
  Users,
} from './collections'
import { About, Blog, Contact, Footer, Home, Navigation, Resource } from './globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Posts,
    Pages,
    Users,
    Media,
    SocialMediaAccounts,
    Resources,
    Supporters,
    Trustees,
    Categories,
    Tags,
  ],
  globals: [Home, About, Blog, Contact, Resource, Navigation, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    schemaName: 'payload',
  }),
  sharp,
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.R2_BUCKET as string,
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
        },
        endpoint: `https://${process.env.R2_ENDPOINT}`,
        region: 'auto',
      },
    }),
    seoPlugin({
      collections: ['posts', 'pages'],
      globals: ['home', 'about', 'contact', 'blog-page', 'resources-page'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }) => `The Plankton Project — ${doc?.title ?? doc?.heading ?? ''}`,
      generateDescription: ({ doc }) => doc?.excerpt ?? doc?.subheading ?? '',
    }),
  ],
})
