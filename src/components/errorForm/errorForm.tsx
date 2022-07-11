import styles from './errorForm.module.scss';

interface ErrorFormProps {
    message: string;
}

const ErrorForm = (props: ErrorFormProps) =>{

    return(
        <p className={styles.Content}>
            {props.message}
        </p>
    )
    
}

export default ErrorForm;