import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type ActionCallbacks<TResult, TRef = unknown> = {
  onStart?: () => TRef | Promise<TRef>
  onEnd?: (ref: TRef) => void | Promise<void>
  onSuccess?: (result: TResult) => void | Promise<void>
  onError?: (result: TResult) => void | Promise<void>
}

export function withActionEffects<Args extends unknown[], TResult, TRef = unknown>(
  fn: (...args: Args) => Promise<TResult>,
  callbacks: ActionCallbacks<TResult, TRef>,
  classify: (result: TResult) => 'success' | 'error',
) {
  return async (...args: Args) => {
    const ref = (await callbacks.onStart?.()) as TRef

    const promise = fn(...args)
    const result = await promise

    if (ref !== undefined) await callbacks.onEnd?.(ref)

    if (classify(result) === 'success') await callbacks.onSuccess?.(result)
    else await callbacks.onError?.(result)

    return promise
  }
}

export const normalizeErrors = (errors: { _errors: string[] } | undefined) => {
  if (!errors) return []

  // Flatten and collect all errors dynamically
  const allErrors: string[] = []
  // If there's a global error message
  if (errors._errors) {
    allErrors.push(...errors._errors)
  }
  // Loop through each key (e.g., experience, investmentRiskAppetite, etc.)
  Object.values(errors).forEach((value) => {
    if (
      value &&
      typeof value === 'object' &&
      '_errors' in value &&
      Array.isArray(value._errors)
    ) {
      allErrors.push(...value._errors)
    }
  })

  return allErrors
}

type ErrorNode =
  | string
  | null
  | undefined
  | { _errors?: string[]; [k: string]: ErrorNode }
  | ErrorNode[]

export function flattenErrors(node: ErrorNode): string[] {
  const errorArray: string[] = []

  const visit = (node: ErrorNode) => {
    if (!node) return

    if (typeof node === 'string') {
      errorArray.push(node)
      return
    }

    if (Array.isArray(node)) {
      for (const item of node) visit(item as ErrorNode)
      return
    }

    if (typeof node === 'object') {
      const maybeErrors = node._errors
      if (Array.isArray(maybeErrors)) errorArray.push(...maybeErrors)

      for (const value of Object.values(node)) visit(value as ErrorNode)
    }
  }

  visit(node)
  return errorArray
}

export const delay = async (time: number, trigger?: () => void): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
      if (typeof trigger === 'function') trigger()
    }, time)
  })
}
