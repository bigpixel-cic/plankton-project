import HomeAnimation from '@/components/animations/home-animation'
import Supporters from '@/components/home/supporters'
import { Suspense } from 'react'
import { getHomeData } from '../queries'

export default async function Home() {
  const homeData = await getHomeData()

  if (!homeData) {
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
        {homeData.animation && (
          <Suspense>
            <HomeAnimation animation={homeData.animation} />
          </Suspense>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center justify-center text-center">
        <h1 className="font-headline font-bold text-3xl md:text-4xl lg:text-6xl">
          {homeData.heading}
        </h1>
        <p className="text-base md:text-lg lg:text-xl">{homeData.subheading}</p>
      </div>
      <h2 className="font-headline font-bold text-2xl md:text-3xl lg:text-4xl">
        {homeData.supporterHeading}
      </h2>
      <Supporters supporters={homeData.supporters} />
    </div>
  )
}
