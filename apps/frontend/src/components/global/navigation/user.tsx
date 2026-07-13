import type { User } from '@/payload-types'
import Link from 'next/link'

export default function Greeting({ user }: { user: User }) {
  if (!user) return null
  return (
    <Link href="/admin" className="font-semibold text-teal-100 hover:text-teal-50">
      Admin
    </Link>
  )
}
