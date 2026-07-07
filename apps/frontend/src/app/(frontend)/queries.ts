import config from '@/payload.config'
import { getPayload } from 'payload'

export async function getHomeData() {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'home',
  })
}

export async function getFooterData() {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'footer',
  })
}

export async function getNavbarData() {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'navigation',
  })
}
