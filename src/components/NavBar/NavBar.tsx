import React, { useState } from 'react'
import './NavBar.scss';
import { AxiosInstance } from '../../utils/Axios';


type Props = {
    handleTask: (q: string) => void,
}

const NavBar = ({handleTask}: Props) => {
    const [search, setSearch] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearch(query);
        handleTask(query);
    }
    
    const handleDelete = async () => {
        try {
            const response = await AxiosInstance.delete(`/tasks`);
            if(response.data){
                location.reload()
                alert('Tarefas excluidas');
            }
        } catch (error) {
            console.log('Erro ao excluir tarefas')
            location.reload()
        }
    }

  return (
    <header className='header'>
        <div className='iconAndText'>
            <div>
                <img src="notes.png" alt="Notes icon" />
            </div>
            <div className='space'>
                <span>CoreNotes</span>
            </div>
        </div>
        <div className='searchNotes'>
            <input placeholder='Pesquisas notas' type="text" value={search} onChange={handleChange}/>
        </div>
        <div className='x' onClick={() => handleDelete()}>
            <img src="close.png"  alt="" />
        </div>
    </header>
  )
}

export default NavBar