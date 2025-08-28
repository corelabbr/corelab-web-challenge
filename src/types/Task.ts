export type TaskColor = 'yellow' | 'blue' | 'green' | 'peach'

export interface Task {
  id: number
  title: string
  description?: string
  color: TaskColor
  isFavorite: boolean
  createdAt: string
  updatedAt: string
}

export interface TaskInput {
  title: string
  description?: string
  color?: TaskColor
  isFavorite?: boolean
}
