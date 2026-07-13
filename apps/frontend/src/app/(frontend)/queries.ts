import { Post as PostType } from '@/payload-types'
import config from '@/payload.config'
import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getFooter = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'footer',
    depth: 2,
  })
})

export const getNavbar = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'navigation',
    depth: 1,
    populate: {
      pages: {
        heading: true,
        slug: true,
      },
      posts: {
        title: true,
        slug: true,
      },
    },
  })
})

export const getHomePage = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'home',
    depth: 2,
  })
})

export const getAboutPage = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'about',
    depth: 1,
  })
})

export const getResourcePage = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'resource',
    depth: 1,
  })
})

export const getResources = cache(async () => {
  const payload = await getPayload({ config })

  return payload.find({
    collection: 'resources',
    depth: 1,
    limit: 12,
  })
})

export const getContactPage = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'contact',
    depth: 2,
  })
})

export const getBlogPage = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'blog-page',
    depth: 2,
    select: {
      heading: true,
      subheading: true,
      featuredPost: true,
    },
    populate: {
      posts: {
        title: true,
        slug: true,
        coverImage: true,
        excerpt: true,
        tags: true,
      },
    },
  })
})

export const getPosts = cache(async () => {
  const payload = await getPayload({ config })

  return payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
  })
})

export const getPostSlugs = cache(async () => {
  const payload = await getPayload({ config })

  return payload.find({
    collection: 'posts',
    draft: false,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })
})

export const getPostBySlug = cache(async (slug: string) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    depth: 2,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
    select: {
      title: true,
      slug: true,
      date: true,
      author: true,
      category: true,
      tags: true,
      coverImage: true,
      content: true,
    },
    populate: {
      users: {
        firstName: true,
        lastName: true,
      },
      categories: { name: true },
      tags: { name: true },
    },
  })

  return result.docs?.[0] as null | PostType
})
