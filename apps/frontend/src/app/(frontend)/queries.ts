import config from '@/payload.config'
import { getPayload } from 'payload'

export async function getHomeData() {
  const payload = await getPayload({ config })

  return payload.findGlobal({
    slug: 'home',
  })
}
