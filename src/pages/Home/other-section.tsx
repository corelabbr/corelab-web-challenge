import { Task } from '../../types/Task'
import styles from './Home.module.scss'
import { TaskCard } from '../../components'

interface OtherSectionProps {
  otherTasks: Task[];
}

const OtherSection = ({ otherTasks }: OtherSectionProps) => {
  return (
    <div className={styles.NotesContainer}>
      <div className={styles.NotesHeader}>
        <h3>Outras</h3>
      </div>
      <div className={styles.NotesContent}>
        {otherTasks.length >= 1 ? (
          otherTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className={styles.NoTasks}>
            <h3>Nenhuma nota disponivel</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default OtherSection
