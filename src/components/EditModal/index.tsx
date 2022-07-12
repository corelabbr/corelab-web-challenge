import styles from './EditModal.module.scss'
import Close from '../../assets/close.png'

import { ModalProps } from '../../types/Modal'
import { ICard } from '../Card'
import { API } from '../../lib/api'
import { useState } from 'react'


type EditProps = ModalProps & ICard;

const EditModal = ( props : EditProps ) => {

  const [name, setName] = useState<string>(props.name)
  const [brand, setBrand] = useState<string>(props.brand)
  const [year, setYear] = useState<string | number>(props.year)
  const [price, setPrice] = useState<string | number>(props.price)
  const [board, setBoard] = useState<string>(props.board)
  

  function Refresh(){
    setTimeout(() => {
      window.location.reload()
    }, 300);
  }

  

  return(
    <div className={styles.EditModal} style={ props.status ? { display : 'flex'} : { display : 'none'} }>
        
      <div className={styles.Box}>

      <img 
          onClick={()=> props.setStatus(false) }
          src={Close}
          alt='Voltar'
        /> 

        <form method='POST' action={API + '/edit-car'}>
        
          <input type={'text'} value={props.id} name={'id'} style={{display : 'none'}} />
 
          <div>
            <h3>Edite o Nome</h3>
            <input type={'text'} name={'name'} value={name} onChange={(e)=> setName(e.target.value)} />
          </div>

          <div>
            <h3>Edite a Marca</h3>
            <input type={'text'} name={'brand'} value={brand} onChange={(e)=> setBrand(e.target.value)} />
          </div>
          
          <div>
            <h3>Edite o Ano</h3>
            <input type={'number'} name={'year'}  value={year} onChange={(e)=> setYear(e.target.value)} />
          </div>

          <select name='color' className={styles.Select}>
                  <option value='white'>Branco</option>
                  <option value='black'>Preto</option>
                  <option value='blue'>Azul</option>
                  <option value='red'>Vermelho</option>
                  <option value='green'>Verde</option>
                  <option value='yellow'>Amarelo</option>
                  <option value='orange'>Laranja</option>
                  <option value='purple'>Roxo</option>
                  <option value='aqua'>Aqua</option>
                  <option value='pink'>Rosa</option>
                  <option value='brown'>Marrom</option>
                  <option value='gray'>Cinza</option>
              </select>

          <div>
            <h3>Edite o Placa</h3>
            <input type={'text'} name={'board'} value={board} onChange={(e)=> setBoard(e.target.value)}/>
          </div>

          <div>
            <h3>Edite o Preço</h3>
            <input type={'text'} name={'price'} value={price} onChange={(e)=> setPrice(e.target.value)} />
          </div>

          <button onClick={()=> Refresh()}>Salvar</button>     
        </form>
      </div>
    </div>
  );
}

export default EditModal;