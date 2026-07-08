import config from '@/payload.config'
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
