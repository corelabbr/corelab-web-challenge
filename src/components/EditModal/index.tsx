import styles from './EditModal.module.scss'
import Back from '../../assets/back.png'

import { ModalProps } from '../../types/Modal'
import { API } from '../../lib/api'


const EditModal = ( props : ModalProps ) => {
  return(
    <div className={styles.Modal} style={ props.status ? { display : 'flex'} : { display : 'none'} }>
        <img 
          onClick={()=> props.setStatus(false) }
          src={Back}
          alt='Voltar'
        /> 

        <form method='PUT' action={API + '/edit-car'}>
            
        </form>
          
    </div>
  );
}

export default EditModal;