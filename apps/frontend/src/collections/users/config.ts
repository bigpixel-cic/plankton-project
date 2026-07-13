import { checkRole } from '@/app/lib/payload/utils'
import type { User } from '@/payload-types'
import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/roles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'firstName',
  },
  auth: true,
  fields: [
    { name: 'firstName', type: 'text' },
    { name: 'lastName', type: 'text' },
    { name: 'picture', type: 'upload', relationTo: 'media' },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'User', value: 'user' },
      ],
      admin: { description: 'Set the access the user has by defining a role.' },
      hooks: {
        beforeChange: [protectRoles],
      },
      access: {
        update: ({ req: { user } }) => checkRole(['admin'], user as User),
        read: () => true,
      },
    },
  ],
}
