import React, { useState } from 'react'
import './CreateTask.scss'
import { AxiosInstance } from '../../utils/Axios'

type Props = {}

const CreateTask = (props: Props) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [favorite, setFavorite] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false);
    const [feedBack, setFeedBack] = useState<string>('');


    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const task = {
            title,
            description,
            favorite
        }

        try {
            const response = await AxiosInstance.post('task', task);

            if(response.data){
                setTitle('');
                setDescription('');
                setFavorite(false);
                location.reload()
                alert('Tarefa criada com sucesso')
                // setFeedBack('Tarefa criada com sucesso');

            }
        } catch (error) {
            if(error)
                alert('Erro ao criar tarefa');
                // console.log(error)
                // setFeedBack('Erro ao criar tarefa');
        }

    }


  return (
    <div style={{backgroundColor: 'white'}} className='createTask'>
            <form onSubmit={handleSubmit}>
                <div className='header'>
                    <div>
                        <input type="text" value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} placeholder='Titulo' />
                    </div>
                    <div>
                        {!favorite && <img src="star.png" alt="star icon" onClick={() => setFavorite(true)} />}
                        {favorite && <img src="starActive.png" alt="star icon" onClick={() => setFavorite(false)}/>}
                    </div>
                </div>
                <hr />
                <div>
                    <div className='description'>
                        <input type='text' value={description} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value) }placeholder='Descrição' style={{backgroundColor: 'white'}}/>
                    </div>
                </div>
                <input type="submit"  hidden/>
            </form>
        {/* {feedBack && <span>`{feedBack}`</span>} */}
    </div>
  )
}

export default CreateTask