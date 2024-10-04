import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import { render } from 'react-dom'
import './styles/global.css'


const queryClient = new QueryClient()

const Notes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}

render(<Notes />, document.getElementById('root'))
