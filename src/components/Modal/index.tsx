
import styles from './Modal.module.scss'

const Modal = () => {
  return(
    <div className={styles.Modal}>
        <form>
            <input type='text' placeholder='Nome' />
            <input type='text' placeholder='Marca' />
            <input type='text' placeholder='Cor' />
            <input type='text' placeholder='Ano' />
            <input type='text' placeholder='Placa' />
            <input type='text' placeholder='Preço' />

            <button>Salvar</button>
        </form>
    </div>
  );
}

export default Modal;