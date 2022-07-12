import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

interface ButtonProps {
    text: String;
}

export function Button({text}: ButtonProps) {
    return (
        <Link to={"/add"} className={styles.button}>
            {text}
        </Link>
    )
}