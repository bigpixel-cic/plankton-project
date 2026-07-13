'use client'

import { FootnoteBlock, YouTubeVideoBlock } from '@/payload-types'
import type {
  DefaultNodeTypes,
  SerializedInlineBlockNode,
  SerializedLinkNode,
} from '@payloadcms/richtext-lexical'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { useMemo } from 'react'

import { extractFootnotes } from '@/app/lib/payload/footnotes'
import { cn } from '@/app/lib/payload/utils'
import {
  RichText as ConvertRichText,
  type JSXConvertersFunction,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'

import { FootnoteMarker, FootnoteReferences } from './blocks/footnote'
import YouTube from './blocks/youtube'

type NodeTypes =
  | DefaultNodeTypes
  | SerializedInlineBlockNode<YouTubeVideoBlock>
  | SerializedInlineBlockNode<FootnoteBlock>

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
  white?: boolean
} & React.HTMLAttributes<HTMLDivElement>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug
  return relationTo === 'posts' ? `/posts/${slug}` : `/${slug}`
}

const createJsxConverters =
  (footnoteNumbers: Map<string, number>): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    inlineBlocks: {
      footnote: ({ node }) => (
        <FootnoteMarker number={footnoteNumbers.get(node.fields.id ?? '') ?? 0} />
      ),
      youTubeVideo: ({ node }) => <YouTube url={node.fields.url ?? ''} />,
    },
  })

export default function RichText(props: Props) {
  const { className, enableProse = true, white = false, enableGutter = true, data, ...rest } = props

  const footnotes = useMemo(() => extractFootnotes(data), [data])
  const jsxConverters = useMemo(() => {
    const numbers = new Map(footnotes.map((f) => [f.id, f.number]))
    return createJsxConverters(numbers)
  }, [footnotes])

  return (
    <>
      <ConvertRichText
        converters={jsxConverters}
        data={data}
        className={cn(
          'payload-richtext',
          {
            'max-w-none': !enableGutter,
            'mx-auto prose md:prose-md': enableProse,
            'prose-white': white,
          },
          className,
        )}
        {...rest}
      />
      <FootnoteReferences footnotes={footnotes} />
    </>
  )
}
