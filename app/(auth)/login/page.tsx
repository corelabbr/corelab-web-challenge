import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginForm from '@/components/login-form';

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }
  return (
    <section className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <h1 className='text-2xl font-semibold whitespace-nowrap text-floralWhite mb-4'>
        To-Do`s
      </h1>
      <LoginForm />
    </section>
  );
}
