import { treaty } from '@elysiajs/eden'
import type { app } from '@/app/api/[[...slugs]]/route'

const baseUrl = typeof window === 'undefined' ? 'http://localhost:3000' : ''

export const edenApi = treaty<typeof app>(baseUrl).api
