import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type FootnoteEntry = {
  id: string
  number: number
  text: string
}

type LexicalNodeLike = {
  type?: string
  fields?: { id?: string | null; blockType?: string; text?: string }
  children?: unknown[]
}

function walk(node: unknown, out: FootnoteEntry[]): void {
  if (!node || typeof node !== 'object') return
  const current = node as LexicalNodeLike

  if (
    current.type === 'inlineBlock' &&
    current.fields?.blockType === 'footnote' &&
    current.fields.id
  ) {
    out.push({
      id: current.fields.id,
      number: out.length + 1,
      text: current.fields.text ?? '',
    })
  }

  if (Array.isArray(current.children)) {
    for (const child of current.children) walk(child, out)
  }
}

/**
 * Walks a Lexical document in document order and returns every footnote
 * inline block, numbered sequentially. Shared by the inline marker
 * converter and the references list, so both always agree.
 */
export function extractFootnotes(data: SerializedEditorState): FootnoteEntry[] {
  const out: FootnoteEntry[] = []
  walk(data?.root, out)
  return out
}
