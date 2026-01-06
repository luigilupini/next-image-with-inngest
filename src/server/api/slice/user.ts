import { Elysia, t } from 'elysia'

const UserBody = t.Object({
  id: t.String(),
  name: t.String(),
})

export const userRoute = new Elysia({ name: 'userRoute' }).post(
  '/user',
  ({ body }) => ({ id: body.id, name: body.name }),
  {
    body: UserBody,
    response: UserBody,
  },
)
