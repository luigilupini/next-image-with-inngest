/**
 * Type for query parameter values that can be set
 */
export type QueryValue = string | number | null | undefined

/**
 * Type for query parameter updates
 */
export type QueryUpdates = Record<string, QueryValue>

/**
 * Return type for the useQueryParams hook
 */
export interface UseQueryParamsReturn {
  /**
   * Set or update query parameters. Pass null to remove a parameter.
   *
   * @param {QueryUpdates} updates - Object with key-value pairs to set
   * @returns {void}
   *
   * @example
   * ```tsx
   * // Set a single parameter
   * query.set({ sort: 'asc' })
   *
   * // Set multiple parameters
   * query.set({ sort: 'desc', page: '1', filter: 'active' })
   *
   * // Remove a parameter by setting it to null
   * query.set({ filter: null })
   *
   * // Mixed operations
   * query.set({
   *   sort: 'asc',      // update
   *   page: '2',        // update
   *   filter: null      // remove
   * })
   * ```
   */
  set: (updates: QueryUpdates) => void

  /**
   * Get the value of a specific query parameter
   *
   * @param {string} key - The parameter name to retrieve
   * @returns {string | null} The parameter value or null if not found
   *
   * @example
   * ```tsx
   * // Get a single parameter
   * const sort = query.get('sort')        // 'asc' | 'desc' | null
   * const page = query.get('page')        // '1' | '2' | ... | null
   *
   * // Use in conditional rendering
   * if (query.get('view') === 'grid') {
   *   return <GridView />
   * }
   *
   * // With default value
   * const itemsPerPage = query.get('limit') || '10'
   * ```
   */
  get: (key: string) => string | null

  /**
   * Get all query parameters as a plain object
   *
   * @returns {Record<string, string>} Object containing all current query parameters
   *
   * @example
   * ```tsx
   * // Get all parameters
   * const allParams = query.getAll()
   * // Result: { sort: 'asc', page: '2', filter: 'active' }
   *
   * // Use for debugging
   * console.log('Current params:', query.getAll())
   *
   * // Check if any params exist
   * const hasParams = Object.keys(query.getAll()).length > 0
   *
   * // Spread into component props
   * <DataTable {...query.getAll()} />
   * ```
   */
  getAll: () => Record<string, string>

  /**
   * Remove one or more query parameters
   *
   * @param {string | string[]} keys - Parameter name(s) to remove
   * @returns {void}
   *
   * @example
   * ```tsx
   * // Remove a single parameter
   * query.remove('filter')
   *
   * // Remove multiple parameters
   * query.remove(['sort', 'filter', 'page'])
   *
   * // Conditional removal
   * if (resetFilters) {
   *   query.remove(['category', 'brand', 'price'])
   * }
   *
   * // Remove after action
   * handleSuccess(() => {
   *   query.remove('success')
   * })
   * ```
   */
  remove: (keys: string | string[]) => void

  /**
   * Clear all query parameters
   *
   * @returns {void}
   *
   * @example
   * ```tsx
   * // Clear all parameters
   * query.clear()
   *
   * // Reset button
   * <button onClick={() => query.clear()}>
   *   Reset All Filters
   * </button>
   *
   * // Clear before new search
   * const handleNewSearch = (term: string) => {
   *   query.clear()
   *   query.set({ search: term })
   * }
   * ```
   */
  clear: () => void

  /**
   * Toggle a query parameter value on/off. If the current value matches,
   * it removes the parameter. Otherwise, it sets the new value.
   *
   * @param {string} key - The parameter name
   * @param {string} value - The value to toggle
   * @returns {void}
   *
   * @example
   * ```tsx
   * // Toggle view mode
   * query.toggle('view', 'grid')  // Sets view=grid or removes it
   *
   * // Toggle filter button
   * <button
   *   onClick={() => query.toggle('status', 'active')}
   *   className={query.get('status') === 'active' ? 'active' : ''}
   * >
   *   Active Only
   * </button>
   *
   * // Multiple toggle buttons
   * ['small', 'medium', 'large'].map(size => (
   *   <button
   *     key={size}
   *     onClick={() => query.toggle('size', size)}
   *     className={query.get('size') === size ? 'selected' : ''}
   *   >
   *     {size}
   *   </button>
   * ))
   * ```
   */
  toggle: (key: string, value: string) => void

  /**
   * Create a URL string with updated query parameters without navigation.
   * Useful for Link components or generating shareable URLs.
   *
   * @param {QueryUpdates} updates - Parameters to update
   * @returns {string} Full URL path with query string
   *
   * @example
   * ```tsx
   * // Use with Next.js Link
   * import Link from 'next/link'
   *
   * <Link href={query.createUrl({ page: '2' })}>
   *   Next Page
   * </Link>
   *
   * // Generate shareable URL
   * const shareUrl = window.location.origin + query.createUrl({
   *   ref: 'social',
   *   campaign: 'summer'
   * })
   *
   * // Create pagination links
   * const pages = [1, 2, 3, 4, 5].map(p => ({
   *   number: p,
   *   url: query.createUrl({ page: String(p) })
   * }))
   *
   * // Preserve existing params while updating
   * <a href={query.createUrl({ sort: 'date' })}>
   *   Sort by Date
   * </a>
   * ```
   */
  createUrl: (updates: QueryUpdates) => string
}
