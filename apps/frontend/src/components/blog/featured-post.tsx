import { isPopulated } from '@/app/lib/payload/utils'
import Link from 'next/link'
import { CoverImage } from '../global/cover-image'

import { Post } from '@/payload-types'

export default function FeaturedPost({ featuredPost }: { featuredPost: Post }) {
  if (!featuredPost) return null
  return (
    <Link
      href={`/blog/${featuredPost.slug ?? '#'}`}
      className="bg-linear-to-b from-teal-100 to-teal-800 dark:from-teal-600 dark:to-teal-900 rounded-3xl p-1"
    >
      <div className="bg-linear-to-b from-30% from-teal-600 to-teal-900 dark:from-black/30 dark:to-black/60 rounded-[20px] p-6">
        <div className="flex flex-col md:flex-row items-center gap-9">
          <div className="relative md:shrink-0">
            <CoverImage
              image={featuredPost.coverImage}
              size="thumbnail"
              className="max-h-60 max-w-90 object-cover object-center rounded-2xl drop-shadow-lg"
            />
          </div>
          <div className="h-60 flex flex-col justify-center gap-y-6 items-start">
            <h2 className="font-bold text-4xl text-white line-clamp-1">{featuredPost.title}</h2>
            {featuredPost.excerpt && (
              <p className="text-white text-lg font-light line-clamp-4">{featuredPost.excerpt}</p>
            )}
            <div className="flex flex-wrap gap-1">
              {featuredPost.tags &&
                featuredPost.tags.map(
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
        </div>
      </div>
    </Link>
  )
}
