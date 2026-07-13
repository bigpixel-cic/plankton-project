import type { Metadata, ResolvingMetadata } from 'next'

import { getAboutPage } from '@/app/(frontend)/queries'
import { isPopulated } from '@/app/lib/payload/utils'
import RichText from '@/components/global/richtext'
import Image from 'next/image'

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const about = await getAboutPage()

  if (!about || !about.meta) {
    return {}
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: about.meta.title,
    description: about.meta.description,
    openGraph: {
      title: about.meta.title || 'The Plankton Project',
      description:
        about.meta.description ||
        'More about The Plankton Project, our mission, and the team behind our efforts to understand and protect plankton ecosystems.',
      images:
        isPopulated(about.meta.image) && about.meta.image.url
          ? [about.meta.image.url, ...previousImages]
          : previousImages,
    },
  } satisfies Metadata
}

export default async function About() {
  const about = await getAboutPage()

  if (!about) {
    return (
      <div className="flex flex-col gap-y-9 md:gap-y-12">
        <h1 className="heading">About</h1>
        <p>This is the about page of the website.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-9 md:gap-y-12">
      <h1 className="heading">{about.heading}</h1>
      <div className="grid grid-cols-6 gap-12">
        <div className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
          {isPopulated(about.mainImage) && about.mainImage.url && (
            <Image
              src={about.mainImage.url}
              alt={about.mainImage.alt || 'About Image'}
              width={about.mainImage.width || 600}
              height={about.mainImage.height || 600}
              className="w-full h-auto object-cover rounded-4xl shadow-2xl"
            />
          )}
        </div>
        <div className="col-span-6 lg:col-span-3 xl:col-span-4">
          {about.content && <RichText data={about.content} enableProse white />}
        </div>
      </div>
    </div>
  )
}
