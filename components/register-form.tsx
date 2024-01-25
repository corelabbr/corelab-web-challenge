'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpUser } from '@/app/api/auth/register';
import { SignUpDataType } from '@/types/common';

const RegisterForm = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const response = await signUpUser({ fullName, email, password });

      if (response?.status === 201) {
        router.replace('/login');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao processar a solicitação:', error);
    }
  };

  return (
    <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
      <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
          Registar-se
        </h1>
        <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor='fullName'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Nome
            </label>
            <input
              type='text'
              name='fullName'
              id='full-name'
              placeholder='Nome completo'
              className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
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
            Registar-se
          </button>
          <p className='text-sm font-light text-gray-500'>
            Já tem uma conta?{' '}
            <a
              href='/login'
              className='font-medium text-primary-600 hover:underline'
            >
              Entrar
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
