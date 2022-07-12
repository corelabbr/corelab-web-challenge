import { ArrowLeft } from 'phosphor-react';
import styles from './GoBackButton.module.scss';

import { useNavigate } from 'react-router-dom';

export function Arrow() {
    const navigate = useNavigate();

    function handleGoBack() {
        navigate(-1);
    }

    return (
        <div className={styles.arrow__container}>
            <ArrowLeft 
                size={32} 
                onClick={handleGoBack}
                />
        </div>
    )
}