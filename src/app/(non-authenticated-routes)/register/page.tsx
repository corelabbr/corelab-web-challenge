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
import Button from '../../../presentation/components/Button';
import Link from 'next/link';
import userRegister from '../../../api/endpoints/users/register.request';
import refreshPage from '../../../server/utils/refresh.function';

const registerSchema = z.object({
  name: z.string().min(2, { message: 'Campo obrigatório.' }),
  email: z.string().min(14, { message: 'Campo obrigatório.' }),
  password: z.string().min(8, { message: 'Campo obrigatório.' }),
  password_confirmation: z.string().min(8, { message: 'Campo obrigatório.' }),
});

type RegisterSchemaInterface = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const [errorMessage, setErrorMessage] = useState('');
  const [registerData, setRegisterData] = useState<RegisterSchemaInterface>();

  const { register, handleSubmit } = useForm<RegisterSchemaInterface>({
    resolver: zodResolver(registerSchema),
    mode: 'all',
  });

  const { modal, setModal, openCloseModal } = useModal();

  async function onSubmit(data: RegisterSchemaInterface) {
    setRegisterData(data);
  }

  function setError(message: string) {
    setErrorMessage(message);
  }

  useEffect(() => {
    (async () => {
      if (registerData !== undefined) {
        try {
          const registerReq = await userRegister({
            name: registerData.name,
            email: registerData.email,
            password: registerData.password,
            password_confirmation: registerData.password_confirmation,
          });

          if ('statusCode' in registerReq) {
            setError(registerReq.message);
            setModal({ message: errorMessage, type: 'error' });
            setRegisterData(undefined);
            return;
          } else {
            sessionStorage.setItem('session', registerReq.token);
            refreshPage();
            redirect('/dashboard');
          }
      } catch (error: unknown) {
        setError((error as Error).message);
          setModal({ message: errorMessage, type: 'error' });
          setRegisterData(undefined);
        }
      }
    })();
  });

  return (
    <section className={s.register_screen}>
      <h1 className={s.h1}>Bem-vindo ao CoreNotes!</h1>
      <h2 className={s.h2}>
        Insira seus credenciais abaixo para se cadastrar na nossa plataforma:
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className={s.login_area}>
        <div className={s.text_field}>
          <InputComponent
            forName="name"
            text="Nome"
            uppercase
            type="text"
            placeholder="Digite seu nome."
            name="name"
            maxLength={50}
            register={register}
          />
        </div>
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
        <div className={s.text_field}>
          <InputComponent
            forName="password_confirmation"
            text="Confirmar senha"
            uppercase
            type="password"
            placeholder="Confirme a sua senha."
            name="password_confirmation"
            maxLength={40}
            register={register}
          />
        </div>
        <div className={s.button_div}>
          <Button text="REGISTRAR" type="submit" />
        </div>

        {modal?.message !== '' && (
          <Modal modal={modal} openCloseModal={openCloseModal} />
        )}
      </form>
      <h2 className={s.h2}>
        Já tem conta? <Link href="/login">Clique aqui</Link> para fazer login.
      </h2>
    </section>
  );
}