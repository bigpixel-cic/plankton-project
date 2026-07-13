import { isPopulated } from '@/app/lib/payload/utils'
import InfoBlock from '@/components/blog/info-block'
import { CoverImage } from '@/components/global/cover-image'
import RichText from '@/components/global/richtext'
import { notFound } from 'next/navigation'

import { getPostBySlug, getPostSlugs } from '@/app/(frontend)/queries'

import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const data = await getPostSlugs()
  const params = data.docs?.map(({ slug }) => {
    return { slug }
  })

  return params || []
}

export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const params = await props.params
  const seo = await getPostBySlug(params.slug)

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

export default async function PostPage(props: Props) {
  const params = await props.params
  const post = await getPostBySlug(params.slug)
  if (!post || !post.id) {
    return notFound()
  }

  return (
    <div className="w-full flex flex-col gap-y-6 sm:gap-y-12 md:gap-y-24 px-4 md:px-8 lg:px-0">
      {isPopulated(post.coverImage) && (
        <div className="relative aspect-video overflow-hidden rounded-2xl md:rounded-4xl shadow-lg md:shadow-2xl">
          <CoverImage image={post.coverImage} size="hero" priority />
        </div>
      )}
      <div className="grid grid-cols-3 gap-y-6 sm:gap-y-12 lg:gap-y-0 gap-x-18">
        <div className="col-span-full lg:col-span-1">
          <InfoBlock post={post} />
        </div>
        <div className="col-span-full lg:col-span-2">
          <h1 className="text-wrap text-4xl md:text-6xl text-slate-900 dark:text-white font-extrabold mb-6 md:mb-9">
            {post.title}
          </h1>
          {post.content && <RichText data={post.content} enableProse enableGutter={false} />}
        </div>
      </div>
    </div>
  )
}
