
import Close from '../../assets/close.png'
import styles from './Modal.module.scss'

import { ModalProps } from '../../types/Modal';
import { API } from '../../lib/api';

const Modal = ( props : ModalProps ) => {

  function RefreshPage() : void {
    setTimeout(() => {
      window.location.reload()  
    }, 500);
  } 

  return(
      <div className={styles.Modal} style={ props.status ? { display : 'flex'} : {display : 'none'} }>

  
        <div className={styles.Box}>
          <form method='POST' action={API + '/new-car'}>

              <img 
                onClick={()=> props.setStatus(false)} 
                className={styles.CloseModal}
                src={Close}
                alt={'Back'} 
              />

              <input type='text' name='name' placeholder='Carro' />
              <input type='text' name='brand' placeholder='Marca' />

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
              
              <input type='number' name='year' placeholder='Ano' />
              <input type='text' name='board' placeholder='Placa' />
              <input type='number' name='price' placeholder='Preço' />
  
              <button onClick={()=> RefreshPage()}>Salvar</button>
          </form>
        </div>
      </div>
  )

}

export default Modal;