import Image from "next/image";
import Link from "next/link";

import { resolveBlogListImage } from "@/sanity/utils";

import { allPostsQuery } from "@/sanity/queries";
import { sanityFetch } from "@/sanity/live";
import type { AllPostsQueryResult, Post } from "@/sanity.types";

export async function PostListings({ featureId }: { featureId?: string }) {
  const { data: posts }: { data: AllPostsQueryResult } = await sanityFetch({
    query: allPostsQuery,
  });

  if (!posts || !posts.length) {
    return null;
  }

  return (
    <div className="bg-teal-100 dark:bg-black/30 rounded-2xl md:rounded-4xl p-9">
      <div className="flex flex-col divide-teal-900/30 divide-y">
        {posts.map((post) =>
          // Exclude the featured post if it's in the list
          post._id === featureId ? null : (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="py-9 first:pt-0 last:pb-0 flex flex-col md:flex-row items-center justify-around gap-9"
            >
              <div className="w-full aspect-square md:size-50 shrink-0 max-w-[320px]">
                {resolveBlogListImage(post.coverImage) && (
                  <Image
                    src={resolveBlogListImage(post.coverImage)?.url || ""}
                    alt={
                      resolveBlogListImage(post.coverImage)?.alt ||
                      "Cover image"
                    }
                    width={320}
                    height={320}
                    className="max-h-80 md:max-h-50 object-cover object-center rounded-xl"
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
            </Link>
          ),
        )}
      </div>
    </div>
  );
}
