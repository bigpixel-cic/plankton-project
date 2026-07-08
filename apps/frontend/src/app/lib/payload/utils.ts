import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function isPopulated<T extends { id: number }>(
  value: number | T | null | undefined,
): value is T {
  return typeof value === 'object' && value !== null
}

export function isPopulatedArray<T extends { id: number }>(
  values: (number | T | null | undefined)[] | null | undefined,
): T[] {
  if (!values) return []
  return values.filter(isPopulated<T>)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
