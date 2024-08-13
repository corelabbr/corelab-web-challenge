import Image from 'next/image'
import styles from './Logo.module.scss'

function Logo() {
  return (
    <div className={styles.logo}>
      <Image src="/logo.png" alt="logo" width={50} height={50} />
      <h3>CoreNotes</h3>
    </div>
  )
}

export default Logo
