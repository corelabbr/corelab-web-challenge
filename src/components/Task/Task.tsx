import React, { useState } from 'react'
import './Task.scss';
import CoolorsTab from '../CoolorsTab/CoolorsTab';
import { TaskType } from '../../types/Task';
import { AxiosInstance } from '../../utils/Axios';



const Task = (props: TaskType) => {
    const [backet, setBacket] = useState(false);
    const [color, setColor] = useState<string>(props.color);
    const [favorite, setFavorite] = useState<boolean>(props.favorite)
    const [title, setTitle] = useState<string>(props.title);
    const [description, setDescription] = useState<string>(props.description);
    const [edit, setEdit] = useState<boolean>(false);


    const handleEdit = async () => {
        try {
            const response = await AxiosInstance.patch(`/task/${props.id}`, {title, description})
            if(response.data){
                alert('Dados atualizados.');
            }
        } catch (error) {
            alert('Erro ao atualizar dados');
        }
    }

    const handleFavorite = async () => {
        setFavorite(!favorite);
        try {
            const response = await AxiosInstance.patch(`/task/favorite/${props.id}`);
            if(response.data){
                location.reload()
                alert('Favoritado');
            }
        } catch (error) {
            alert('Erro ao favoritar')
        }
    }

    const handleColor = async (colorP: string) => {
        try {
            const response = await AxiosInstance.patch(`/task/color/${props.id}`,{colorP});
            if(response.data){
                // console.log(response.data)
                alert('Cor alterada');
            }
        } catch (error) {
            alert('Erro ao cor alterar cor')
        }
    }

    const handleDelete = async () => {
        try {
            const response = await AxiosInstance.delete(`/task/${props.id}`);
            if(response.data){
                console.log(response.data)
                location.reload()
                alert('Tarefa excluida');
            }
        } catch (error) {
            alert('Erro ao excluir tarefa')
        }
    }

  return (
    <>
        <div style={{backgroundColor: color, marginBottom:'30px'}} className='task'>
            <div className='header'>
                <div>
                    <input type="text" placeholder='Titulo' value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} />
                </div>
                <div>
                    {!favorite && <img src="star.png" alt="star icon" onClick={() => handleFavorite()} />}
                    {favorite && <img src="starActive.png" alt="star icon" onClick={() => handleFavorite()}/>}
                </div>
            </div>
            <hr />
            <div>
                <div className='description'>
                    <textarea value={description} placeholder='Descrição' style={{backgroundColor: color}} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}/>
                </div>
                <div className='footer'>
                    <div className='options'>
                        <div>
                            <img src="pencil.png" alt="pencil icone" onClick={handleEdit} />
                        </div>
                        <div>
                            <img onClick={() => setBacket(!backet)} src='backet.png' style={backet ? {backgroundColor: `${color}`, borderRadius:'50%', padding: '2px'} : {}} alt="" />
                        </div>
                    </div>
                    <div>
                        <img src="close.png" alt="" onClick={() => handleDelete()}/>
                    </div>
                </div>
            </div>
            <div className='color'>{backet && <CoolorsTab setColor={setColor} handleColor={handleColor}/>}</div>
        </div>
        
    </>
  )
}

export default Task;