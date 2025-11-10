import { ReactNode } from 'react'
import { Header } from './Header'
import styles from './layout.module.scss'
import { LayoutProvider } from './context/LayoutContext'

interface LayoutProps {
  children: ReactNode
}
export function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.Layout}>
      <LayoutProvider>
        <Header />
        <main className={styles.main}>
          <div className={styles.content}>{children}</div>
        </main>
      </LayoutProvider>
    </div>
  )
}
