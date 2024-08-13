import styles from './Main.module.scss'

function Main({ children }: { children: React.ReactNode }) {
  return <main className={styles.main}>{children}</main>
}

export default Main
