import { ITask } from '@/types/task'
import Task from './ui/task'

const gellAllTask = async () => {
  const response = await fetch('http://localhost:3333', { cache: 'no-store' })
  const tasks = (await response.json()) as ITask[]
  return tasks
}

const AllTasks = async () => {
  const tasks = await gellAllTask()
  const favoriteTasks = tasks.filter((task) => task.favorite)
  const otherTasks = tasks.filter((task) => !task.favorite)
  return (
    <div>
      <div className="py-4">
        <h2 className="mb-4 font-bold">Favoritas</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteTasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-4 font-bold">Outras</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherTasks.map((task) => (
            <Task task={task} key={task.id} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default AllTasks
