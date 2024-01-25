import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import AddTask from '@/components/add-task';
import Navbar from '@/components/navbar';
import TasksList from '@/components/tasks-list';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <main className='relative w-full h-full max-w-4xl container m-auto'>
      <Navbar />
      <TasksList session={session} />
      <AddTask session={session} />
    </main>
  );
}
