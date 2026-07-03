import type { Metadata, ResolvingMetadata } from 'next';

import { contactQuery, contactMetadataQuery } from '@/sanity/queries';
import { sanityFetch } from '@/sanity/live';
import { dataAttr } from '@/sanity/utils';

import { LargeSocials } from '@/components/global/socials';
import ContactForm from '@/components/contact/contact-form';

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const { data: seo } = await sanityFetch({
    query: contactMetadataQuery,
    perspective: 'published',
    stega: false,
  });

  if (!seo || !seo.title) {
    return {};
  }

  const keywordData = [seo.primaryKeyword, ...(seo.keywords || [])].filter(
    (k): k is string => k !== null
  );

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage =
    seo && seo.generateOgImage
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${encodeURIComponent(seo.title || 'The Plankton Project')}`
      : seo.ogImage;
  return {
    title: seo.title,
    description: seo.description,
    keywords:
      keywordData.length > 0 ? keywordData : ['plankton', 'ocean', 'marine biology', 'ecology'],
    openGraph: {
      title: seo.title || 'The Plankton Project',
      description:
        seo.description ||
        'Discover the latest insights and stories from The Plankton Project. Explore our blog for in-depth articles, research findings, and updates on our mission to understand and protect plankton ecosystems.',
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function ContactPage() {
  const { data: contact } = await sanityFetch({ query: contactQuery });

  if (!contact || !contact._id) {
    return (
      <div className="flex flex-col gap-y-9 md:gap-y-12">
        <h1 className="heading">Contact us</h1>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-6 flex flex-col gap-y-9 md:gap-y-12">
      <h1
        data-sanity={dataAttr({
          id: contact._id,
          type: 'contactPage',
          path: 'heading',
        }).toString()}
        className="heading"
      >
        {contact.heading}
      </h1>
      <p
        data-sanity={dataAttr({
          id: contact._id,
          type: 'contactPage',
          path: 'subheading',
        }).toString()}
        className="subheading"
      >
        {contact.subheading}
      </p>
      {contact.additionalText && (
        <p
          data-sanity={dataAttr({
            id: contact._id,
            type: 'contactPage',
            path: 'additionalText',
          }).toString()}
          className="text-lg md:text-xl text-white"
        >
          {contact.additionalText}
        </p>
      )}
      <h2 className="subheading">Follow us</h2>
      <LargeSocials socialMedia={contact.socials} />
      <h2 className="subheading">Join us</h2>
      <ContactForm />
    </div>
  );
}
