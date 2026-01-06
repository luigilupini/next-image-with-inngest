/**
 * A promise representing the dynamic route params for this page.
 *
 * In Next.js 15+, route parameters are no longer passed
 * as synchronous objects — they are Promises that resolve
 * to the values. You must `await params` (or use `use()` in
 * client code) to read them.  [oai_citation:1‡Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/page?utm_source=chatgpt.com)
 *
 * Example for a route file at `app/shop/[slug]/page.tsx`:
 *   params resolves to `{ slug: string }`.
 */
type Params = Promise<{
  slug: string
}>

/**
 * A promise resolving to the search params from the URL.
 *
 * This matches the official Next.js type for `searchParams`,
 * which resolves to an object mapping keys to `string|string[]|undefined`.
 */
type SearchParams = Promise<Record<string, string | string[] | undefined>>

/**
 * A specialized version of `SearchParams` for error query parameters.
 *
 * You can use this when the only expected query string key
 * is `error` or similar. This still resolves asynchronously.
 */
type ErrorSearchParams = Promise<{
  error?: string
}>

/**
 * Props passed to an async page component.
 *
 * Both `params` and `searchParams` are Promises that must
 * be awaited in a server component.  [oai_citation:2‡Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/page?utm_source=chatgpt.com)
 */
type AsyncPageProps = Readonly<{
  params: Params
  searchParams: SearchParams
}>

/**
 * Props passed to an error page that only cares about search params.
 *
 * For example, a page that uses an `?error=` query string to
 * render messages. `searchParams` must be awaited.  [oai_citation:3‡Next.js](https://nextjs.org/docs/app/api-reference/file-conventions/page?utm_source=chatgpt.com)
 */
type AsyncErrorPageProps = Readonly<{
  searchParams: ErrorSearchParams
}>

/**
 * Props passed to a layout component.
 *
 * Most layouts only need `children`, and dynamic layouts
 * can also be typed with `params: Promise<…>` if needed.
 */
type LayoutPageProps = Readonly<{
  children: React.ReactNode
}>

export type {
  Params,
  SearchParams,
  ErrorSearchParams,
  AsyncPageProps,
  AsyncErrorPageProps,
  LayoutPageProps,
}
