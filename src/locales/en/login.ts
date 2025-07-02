const login = {
  title: 'Simple fullstack application built using the best of TS.',
  description:
    'Just a lightweight notes management website made for demo purposes.',
  form: {
    email_placeholder: 'alice@example.com',
    submit_button: {
      continue_text: 'Continue',
      please_wait_text: 'Please wait...',
    },
    toast: {
      success: { title: 'Login link sent! Look for it in your email.' },
      error: { title: 'Something went wrong! Please come back later.' },
    },
  },
} as const

export { login }
