import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.module.scss'
import reportWebVitals from './reportWebVitals'
import NavBar from './components/NavBar'
import { FilterContextProvider } from './contexts/filter-context'
import HomePage from './pages/Home'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './lib/query-client'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)



root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FilterContextProvider>
        <NavBar />
        <HomePage />
      </FilterContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
