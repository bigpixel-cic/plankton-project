'use client'

import { FootnoteBlock, YouTubeVideoBlock } from '@/payload-types'
import type {
  DefaultNodeTypes,
  SerializedBlockNode,
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
  | SerializedBlockNode<YouTubeVideoBlock>
  | SerializedInlineBlockNode<FootnoteBlock>

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
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
    blocks: {
      youTubeVideo: ({ node }) => <YouTube {...node.fields} />,
    },
    inlineBlocks: {
      footnote: ({ node }) => (
        <FootnoteMarker number={footnoteNumbers.get(node.fields.id ?? '') ?? 0} />
      ),
    },
  })

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, data, ...rest } = props

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
            container: enableGutter,
            'max-w-none': !enableGutter,
            'mx-auto prose prose-white md:prose-md': enableProse,
          },
          className,
        )}
        {...rest}
      />
      <FootnoteReferences footnotes={footnotes} />
    </>
  )
}
