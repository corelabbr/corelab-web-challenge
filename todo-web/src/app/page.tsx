import AllTasks from '@/components/all-tasks'
import CreateNotes from '@/components/create-notes'

export default function Home() {
  return (
    <div className="flex-grow bg-gray-100">
      <div className="container py-5">
        <CreateNotes />
      </div>
      <div className="container py-5">
        <AllTasks />
      </div>
    </div>
  )
}
