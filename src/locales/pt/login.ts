const login = {
  title: 'Sistema fullstack simples feito com o melhor do TS.',
  description:
    'Website leve de gerenciamento de notas para fins demonstrativos.',
  form: {
    email_placeholder: 'alice@exemplo.com',
    submit_button: {
      continue_text: 'Continuar',
      please_wait_text: 'Um momento...',
    },
    toast: {
      success: { title: 'Link de login enviado! Confira seu e-mail.' },
      error: { title: 'Tivemos um probleminha! Tente novamente mais tarde.' },
    },
  },
} as const

export { login }
