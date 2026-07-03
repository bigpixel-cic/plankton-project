import type { Supporter } from '@/payload-types'
import Image from 'next/image'

export default function Supporters({ supporters }: { supporters: Supporter[] | null }) {
  if (!supporters) {
    return null
  }

  return (
    <div className="flex flex-wrap gap-8 justify-center items-center">
      {supporters.map((supporter) => (
        <Image
          key={supporter.id}
          src={supporter.logo?.url || '/placeholder.png'}
          alt={supporter.name}
          width={144}
          height={144}
          className="size-36 object-contain"
        />
      ))}
    </div>
  )
}
