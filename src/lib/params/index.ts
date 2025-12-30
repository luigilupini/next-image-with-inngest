import {
  createLoader,
  createSerializer,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from 'nuqs/server'

export const searchParams = {
  search: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
  sort: parseAsStringLiteral(['new', 'top', 'random']).withDefault('new'),
  toggle: parseAsBoolean.withDefault(false),
  status: parseAsStringLiteral(['success', 'failure', 'upcoming', 'all'])
    .withDefault('all')
    .withOptions({ clearOnDefault: true }),
  theme: parseAsStringLiteral(['github', 'supabase', 'vercel'])
    .withDefault('supabase')
    .withOptions({ clearOnDefault: true }),
}

/**
 * Parses URL search parameters on the server using the nuqs schema.
 * Optional but recommended: server-side parsing in RSC/page/route handlers
 *
 * - Applies defaults (`withDefault`)
 * - Coerces values into the correct types
 * - Removes invalid values
 *
 * Intended for use in:
 * - Server Components (RSC)
 * - `page.tsx` / `layout.tsx`
 * - Route handlers
 *
 * @example
 * ```tsx
 * type PageProps = {
 *  searchParams: Promise<SearchParams>
 * }
 *
 * export default async function Page({ searchParams }: PageProps) {
 *   const params = loadSearchParams(searchParams)
 *
 *   // params is fully typed:
 *   // {
 *   //   search: string
 *   //   page: number
 *   //   sort: 'new' | 'top' | 'random'
 *   //   status: 'success' | 'failure' | 'upcoming' | 'all'
 *   //   toggle: boolean
 *   //   theme: 'github' | 'supabase' | 'vercel'
 *   // }
 *
 *   return <LaunchList filters={params} />
 * }
 * ```
 * @see https://nuqs.dev/docs/server-side
 */
export const loadSearchParams = createLoader(searchParams)

/**
 * Serializes search parameters into a query string or URL
 * using the shared nuqs search parameter schema.
 *
 * This helper is the canonical way to **build URLs** that are:
 * - Type-safe
 * - Consistent with `useQueryState(s)`
 * - Respectful of `withDefault` and `clearOnDefault`
 *
 * It replaces any custom `createUrl` / manual `URLSearchParams` logic.
 *
 * Behavior:
 * - `null` values remove the parameter
 * - Default values are omitted when `clearOnDefault` is enabled
 * - Invalid values are ignored
 * - Existing query parameters are preserved when a base URL is provided
 *
 * Intended for use in:
 * - Server Components
 * - Client Components
 * - Link builders (`<Link href=... />`)
 * - Programmatic navigation
 * - Pagination / filtering / sharing URLs
 *
 * @example
 * ```ts
 * // Build a query string
 * serializeSearchParams({ search: 'apollo', page: 2 })
 * // => "?search=apollo&page=2"
 *
 * // Merge with an existing URL
 * serializeSearchParams('/launches?utm=twitter', {
 *   status: 'success',
 * })
 * // => "/launches?utm=twitter&status=success"
 * ```
 *
 * @see https://nuqs.dev/docs/utilities#serializer-helper
 */
export const serializeSearchParams = createSerializer(searchParams)
