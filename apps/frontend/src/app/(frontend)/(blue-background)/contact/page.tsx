import type { Metadata, ResolvingMetadata } from 'next'

import ContactForm from '@/components/contact/contact-form'
import { LargeSocials } from '@/components/global/socials'

import { getContactPage } from '@/app/(frontend)/queries'
import { isPopulated } from '@/app/lib/payload/utils'

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const seo = await getContactPage()

  if (!seo || !seo.meta) {
    return {}
  }
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: seo.meta.title,
    description: seo.meta.description,
    openGraph: {
      title: seo.meta.title || 'The Plankton Project',
      description:
        seo.meta.description ||
        'Discover the latest insights and stories from The Plankton Project. Explore our blog for in-depth articles, research findings, and updates on our mission to understand and protect plankton ecosystems.',
      images:
        isPopulated(seo.meta.image) && seo.meta.image.url
          ? [seo.meta.image.url, ...previousImages]
          : previousImages,
    },
  } satisfies Metadata
}

export default async function ContactPage() {
  const contact = await getContactPage()

  if (!contact || !contact.createdAt) {
    return (
      <div className="flex flex-col gap-y-9 md:gap-y-12">
        <h1 className="heading">Contact us</h1>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-6 flex flex-col gap-y-9 md:gap-y-12">
      <h1 className="heading">{contact.heading}</h1>
      <p className="subheading">{contact.subheading}</p>
      {contact.additionalText && (
        <p className="text-lg md:text-xl text-white">{contact.additionalText}</p>
      )}
      <h2 className="subheading">Follow us</h2>
      <LargeSocials socialMedia={contact.socials} />
      <h2 className="subheading">Join us</h2>
      <ContactForm />
    </div>
  )
}
