import type { Metadata, ResolvingMetadata } from 'next';

import { blogQuery, blogMetadataQuery } from '@/sanity/queries';
import { sanityFetch } from '@/sanity/live';

import FeaturedPost, { type FeaturedPostData } from '@/components/blog/featured-post';
import { PostListings } from '@/components/blog/post-listings';

export async function generateMetadata(parent: ResolvingMetadata): Promise<Metadata> {
  const { data: seo } = await sanityFetch({
    query: blogMetadataQuery,
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

export default async function BlogPage() {
  const { data: blog } = await sanityFetch({ query: blogQuery });

  if (!blog || !blog._id) {
    return (
      <div className="flex flex-col gap-y-9 md:gap-y-12 lg:gap-y-18">
        <h1 className="heading">Latest News</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-9 md:gap-y-12 lg:gap-y-18">
      <h1 className="heading">{blog.heading}</h1>
      {blog.featuredPost && <FeaturedPost post={blog.featuredPost as FeaturedPostData} />}
      <h2 className="subheading">Articles</h2>
      <PostListings featureId={blog.featuredPost?._id} />
    </div>
  );
}
