import styles from './Home.module.scss'
import { Task } from '../../types/Task'
import { Colors } from '../../types/Colors'
import { useFilter } from '../../hooks/useFilter'
import { useQuery } from '@tanstack/react-query'
import TaskService from '../../utils/task'
import Lottie from 'lottie-react'
import Loading from '../../assets/loading.json'
import CreateTaskInput from '../../components/CreateTaskInput'
import FavoriteSection from './fav-section'
import OtherSection from './other-section'
import FilterSection from './filter-section'

const HomePage = () => {
  const { search, color } = useFilter()

  const { data, isLoading } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: TaskService.getTasks,
  })

  const tasks = data || []
  const filtering = search || color !== Colors.Default ? true : false

  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(search.toLowerCase()) &&
      (color === Colors.Default || task.color === (color as string))
    )
  })

  const favTasks = filteredTasks.filter((task) => task.favorited).reverse()
  const otherTasks = filteredTasks.filter((task) => !task.favorited).reverse()

  return (
    <div className={styles.Container}>
      <main className={styles.main}>
        <CreateTaskInput />
        {isLoading ? (
          <div className={styles.NotesContainer}>
            <div className={styles.NotesHeader}></div>
            <div className={styles.NoTasks}>
              <h3>Carregando notas...</h3>
              <Lottie animationData={Loading} className={styles.Anim} />
            </div>
          </div>
        ) : filtering ? (
          <FilterSection filteredTasks={filteredTasks} />
        ) : (
          <>
            <FavoriteSection favTasks={favTasks} />
            <OtherSection otherTasks={otherTasks} />
          </>
        )}
      </main>
    </div>
  )
}

export default HomePage
