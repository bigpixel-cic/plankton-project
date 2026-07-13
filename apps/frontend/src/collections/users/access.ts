import { checkRole } from '@/app/lib/payload/utils'
import type { Access } from 'payload'

export const admin: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin'], user)) {
      return true
    }
  }

  return false
}

export const anyone: Access = () => true

export const editor: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user)) {
      return true
    }
  }

  return false
}

export const user: Access = ({ req: { user } }) => {
  if (user) {
    if (checkRole(['admin', 'editor'], user)) {
      return true
    }

    return {
      id: { equals: user.id },
    }
  }

  return false
}
