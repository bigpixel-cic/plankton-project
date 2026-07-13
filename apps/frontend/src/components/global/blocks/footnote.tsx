import type { FootnoteEntry } from '@/app/lib/payload/footnotes'

export function FootnoteMarker({ number }: { number: number }) {
  return (
    <sup id={`fnref-${number}`}>
      <a href={`#fn-${number}`} className="no-underline font-light">
        [{number}]
      </a>
    </sup>
  )
}

export function FootnoteReferences({ footnotes }: { footnotes: FootnoteEntry[] }) {
  if (footnotes.length === 0) return null

  return (
    <section aria-label="Footnotes" className="mt-12 border-t border-white/20 pt-6 text-sm">
      <ol className="space-y-2">
        {footnotes.map((footnote) => (
          <li key={footnote.id} id={`fn-${footnote.number}`}>
            <span className="mr-1.5 text-slate-400 text-balance">{footnote.number}.</span>
            {footnote.text}{' '}
            <a
              href={`#fnref-${footnote.number}`}
              aria-label={`Back to reference ${footnote.number}`}
            >
              ↩
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
