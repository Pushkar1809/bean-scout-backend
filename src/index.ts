import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('☕️ Bean Scout APIs')
})

const port = Number(process.env.PORT || "8080")
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
