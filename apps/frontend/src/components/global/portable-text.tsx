/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import { PortableText, type PortableTextComponents, type PortableTextBlock } from 'next-sanity';
import ResolvedLink from '@/components/global/resolved-link';
import Image from '@/components/global/sanity-image';
import ReactPlayer from 'react-player';

export default function CustomPortableText({
  className,
  value,
}: {
  className?: string;
  value: PortableTextBlock[];
}) {
  // Pre-process blocks to collect footnotes in order and assign numbers
  const footnotes: Array<{ _key: string; footnote: string; number: number }> = [];
  const footnoteNumberMap = new Map<string, number>();

  type FootnoteMarkDef = { _key: string; _type: string; footnote: string };
  type BlockWithMarkDefs = { _type: string; markDefs?: FootnoteMarkDef[] };

  value.forEach((block) => {
    const b = block as unknown as BlockWithMarkDefs;
    if (b._type === 'block' && Array.isArray(b.markDefs)) {
      b.markDefs.forEach((markDef) => {
        if (markDef._type === 'footnote' && !footnoteNumberMap.has(markDef._key)) {
          const number = footnotes.length + 1;
          footnotes.push({ _key: markDef._key, footnote: markDef.footnote, number });
          footnoteNumberMap.set(markDef._key, number);
        }
      });
    }
  });

  const components: PortableTextComponents = {
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }

        return (
          <figure className="my-8">
            <Image
              id={value.asset._ref}
              alt={value.alt || ''}
              width={672}
              crop={value.crop}
              mode="cover"
              className="rounded-sm"
            />
          </figure>
        );
      },
      youtube: ({ value }) => {
        const { url } = value;
        return (
          <div className="my-8">
            <ReactPlayer
              src={url}
              width={672}
              height={378}
              config={{
                youtube: {
                  referrerpolicy: 'strict-origin-when-cross-origin',
                  enablejsapi: 1,
                  fs: 0,
                },
              }}
            />
          </div>
        );
      },
    },
    block: {
      h1: ({ children, value }) => (
        // Add an anchor to the h1
        <h1 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      ),
      h2: ({ children, value }) => {
        // Add an anchor to the h2
        return (
          <h2 className="group relative">
            {children}
            <a
              href={`#${value?._key}`}
              className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </h2>
        );
      },
    },
    marks: {
      link: ({ children, value: link }) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>;
      },
      footnote: ({ value, children }) => {
        const number = footnoteNumberMap.get(value._key as string);
        return (
          <span id={`src-${value._key}`} className="relative text-inherit">
            {children}
            <sup>
              <a href={`#note-${value._key}`}>{number}</a>
            </sup>
          </span>
        );
      },
    },
  };

  return (
    <div className={`prose-a:underline prose ${className}`}>
      <PortableText components={components} value={value} />
      {footnotes.length > 0 && (
        <div className="mt-12 border-t border-current/20 pt-4">
          {footnotes.map(({ _key, footnote, number }) => (
            <div key={_key} id={`note-${_key}`} className="text-sm mt-2">
              <sup>{number}</sup> {footnote} <a href={`#src-${_key}`}>↩</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
