import { useEffect, useState } from 'react'
import './App.scss'
import CreateTask from './components/CreateTask/CreateTask'
import NavBar from './components/NavBar/NavBar'
import Task from './components/Task/Task'
import { TaskType } from './types/Task'
import { AxiosInstance } from './utils/Axios'

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([])

  const handleTask = async (q : string) => {
    try {
      const response = await AxiosInstance.get(`tasks?q=${q}`);
      if(response.data){
        // console.log(response.data)
        setTasks(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await AxiosInstance.get('tasks');
        if(response.data){
          // console.log(response.data)
          setTasks(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    getTasks();
  }, [])

  return (
      <div className='main'>
          <div>
            <NavBar handleTask={handleTask}/>
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{marginBottom:'30px', margin:'auto', marginTop:'15px'}}><CreateTask/></div>
            <h4>Favoritos</h4>
            <div className='tasks1'>
              {tasks && tasks.length != 0 && tasks.map((taskData) => (
                <>
                  {taskData.favorite && <Task id={taskData.id} title={taskData.title} description={taskData.description} favorite={taskData.favorite} color={taskData.color} />}
                </>
                
              ))}
            </div>
            <h4>Outras</h4>
            <div className='tasks2'>
              {tasks && tasks.length != 0 && tasks.map((taskData) => (
                <>
                  {!taskData.favorite && <Task id={taskData.id} title={taskData.title} description={taskData.description} favorite={taskData.favorite} color={taskData.color} />}
                </>
              ))}
            </div>
          </div>
      
      </div>    
  )
}

export default App
