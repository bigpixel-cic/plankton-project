import type { Metadata, ResolvingMetadata } from 'next';

import { resourcesQuery, resourcesMetadataQuery } from '@/sanity/queries';
import { sanityFetch } from '@/sanity/live';
import { dataAttr } from '@/sanity/utils';

import PortableText from '@/components/global/portable-text';
import ResourceList from '@/components/resources/resource-list';

import { type PortableTextBlock } from 'next-sanity';

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const { data: seo } = await sanityFetch({
    query: resourcesMetadataQuery,
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
        'Here you will find a collection of resources related to plankton, including educational materials to help you learn more about these fascinating organisms and their role in marine ecosystems.',
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function Resources() {
  const { data: resourcesData } = await sanityFetch({ query: resourcesQuery });

  if (!resourcesData) {
    return (
      <div className="flex flex-col gap-y-6 sm:gap-y-9 md:gap-y-12">
        <h1 className="heading">Resources</h1>
        <p className="subheading">This is the resources page of the website.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-6 sm:gap-y-9 md:gap-y-12">
      <h1
        data-sanity={dataAttr({
          id: resourcesData._id,
          type: 'resourcesPage',
          path: 'heading',
        }).toString()}
        className="heading"
      >
        {resourcesData.heading}
      </h1>
      <p
        data-sanity={dataAttr({
          id: resourcesData._id,
          type: 'resourcesPage',
          path: 'subheading',
        }).toString()}
        className="subheading"
      >
        {resourcesData.subheading}
      </p>
      <PortableText
        value={resourcesData.introText as PortableTextBlock[]}
        className="prose-white md:prose-lg lg:prose-xl max-w-none"
        data-sanity={dataAttr({
          id: resourcesData._id,
          type: 'resourcesPage',
          path: 'introText',
        }).toString()}
      />
      <ResourceList />
    </div>
  );
}
