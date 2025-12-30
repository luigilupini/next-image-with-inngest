'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { QueryUpdates, UseQueryParamsReturn } from '@/types/query.types'

/**
 * Hook for managing URL query parameters with CRUD operations in Next.js
 *
 * @returns {UseQueryParamsReturn} Query parameter utilities
 *
 * @example
 * ```tsx
 * const query = useQueryParams()
 *
 * // Set parameters
 * query.set({ sort: 'asc', page: '1' })
 *
 * // Get a parameter
 * const sort = query.get('sort')
 *
 * // Remove parameters
 * query.remove('filter')
 *
 * // Toggle a value
 * query.toggle('view', 'grid')
 * ```
 */
export function useQueryParams(): UseQueryParamsReturn {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /**
   * Helper to create a new URLSearchParams instance from current params
   * @private
   */
  const createHelper = () => new URLSearchParams(searchParams.toString())

  const set = (updates: QueryUpdates): void => {
    const params = createHelper()

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const get = (key: string): string | null => {
    return searchParams.get(key)
  }

  const getAll = (): Record<string, string> => {
    const result: Record<string, string> = {}
    searchParams.forEach((value, key) => {
      result[key] = value
    })
    return result
  }

  const remove = (keys: string | string[]): void => {
    const params = createHelper()
    const keysArray = Array.isArray(keys) ? keys : [keys]

    keysArray.map((key) => params.delete(key))

    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  const clear = (): void => {
    router.push(pathname)
  }

  const toggle = (key: string, value: string): void => {
    const current = searchParams.get(key)
    if (current === value) {
      remove(key)
    } else {
      set({ [key]: value })
    }
  }

  const createUrl = (updates: QueryUpdates): string => {
    const params = createHelper()

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === undefined) {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })

    const query = params.toString()
    return query ? `${pathname}?${query}` : pathname
  }

  return {
    set,
    get,
    getAll,
    remove,
    clear,
    toggle,
    createUrl,
  }
}
