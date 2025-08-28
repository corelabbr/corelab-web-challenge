import type { Task, TaskInput } from '../types/Task'

function normalizeTask(t: any): Task {
  return {
    id: Number(t.id),
    title: t.title,
    description: t.description ?? undefined,
    color: t.color,
    isFavorite: typeof t.isFavorite !== 'undefined' ? !!t.isFavorite : !!t.is_favorite,
    createdAt: t.createdAt ?? t.created_at ?? '',
    updatedAt: t.updatedAt ?? t.updated_at ?? '',
  }
}
function normalizeList(arr: any[]): Task[] {
  return (arr ?? []).map(normalizeTask)
}

function toServerPayload(payload: Partial<TaskInput>): any {
  const out: any = { ...payload }
  if (Object.prototype.hasOwnProperty.call(out, 'isFavorite')) {
    out.is_favorite = (out as any).isFavorite
  }
  return out
}

async function handle(res: Response) {
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} ${res.statusText}${text ? `\n${text}` : ''}`)
  }
  if (res.status === 204) return null
  const text = await res.text().catch(() => '')
  if (!text) return null
  try { return JSON.parse(text) } catch { return null }
}

export async function listTasks(params?: { search?: string }) {
  const qs = new URLSearchParams()
  if (params?.search) qs.set('search', params.search)
  const raw = await handle(
    await fetch(`/tasks${qs.toString() ? `?${qs.toString()}` : ''}`, {
      headers: { Accept: 'application/json' },
    })
  )
  return normalizeList(raw || [])
}

export async function getTask(id: number) {
  const raw = await handle(
    await fetch(`/tasks/${id}`, { headers: { Accept: 'application/json' } })
  )
  return normalizeTask(raw)
}

export async function createTask(payload: TaskInput) {
  const raw = await handle(
    await fetch(`/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(toServerPayload(payload)),
    })
  )
  return normalizeTask(raw)
}

export async function updateTask(id: number, payload: Partial<TaskInput>) {
  const raw = await handle(
    await fetch(`/tasks/${id}`, {
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(toServerPayload(payload)),
    })
  )
  if (raw) return normalizeTask(raw)
  return getTask(id)
}

export async function deleteTask(id: number) {
  await handle(await fetch(`/tasks/${id}`, { method: 'DELETE', headers: { Accept: 'application/json' } }))
  return {}
}
