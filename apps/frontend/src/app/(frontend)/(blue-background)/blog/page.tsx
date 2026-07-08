import { getBlogPage } from '@/app/(frontend)/queries'

import FeaturedPost from '@/components/blog/featured-post'
import { PostListings } from '@/components/blog/post-listings'

import { Post } from '@/payload-types'

export default async function BlogPage() {
  const blog = await getBlogPage()

  if (!blog) {
    return (
      <div className="flex flex-col gap-y-9 md:gap-y-12 lg:gap-y-18">
        <h1 className="heading">Latest News</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-9 md:gap-y-12 lg:gap-y-18">
      <h1 className="heading">{blog.heading}</h1>
      {blog.featuredPost && <FeaturedPost featuredPost={blog.featuredPost as Post} />}
      <h2 className="subheading">Articles</h2>
      <PostListings featuredPost={blog.featuredPost as Post} />
    </div>
  )
}
