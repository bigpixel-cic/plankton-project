import type { Metadata, ResolvingMetadata } from 'next';

import { aboutQuery, aboutMetadataQuery } from '@/sanity/queries';
import { sanityFetch } from '@/sanity/live';
import { dataAttr } from '@/sanity/utils';

import Image from 'next/image';
import PortableText from '@/components/global/portable-text';

import { type PortableTextBlock } from 'next-sanity';

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const { data: seo } = await sanityFetch({
    query: aboutMetadataQuery,
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
        'More about The Plankton Project, our mission, and the team behind our efforts to understand and protect plankton ecosystems.',
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function About() {
  const { data: aboutData } = await sanityFetch({ query: aboutQuery });

  if (!aboutData) {
    return (
      <div className="flex flex-col gap-y-9 md:gap-y-12">
        <h1 className="heading">About</h1>
        <p>This is the about page of the website.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-9 md:gap-y-12">
      <h1
        data-sanity={dataAttr({
          id: aboutData._id,
          type: 'aboutPage',
          path: 'heading',
        }).toString()}
        className="heading"
      >
        {aboutData.heading}
      </h1>
      <div className="grid grid-cols-6 gap-12">
        <div className="col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2">
          {aboutData.mainImage && (
            <Image
              src={aboutData.mainImage}
              alt={aboutData.altText || 'About Image'}
              width={600}
              height={600}
              className="w-full h-auto object-cover rounded-4xl shadow-2xl"
              data-sanity={dataAttr({
                id: aboutData._id,
                type: 'aboutPage',
                path: 'mainImage',
              }).toString()}
            />
          )}
        </div>
        <div className="col-span-6 lg:col-span-3 xl:col-span-4">
          <PortableText
            value={aboutData.content as PortableTextBlock[]}
            className="prose-white max-w-none"
            data-sanity={dataAttr({
              id: aboutData._id,
              type: 'aboutPage',
              path: 'content',
            }).toString()}
          />
        </div>
      </div>
    </div>
  );
}
