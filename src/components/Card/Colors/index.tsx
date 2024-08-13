import styles from './Colors.module.scss'
import ColorsEnum from '@/types/Colors'

type ColorsProps = {
  updateTodoColor(c: string): Promise<void>
}

function Colors({ updateTodoColor }: ColorsProps) {
  const colorsKeys = Object.keys(ColorsEnum)
  colorsKeys.shift()

  const colorsSection1 = colorsKeys.slice(0, Math.floor(colorsKeys.length / 2))
  const colorsSection2 = colorsKeys.slice(colorsSection1.length, colorsKeys.length)

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        {colorsSection1.map((c, i) => {
          const colorValue = ColorsEnum[c as keyof typeof ColorsEnum]
          return (
            <div
              key={`${colorValue} - ${i}`}
              onClick={() => updateTodoColor(c)}
              className={`${styles.color} ${styles[colorValue]}`}
            />
          )
        })}
      </section>
      <section className={styles.section}>
        {colorsSection2.map((c, i) => {
          const colorValue = ColorsEnum[c as keyof typeof ColorsEnum]
          return (
            <div
              key={`${i} - ${colorValue}`}
              onClick={() => updateTodoColor(c)}
              className={`${styles.color} ${styles[colorValue]}`}
            />
          )
        })}
      </section>
    </div>
  )
}

export default Colors
