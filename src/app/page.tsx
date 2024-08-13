import NewTodo from '@/components/Card/NewTodo'
import CardList from '@/components/CardList'
import Layout from '@/components/Layout'
import { TodoType } from '@/types/Todo'
import TodoClient from './todoClient'
import env from '@/env'

async function Home() {
  const data: TodoType[] = await fetch(`${env.apiUrl}/todos`, {
    cache: 'no-store',
  })
    .then((resp) => resp.json())
    .catch((err) => console.log(err))

  return (
    <Layout>
      <NewTodo />
      <CardList listName="favorites" />
      <CardList listName="others" />
      <TodoClient todos={data} />
    </Layout>
  )
}

export default Home
