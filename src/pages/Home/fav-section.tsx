import { Task } from '../../types/Task'
import styles from './Home.module.scss'
import Lottie from 'lottie-react'
import Anim from '../../assets/anim.json'
import { TaskCard } from '../../components'

interface FavoriteSectionProps {
  favTasks: Task[];
}

const FavoriteSection = ({ favTasks }: FavoriteSectionProps) => {
  return (
    <div className={styles.NotesContainer}>
      <div className={styles.NotesHeader}>
        <h3>Favoritas</h3>
      </div>
      <div className={styles.NotesContent}>
        {favTasks.length >= 1 ? (
          favTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <div className={styles.NoTasks}>
            <Lottie animationData={Anim} className={styles.Anim} />
            <h3>Nenhuma nota favorita</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default FavoriteSection
