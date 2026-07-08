import type { Animation } from '@/components/animations/home-animation'
import HomeAnimation from '@/components/animations/home-animation'
import Supporters from '@/components/home/supporters'
import type { Supporter } from '@/payload-types'
import { Suspense } from 'react'
import { getHomePage } from '../queries'

export default async function Home() {
  const home = await getHomePage()

  if (!home) {
    return (
      <div className="flex flex-col gap-y-9 md:gap-y-12 lg:gap-y-20 items-center">
        <div className="h-135 relative w-135" />
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <h1 className="font-headline font-bold text-3xl md:text-4xl lg:text-6xl">
            The Plankton Project
          </h1>
          <p className="text-base md:text-lg lg:text-xl">
            A CIC dedicated to researching the diversity of near-shore plankton and sharing that
            knowledge with others.
          </p>
        </div>
        <h2 className="font-headline font-bold text-2xl md:text-3xl lg:text-4xl">
          Thank you to our supporters
        </h2>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-9 md:gap-y-12 lg:gap-y-20 items-center">
      <div className="relative size-96 md:size-135">
        {home.animation && (
          <Suspense>
            <HomeAnimation animation={home.animation as Animation} />
          </Suspense>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center justify-center text-center">
        <h1 className="font-headline font-bold text-3xl md:text-4xl lg:text-6xl">{home.heading}</h1>
        <p className="text-base md:text-lg lg:text-xl">{home.subheading}</p>
      </div>
      <h2 className="font-headline font-bold text-2xl md:text-3xl lg:text-4xl">
        {home.supporterHeading}
      </h2>
      <Supporters supporters={home.supporters as Supporter[]} />
    </div>
  )
}
