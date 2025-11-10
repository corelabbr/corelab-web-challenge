import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ITask } from '@/types/task'
import { PaintBucket, PenIcon, Star, XIcon } from 'lucide-react'

interface TaskProps {
  task: ITask
}

const Task = ({ task }: TaskProps) => {
  return (
    <Card>
      <CardHeader className="p-0">
        <CardTitle className="flex justify-between border-b-2 p-4 text-sm">
          {task.title}
          {task.favorite ? (
            <Star className="text-yellow-500" />
          ) : (
            <Star className="text-gray-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="min-h-36 p-4">
        <p className="text-xs">{task.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <div className="flex gap-3">
          <PenIcon size={16} />
          <PaintBucket size={16} />
        </div>
        <XIcon />
      </CardFooter>
    </Card>
  )
}

export default Task
