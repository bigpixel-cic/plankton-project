import config from '@/payload.config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const getFooterData = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'footer',
    depth: 2,
  })
})

export const getNavbarData = cache(async () => {
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

export const getHomeData = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'home',
    depth: 2,
  })
})

export const getAboutData = cache(async () => {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'about',
    depth: 1,
  })
})
