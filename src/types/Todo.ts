import Colors from './Colors'

type TodoType = {
  id: string
  title: string
  description: string
  color: keyof typeof Colors
  favorite: boolean
  createdAt: string
}

type TodoRegisterType = {
  title: string
  description: string
  favorite: boolean
}

type TodoUpdaterType = {
  color: keyof typeof Colors
} & TodoRegisterType

type TodoFilterType = {
  text: string
  color: keyof typeof Colors | null
}

export type { TodoType, TodoRegisterType, TodoUpdaterType, TodoFilterType }
