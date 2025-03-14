import { useContext } from 'react'
import Nav from './components/Nav'
import NewItem from './components/NewItem'
import { TaskContext } from './context/TaskContext'
import { Section } from './components/SectionHome'

export default function Home() {
    const { dataTask } = useContext(TaskContext)
    return (
        <div className='App flex pb-4 flex-col'>
            <Nav />
            <NewItem />
            <div className='flex flex-col gap-5'>
                <Section title='Favoritos' notes={dataTask.filter(d => d.isFavorite === true)} />
                <Section title='Outras' notes={dataTask.filter(d => d.isFavorite === false)} />
            </div>
        </div>
    )
}
