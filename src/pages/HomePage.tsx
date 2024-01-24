import { useEffect, useState, useContext } from 'react'
import Nav from '../components/Nav'
import NewItem from '../components/NewItem'
import Note, { NoteProps } from '../components/Note'
import axios from 'axios'
import { TaskContext } from '../context/TaskContext'

export default function Home() {
  // useState
  const [dataTask, setDataTask] = useState([])

  // useContext
  const { isUpdated } = useContext(TaskContext)

  // Functions
  const getTask = async () => {
    try {
      const response = await axios.get('http://localhost:3333/task/')
      console.log(response.data.data)
      setDataTask(response.data.data)
    } catch (error) {
      console.error('Erro na requisição:', error)
    }
  }

  useEffect(() => {
    getTask()
  }, [isUpdated])

  // Variáveis sugestivas
  const appStyles = 'App flex items-center flex-col'

  return (
    <div className={appStyles}>
      <Nav />
      <NewItem />
      <Section title="Favoritos" notes={dataTask} />
      <Section title="Outras" notes={dataTask} />
    </div>
  )
}

type SectionProps = {
  title: string
  notes: NoteProps[]
}

const Section: React.FC<SectionProps> = ({ title, notes }: SectionProps) => {
  const sectionStyles = 'mt-7 w-full px-[5%] lg:px-[7%] xl:px-[7%] 2xl:px-[7%]'
  const titleStyles = 'ms-4'
  const notesContainerStyles =
    'flex gap-7 justify-center flex-wrap lg:justify-start xl:justify-start 2xl:justify-start'

  return (
    <div className={sectionStyles}>
      <span className={titleStyles}>{title}</span>
      <div className={notesContainerStyles}>
        {notes.map((note, index) => {
          const isFavoriteNote = title === 'Favoritos' && note.isFavorite
          const isOtherNote = title === 'Outras' && !note.isFavorite
          if (isFavoriteNote || isOtherNote)
            return <Note key={index} {...note} />
          return null
        })}
      </div>
    </div>
  )
}
