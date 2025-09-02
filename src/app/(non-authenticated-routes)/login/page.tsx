'use client';

import { redirect } from 'next/navigation';
import s from './styles.module.scss';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useModal } from '../../../presentation/hooks/useModal';
import InputComponent from '../../../presentation/components/Input';
import Modal from '../../../presentation/components/Modal';
import { zodResolver } from '@hookform/resolvers/zod';
import login from '../../../api/endpoints/users/login.request';
import Button from '../../../presentation/components/Button';
import Link from 'next/link';
import refreshPage from '../../../server/utils/refresh.function';

const loginSchema = z.object({
  email: z.string().min(14, { message: 'Campo obrigatório.' }),
  password: z.string().min(8, { message: 'Campo obrigatório.' }),
});

type LoginSchemaInterface = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const [errorMessage, setErrorMessage] = useState('');
  const [loginData, setLoginData] = useState<LoginSchemaInterface>();

  const { register, handleSubmit } = useForm<LoginSchemaInterface>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
  });

  const { modal, setModal, openCloseModal } = useModal();

  async function onSubmit(data: LoginSchemaInterface) {
    setLoginData(data);
  }

  function setError(message: string) {
    setErrorMessage(message);
  }

  useEffect(() => {
    (async () => {
      if (loginData !== undefined) {
        try {
          const loginReq = await login({
            email: loginData.email,
            password: loginData.password,
          });

          if ('statusCode' in loginReq) {
            setError(loginReq.message);
            setModal({ message: errorMessage, type: 'error' });
            setLoginData(undefined);
            return;
          } else {
            sessionStorage.setItem('session', loginReq.token);
            refreshPage();
            redirect('/dashboard');
          }
        } catch (error: unknown) {
          setError((error as Error).message);
          setModal({ message: errorMessage, type: 'error' });
          setLoginData(undefined);
          return;
        }
      }
    })();
  });

  return (
    <section className={s.login_screen}>
      <h1 className={s.h1}>Bem-vindo ao CoreNotes!</h1>
      <h2 className={s.h2}>Faça o seu login abaixo para continuar:</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={s.login_area}>
        <div className={s.text_field}>
          <InputComponent
            forName="email"
            text="E-mail"
            uppercase
            type="email"
            placeholder="Digite seu e-mail."
            name="email"
            maxLength={50}
            register={register}
          />
        </div>
        <div className={s.text_field}>
          <InputComponent
            forName="password"
            text="Senha"
            uppercase
            type="password"
            placeholder="Digite sua senha."
            name="password"
            maxLength={40}
            register={register}
          />
        </div>
        <div className={s.button_div}>
          <Button text="ENTRAR" type="submit" />
        </div>

        {modal?.message !== '' && (
          <Modal modal={modal} openCloseModal={openCloseModal} />
        )}
      </form>
      <h2 className={s.h2}>
        Não é cadastrado? <Link href="/register">Clique aqui</Link> para se
        cadastrar.
      </h2>
    </section>
  );
}
