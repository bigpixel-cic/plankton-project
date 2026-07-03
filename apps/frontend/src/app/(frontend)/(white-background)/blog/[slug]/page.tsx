import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";

import { sanityFetch } from "@/sanity/live";
import {
  postPageSlugs,
  postPageQuery,
  postMetadataQuery,
} from "@/sanity/queries";
import { resolveBlogPostImage } from "@/sanity/utils";

import InfoBlock from "@/components/blog/info-block";
import PortableText from "@/components/global/portable-text";

import { type PortableTextBlock } from "next-sanity";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({
    query: postPageSlugs,
    // Use the published perspective in generateStaticParams
    perspective: "published",
    stega: false,
  });
  return data;
}

export async function generateMetadata(
  props: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const params = await props.params;
  const { data: seo } = await sanityFetch({
    query: postMetadataQuery,
    params,
    perspective: "published",
    stega: false,
  });

  if (!seo || !seo.title) {
    return {};
  }

  const keywordData = [seo.primaryKeyword, ...(seo.keywords || [])].filter(
    (k): k is string => k !== null,
  );

  const previousImages = (await parent).openGraph?.images || [];
  const ogImage =
    seo && seo.generateOgImage
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${encodeURIComponent(seo.title || "The Plankton Project")}`
      : seo.ogImage;
  return {
    title: seo.title,
    description: seo.description,
    keywords:
      keywordData.length > 0
        ? keywordData
        : ["plankton", "ocean", "marine biology", "ecology"],
    openGraph: {
      title: seo.title || "The Plankton Project",
      description:
        seo.description ||
        "Discover the latest insights and stories from The Plankton Project. Explore our blog for in-depth articles, research findings, and updates on our mission to understand and protect plankton ecosystems.",
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const [{ data: post }] = await Promise.all([
    sanityFetch({ query: postPageQuery, params }),
  ]);

  if (!post || !post._id) {
    return notFound();
  }

  return (
    <div className="w-full flex flex-col gap-y-6 sm:gap-y-12 md:gap-y-24 px-4 md:px-8 lg:px-0">
      {resolveBlogPostImage(post.coverImage) && (
        <div className="relative aspect-video overflow-hidden rounded-2xl md:rounded-4xl shadow-lg md:shadow-2xl">
          <Image
            src={resolveBlogPostImage(post.coverImage)?.url || ""}
            alt={resolveBlogPostImage(post.coverImage)?.alt || "Cover image"}
            width={1280}
            height={720}
            className="object-cover object-center"
          />
        </div>
      )}
      <div className="grid grid-cols-3 gap-y-6 sm:gap-y-12 lg:gap-y-0 gap-x-18">
        <div className="col-span-full lg:col-span-1">
          <InfoBlock
            title={post.title}
            slug={params.slug}
            author={post.author}
            date={post.date}
            tags={post.tags}
          />
        </div>
        <div className="col-span-full lg:col-span-2">
          <h1 className="text-wrap text-4xl md:text-6xl text-slate-900 dark:text-white font-extrabold mb-6 md:mb-9">
            {post.title}
          </h1>
          <PortableText
            value={post.content as PortableTextBlock[]}
            className="prose-slate dark:prose-invert max-w-none prose-sm md:prose-base lg:prose-lg xl:prose-xl"
          />
        </div>
      </div>
    </div>
  );
}
