import { Task } from '../../types/Task'
import styles from './Home.module.scss'
import { TaskCard } from '../../components'

interface FilterSectionProps {
  filteredTasks: Task[];
}

const FilterSection = ({ filteredTasks }: FilterSectionProps) => {
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (a.favorited && !b.favorited) return -1
    if (!a.favorited && b.favorited) return 1
    return 0
  })

  return (
    <div className={styles.NotesContainer}>
      <div className={styles.NotesHeader}>
        <h3>
          Notas{filteredTasks.length >= 1 ? `: ${filteredTasks.length}` : ''}
        </h3>
      </div>
      <div className={styles.NotesContent}>
        {filteredTasks.length >= 1 ? (
          <>
            {sortedTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </>
        ) : (
          <div className={styles.NoTasks}>
            <h3>Nenhuma nota encontrada</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default FilterSection
