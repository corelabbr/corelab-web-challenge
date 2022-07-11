import styles from './inputBasic.module.scss'

interface InputBasicProps {
    placeholder: string,
    value?: string,
    info: string,
    name: string,
    type: 'text' | 'number',
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputBasic = (props: InputBasicProps) =>{

    return(
        <div className={styles.Content}>
            <p >{props.info}</p>
            <input         
                name={props.name}
                placeholder={props.placeholder}
                type={props.type}
                value={props.value} 
                onChange={props.onChange}
            />
        </div>     
    )   
}

export default InputBasic;