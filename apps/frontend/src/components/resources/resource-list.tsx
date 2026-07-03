import Link from 'next/link';
import { FileDown } from 'lucide-react';

import { resourceItemsQuery } from '@/sanity/queries';
import { sanityFetch } from '@/sanity/live';

export default async function ResourceList() {
  const { data: resources } = await sanityFetch({ query: resourceItemsQuery });

  if (!resources || !resources.length) {
    return <p>We will soon be adding some resources to this page.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {resources.map((resource) => (
        <Link
          key={resource.id}
          href={resource.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full bg-white/15 rounded-lg shadow-lg hover:shadow-sm hover:scale-95 hover:bg-white/10 transition-all"
        >
          <div className="p-6 flex flex-col gap-6 items-center text-center">
            <FileDown size={64} strokeWidth={1} />
            <h3 className="text-xl/6 font-semibold text-yellow-400">{resource.title}</h3>
            <p className="text-sm/6 text-white/80">{resource.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
