import styles from './alert.module.scss'

interface AlertProps {
    info: string
    color: string
    onClick: () => void;
}

const AlertItem = (props: AlertProps) =>{

    return(
        <div style={{backgroundColor: props.color}} className={styles.Content}>
            <span className={styles.CloseBtn} onClick={props.onClick}> &times;</span> 
            {props.info}
        </div>
    )
}

export default AlertItem;