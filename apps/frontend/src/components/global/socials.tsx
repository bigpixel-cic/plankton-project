import { isPopulated } from '@/app/lib/payload/utils'
import Image from 'next/image'
import Link from 'next/link'

import type { SocialMediaAccount } from '@/payload-types'

export function SmallSocials({ socialMedia }: { socialMedia: SocialMediaAccount[] }) {
  if (!socialMedia || socialMedia.length === 0) {
    return null
  }

  return (
    <div className="inline-flex gap-4 my-4 lg:my-2">
      {socialMedia.map((account) => (
        <Link
          key={account.id}
          href={account.link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="size-6"
        >
          {isPopulated(account.icon) ? (
            <Image
              src={account.icon.url || '/social/default-icon.svg'}
              alt={account.platform || 'Social Media Account'}
              width={24}
              height={24}
            />
          ) : (
            <p>{account.platform}</p>
          )}
        </Link>
      ))}
    </div>
  )
}

export function LargeSocials({
  socialMedia,
}: {
  socialMedia: NonNullable<ContactQueryResult>['socials']
}) {
  if (!socialMedia || socialMedia.length === 0) {
    return null
  }
  return (
    <div className="inline-flex gap-9">
      {socialMedia.map((account) => (
        <Link
          key={account._id}
          href={account.link || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="size-12 md:size-14"
        >
          <Image
            src={account.icon || '/social/default-icon.svg'}
            alt={account.name || 'Social Media Account'}
            width={56}
            height={56}
          />
        </Link>
      ))}
    </div>
  )
}
