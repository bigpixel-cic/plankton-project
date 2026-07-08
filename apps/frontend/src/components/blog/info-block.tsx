import { Post } from '@/payload-types'
import { format } from 'date-fns'
import { CalendarDays, Share, Tags, UserPen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { isPopulated } from '@/app/lib/payload/utils'

const shareLinks = [
  {
    id: 'bluesky',
    icon: '/social/share-bluesky.svg',
    iconDark: '/social/share-bluesky-dark.svg',
    url: 'https://bsky.app/intent/post',
  },
  {
    id: 'linkedin',
    icon: '/social/share-linkedin.svg',
    iconDark: '/social/share-linkedin-dark.svg',
    url: 'https://www.linkedin.com/shareArticle?mini=true',
  },
  {
    id: 'facebook',
    icon: '/social/share-facebook.svg',
    iconDark: '/social/share-facebook-dark.svg',
    url: 'https://www.facebook.com/sharer/sharer.php',
  },
  {
    id: 'email',
    icon: '/social/share-email.svg',
    iconDark: '/social/share-email-dark.svg',
    url: 'mailto:',
  },
]

function shareUrl(id: string, title: string, slug: string) {
  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${slug}`
  switch (id) {
    case 'bluesky':
      return `https://bsky.app/intent/post?text=${encodeURIComponent(`${title}\n\nRead more at ${postUrl}`)}`
    case 'linkedin':
      return `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(postUrl)}&title=${encodeURIComponent(title)}`
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
    case 'email':
      return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article: ${postUrl}`)}`
    default:
      return '#'
  }
}

export default function InfoBlock({ post }: { post: Post }) {
  return (
    <div className="relative md:sticky md:top-24 self-start w-full">
      <div className="flex flex-col divide-slate-300 divide-y">
        <p className="flex items-center gap-x-3 py-3 font-medium text-sm">
          <UserPen size={18} className="text-sky-600" />
          {isPopulated(post.author)
            ? `${post.author.firstName} ${post.author.lastName}`
            : 'Unknown Author'}
        </p>
        <p className="flex items-center gap-x-3 py-3 font-medium text-sm">
          <CalendarDays size={18} className="text-sky-600" />
          {post.createdAt ? format(new Date(post.createdAt), 'do MMM yyyy') : 'Unknown Date'}
        </p>
        <div className="flex items-center gap-x-3 py-3">
          <Tags size={18} className="text-sky-600" />
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
        <div className="flex items-center gap-x-3 py-3">
          <Share size={18} className="text-sky-600" />
          <div className="flex flex-wrap gap-3">
            {shareLinks.map((link) => (
              <a
                key={link.id}
                href={shareUrl(link.id, post.title, post.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="size-5"
              >
                <Image
                  src={link.icon}
                  alt={`Share on ${link.id}`}
                  width={20}
                  height={20}
                  className="dark:hidden block"
                />
                <Image
                  src={link.iconDark}
                  alt={`Share on ${link.id}`}
                  width={20}
                  height={20}
                  className="hidden dark:block"
                />
              </a>
            ))}
          </div>
        </div>
        <Link href="/blog" className="mt-6 text-sm font-medium text-sky-600 hover:underline shrink">
          &larr; Back to all articles
        </Link>
      </div>
    </div>
  )
}
