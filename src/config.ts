import { z } from 'zod'

const schema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
})

export const config = schema.parse(process.env)
