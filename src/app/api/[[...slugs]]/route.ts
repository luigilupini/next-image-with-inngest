import Elysia from 'elysia'
import { homeRoute } from '@/server/api/slice/home'
import { userRoute } from '@/server/api/slice/user'

export const runtime = 'nodejs'
export const app = new Elysia({ prefix: '/api' }).use(homeRoute).use(userRoute)

export const GET = app.fetch
export const POST = app.fetch
