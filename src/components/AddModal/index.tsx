
import Back from '../../assets/back.png'
import styles from './Modal.module.scss'

import { ModalProps } from '../../types/Modal';

const Modal = ( props : ModalProps ) => {

  function RefreshPage() : void {
    setTimeout(() => {
      window.location.reload()  
    }, 500);
  } 

  return(
      <div className={styles.Modal} style={ props.status ? { display : 'flex'} : {display : 'none'} }>

      <img 
          onClick={()=> props.setStatus(false)} 
          className={styles.CloseModal}
          src={Back}
          alt={'Back'} 
      />
  
          <form method='POST' action='http://localhost:3000/new-car'>
              <input type='text' name='name' placeholder='Carro' />
              <input type='text' name='brand' placeholder='Marca' />
              <input type='text' name='color' placeholder='Cor' />
              <input type='number' name='year' placeholder='Ano' />
              <input type='text' name='board' placeholder='Placa' />
              <input type='number' name='price' placeholder='Preço' />
  
              <button onClick={()=> RefreshPage()}>Salvar</button>
          </form>
      </div>
  )

}

export default Modal;