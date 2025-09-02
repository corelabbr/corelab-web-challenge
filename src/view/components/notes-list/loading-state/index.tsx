import clsx from 'clsx'
import styles from './styles.module.scss'

export function LoadingState() {
  return (
    <div className={styles.container}>
      <h2 className={styles['container-list-title-loading']} />
      <div className={styles['container-list']}>
        <div className={styles['loading-card']}>
          <div className={clsx(styles['loading-title'], 'pulse-animation')} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-star']} />
        </div>
        <div className={styles['loading-card']}>
          <div className={clsx(styles['loading-title'], 'pulse-animation')} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-star']} />
        </div>
        <div className={styles['loading-card']}>
          <div className={clsx(styles['loading-title'], 'pulse-animation')} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-star']} />
        </div>
        <div className={styles['loading-card']}>
          <div className={clsx(styles['loading-title'], 'pulse-animation')} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-star']} />
        </div>
        <div className={styles['loading-card']}>
          <div className={clsx(styles['loading-title'], 'pulse-animation')} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-description']} />
          <div className={styles['loading-star']} />
        </div>
      </div>
    </div>
  )
}
