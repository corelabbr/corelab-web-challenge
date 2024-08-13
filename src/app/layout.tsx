import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import TodoProvider from '@/context/TodoContext'
import { ToastContainer } from 'react-toastify'
import styles from '@/styles/global.module.scss'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Corelab Challange',
  description: 'Created by Luiz Gustavo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <TodoProvider>
        <body className={(inter.className, styles.body)}>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <SkeletonTheme baseColor="#D9D9D9" highlightColor="#FFFFFF">
            {children}
          </SkeletonTheme>
        </body>
      </TodoProvider>
    </html>
  )
}
