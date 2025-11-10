import styles from './Loading.module.scss'

export function Loading() {
  return <div className={styles.Loading}>
    <div className={styles.loader}>
      <div className={styles.loaderInner}></div>
    </div>
    <span>Carregando...</span>
  </div>
}
