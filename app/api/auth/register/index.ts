import { SignUpDataType } from '@/types/common';

export const signUpUser = async (data: SignUpDataType) => {
  try {
    const response = await fetch('http://localhost:3000/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    return response;
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
  }
};
