import { createSafeActionClient } from 'next-safe-action'

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    // Customize the error message returned to the client
    return error instanceof Error ? error.message : 'An unexpected error occurred.'
  },
})
