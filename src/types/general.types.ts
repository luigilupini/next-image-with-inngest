type Params = Promise<{ id: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type ErrorSearchParams = Promise<{ error?: string }>;

type AsyncErrorPage = { searchParams: ErrorSearchParams };
type AsyncPage = { params: Params; searchParams: SearchParams };
type LayoutPage = Readonly<{ children: React.ReactNode }>;

export type {
  Params,
  SearchParams,
  ErrorSearchParams,
  AsyncPage,
  AsyncErrorPage,
  LayoutPage,
};
