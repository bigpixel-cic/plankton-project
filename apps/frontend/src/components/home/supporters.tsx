import Image from 'next/image'

import { isPopulated } from '@/app/lib/payload/utils'
import type { Supporter } from '@/payload-types'

export default function Supporters({ supporters }: { supporters: Supporter[] }) {
  if (!supporters || supporters.length === 0) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-8 justify-center items-center">
      {supporters.map(
        (supporter) =>
          isPopulated(supporter.logo) && (
            <Image
              key={supporter.id}
              src={supporter.logo.url || '/placeholder.png'}
              alt={supporter.name}
              width={144}
              height={144}
              className="size-36 object-contain"
            />
          ),
      )}
    </div>
  )
}
