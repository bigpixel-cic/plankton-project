'use client'
import type { User } from '@/payload-types'
import { useAuth } from '@payloadcms/ui'

const Greeting: React.FC = () => {
  const { user } = useAuth<User>()

  return <span>Hi, {user?.email}!</span>
}

export default Greeting
