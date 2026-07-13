import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { User } from '@/payload-types'

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

export function checkRole(allRoles: User['roles'] = [], user: User) {
  if (user) {
    if (
      allRoles?.some((role) => {
        return user?.roles?.some((individualRole) => {
          return individualRole === role
        })
      })
    ) {
      return true
    }
  }
  return false
}
