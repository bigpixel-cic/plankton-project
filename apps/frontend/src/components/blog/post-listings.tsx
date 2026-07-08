import { getPosts } from '@/app/(frontend)/queries'
import Image from 'next/image'
import Link from 'next/link'

import { isPopulated } from '@/app/lib/payload/utils'

import { Post } from '@/payload-types'

export async function PostListings({ featuredPost }: { featuredPost?: Post }) {
  const posts = await getPosts()

  if (!posts || posts.totalDocs == 0) {
    return null
  }

  return (
    <div className="bg-teal-100 dark:bg-black/30 rounded-2xl md:rounded-4xl p-9">
      <div className="flex flex-col divide-teal-900/30 divide-y">
        {posts.docs.map((post) =>
          // Exclude the featured post if it's in the list
          post.id === featuredPost?.id ? null : (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="py-9 first:pt-0 last:pb-0 flex flex-col md:flex-row items-center justify-around gap-9"
            >
              <div className="w-full aspect-square md:size-50 shrink-0 max-w-[320px]">
                {isPopulated(post.coverImage) && (
                  <Image
                    src={post.coverImage?.url || ''}
                    alt={post.coverImage?.alt || 'Cover image'}
                    width={320}
                    height={320}
                    className="max-h-80 md:max-h-50 object-cover object-center rounded-xl"
                    style={{
                      objectPosition: `${post.coverImage.focalX ?? '50%'} ${post.coverImage.focalY ?? '50%'}`,
                    }}
                  />
                )}
              </div>
              <div className="min-h-50 w-full h-full flex flex-col justify-between gap-y-6 items-start">
                <h2 className="font-bold text-2xl md:text-3xl text-cyan-600 dark:text-cyan-400 line-clamp-2 md:line-clamp-1">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-slate-800 dark:text-teal-50 text-sm/6 md:text-base/6 font-light line-clamp-4">
                    {post.excerpt}
                  </p>
                )}
                <div className="flex flex-wrap gap-1">
                  {post.tags &&
                    post.tags.map(
                      (tag) =>
                        isPopulated(tag) && (
                          <span
                            key={tag.id}
                            className="bg-pink-600 text-white text-xs/6 font-semibold px-3 rounded-full"
                          >
                            {tag.name}
                          </span>
                        ),
                    )}
                </div>
              </div>
            </Link>
          ),
        )}
      </div>
    </div>
  )
}
