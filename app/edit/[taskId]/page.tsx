import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AddTask from '@/components/add-task';
import Navbar from '@/components/navbar';
import TasksList from '@/components/tasks-list';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import EditTaskForm from '@/components/edit-task-form';

export default async function EditPage({
  params: { taskId },
}: {
  params: { taskId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <section className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <div className='container relative mx-auto max-w-2xl bg-floralWhite rounded-lg border py-6 px-4 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]'>
        <EditTaskForm session={session} taskId={taskId} />
      </div>
    </section>
  );
}
