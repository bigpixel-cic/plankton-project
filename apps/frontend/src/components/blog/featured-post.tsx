import Image from 'next/image';
import Link from 'next/link';

export type FeaturedPostData = {
  _id: string;
  status: 'draft' | 'published';
  title: string;
  slug: string;
  tags: string[] | null;
  excerpt: string | null;
  coverImage: string | null;
  altText: string | null;
  date: string;
};

export default function FeaturedPost({ post }: { post: FeaturedPostData }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-linear-to-b from-teal-100 to-teal-800 dark:from-teal-600 dark:to-teal-900 rounded-3xl p-1"
    >
      <div className="bg-linear-to-b from-30% from-teal-600 to-teal-900 dark:from-black/30 dark:to-black/60 rounded-[20px] p-6">
        <div className="flex flex-col md:flex-row items-center gap-9">
          <div className="relative md:shrink-0">
            {post.coverImage && (
              <Image
                src={post.coverImage}
                alt={post.altText || 'Cover image'}
                width={360}
                height={240}
                className="max-h-60 object-cover object-center rounded-2xl drop-shadow-lg"
              />
            )}
          </div>
          <div className="h-60 flex flex-col justify-center gap-y-6 items-start">
            <h2 className="font-bold text-4xl text-white line-clamp-1">{post.title}</h2>
            {post.excerpt && (
              <p className="text-white text-lg font-light line-clamp-4">{post.excerpt}</p>
            )}
            <div className="flex flex-wrap gap-1">
              {post.tags &&
                post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-pink-600 text-white text-xs/6 font-semibold px-3 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
