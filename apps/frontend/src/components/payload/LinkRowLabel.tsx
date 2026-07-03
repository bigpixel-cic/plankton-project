'use client'

import { useRowLabel } from '@payloadcms/ui'

type LinkRowData = { label?: string }

export const LinkRowLabel = () => {
  const { data, rowNumber } = useRowLabel<LinkRowData>()
  return data?.label || `Link ${String((rowNumber ?? 0) + 1).padStart(2, '0')}`
}

export default LinkRowLabel
