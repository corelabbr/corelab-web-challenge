'use client';
import React, { SyntheticEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result);
      return;
    }

    router.replace('/');
  }
  return (
    <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
      <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
          Entrar
        </h1>
        <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='email'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              E-mail
            </label>
            <input
              type='email'
              name='email'
              id='email'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              placeholder='name@company.com'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor='password'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Palavra-passe
            </label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='••••••••'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type='submit'
            className='w-full text-floralWhite bg-primary hover:bg-secondary font-medium rounded-lg text-sm px-5 py-2.5 mb-2 md:mb-0'
          >
            Entrar
          </button>
          <p className='text-sm font-light text-gray-500'>
            Nao tem uma conta?{' '}
            <a
              href='/register'
              className='font-medium text-primary-600 hover:underline'
            >
              Registar-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
