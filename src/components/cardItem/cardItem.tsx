import * as icon from '../icons/index';
import styles from './cardItem.module.scss';


interface CardItemProps {
    id: string,
    name: string,
    brand: string,
    color: string,
    year: number,
    plate: string,
    price: string,
    description: string,
    onEdit?: () => void;
    onFavorite?: () => void;
    onDelete?: () => void;
}

const CardItem = (props: CardItemProps) =>{  

    return(
        <>             
           <div style={{backgroundColor: props.color}} className={styles.Content}>
                <div className={styles.ContentIcons}>

                    <i 
                        style={{color: props.color}}
                        onClick={ props.onEdit}
                    > 
                        {icon.edit} 
                    </i>
                    <i  
                        style={{color: props.color}} 
                        onClick={props.onDelete}
                    > 
                        {icon.remove} 
                    </i>
                    <i 
                        style={{color: props.color}}
                        onClick={props.onFavorite}
                    > 
                        {icon.heart} 
                    </i>
                </div>
                
                <ul >
                    <li  >
                        <p style={{color: props.color}} className={styles.InfoName}> 
                            {props.brand} {props.name}
                        </p> 
                    </li>
                    <li> 
                        <p style={{color: props.color}} className={styles.Brand}>
                            Preço:
                        </p> 
                        <p style={{color: props.color}} className={styles.Info}>
                            R$ {props.price}
                        </p>
                    
                    </li>
                    <li>
                        <p style={{color: props.color}}  className={styles.Brand}> 
                            Ano:
                        </p>
                        <p style={{color: props.color}}  className={styles.Info}>
                            {props.year}
                        </p>
                    </li>
                    <li>
                        <p style={{color: props.color}}  className={styles.Brand}>
                            Placa: 
                        </p>
                        <p style={{color: props.color}}  className={styles.Info}>
                            {props.plate}
                        </p>
                    </li>
                    <li>
                        <p style={{color: props.color}}  className={styles.Brand}>
                            Descrição:
                        </p>
                        <p style={{color: props.color}}  className={styles.Info}>
                            {props.description}
                        </p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default CardItem;