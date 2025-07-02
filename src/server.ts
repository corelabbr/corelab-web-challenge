import type { AppType } from '@corenotes/server'
import { hc } from 'hono/client'

export const server = hc<AppType>(process.env.NEXT_PUBLIC_API_BASE_URL!, {
  fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
    const response = await fetch(input, {
      method: init?.method ?? 'GET',
      body: init?.body ?? null,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
        ...init?.headers,
      },
    })

    if (response.status === 401) {
      window.location.href = '/login'
    }

    return response
  },
})
