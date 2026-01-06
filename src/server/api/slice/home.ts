import { Elysia } from 'elysia'

export const homeRoute = new Elysia({ name: 'homeRoute' }).get(
  '/',
  'Welcome to the Home Route!',
)
