import styles from './EditModal.module.scss'
import Back from '../../assets/back.png'

import { ModalProps } from '../../types/Modal'
import { API } from '../../lib/api'



const EditModal = ( props : ModalProps ) => {

  function Refresh(){
    setTimeout(() => {
      window.location.reload()
    }, 300);
  }

  return(
    <div className={styles.EditModal} style={ props.status ? { display : 'flex'} : { display : 'none'} }>
        <img 
          onClick={()=> props.setStatus(false) }
          src={Back}
          alt='Voltar'
        /> 

        <form method='POST' action={API + '/edit-car'}>

          <div className={styles.DivLabel}>
            <input type={'checkbox'} id={'nameId'} />
              <div className={styles.checkWrapper} >
                <label htmlFor='nameId' className={styles.Labels}>Edite o Nome</label>
                <input type={'text'} name='name' />
              </div>
          </div>    

          <div className={styles.DivLabel}>
            <input type={'checkbox'} id={'brandId'} />
              <div className={styles.checkWrapper} >
                <label htmlFor='brandId' className={styles.Labels}>Edite a Marca</label>
                <input type={'text'} name='brand' />
              </div>
          </div>    

          <div className={styles.DivLabel}>
            <input type={'checkbox'} id={'colorId'} />
              <div className={styles.checkWrapper} >
                <label htmlFor='colorId' className={styles.Labels}>Edite a Cor</label>
                <input type={'text'} name='color'/>
              </div>
          </div>

          <div className={styles.DivLabel}>
            <input type={'checkbox'} id={'yearId'} />
              <div className={styles.checkWrapper} >
                <label htmlFor='yearId' className={styles.Labels}>Edite o Ano</label>
                <input type={'number'} name='year'/>
              </div>
          </div>    

          <div className={styles.DivLabel}>
            <input type={'checkbox'} id={'boardId'} />
              <div className={styles.checkWrapper} >
                <label htmlFor='boardId' className={styles.Labels}>Edite a Placa</label>
                <input type={'text'} name='board' value={props.board}/>
              </div>
          </div>    

          <div className={styles.DivLabel}>
            <input type={'checkbox'} id={'priceId'} />
              <div className={styles.checkWrapper} >
                <label htmlFor='priceId' className={styles.Labels}>Edite o Preço</label>
                <input type={'number'} name='price'/>
              </div>
          </div>    

          <button onClick={()=> Refresh()}>Salvar</button> 
            
        </form>
    </div>
  );
}

export default EditModal;