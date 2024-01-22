import { addTask, deleteTask, getTasks, updateTask } from '../lib/api'
import { Task } from '../types/Task'

class TaskService {
  async getTasks(): Promise<Task[]> {
    const tasks = await getTasks()
    return tasks
  }

  async addTask(task: Task): Promise<void> {
    await addTask(task)
  }

  async updateTask(newTask: Task): Promise<void> {
    await updateTask(newTask)
  }

  async deleteTask(id: string): Promise<void> {
    await deleteTask(id)
  }
}

export default new TaskService()
