import styles from './navBar.module.scss'
import * as icon from '../icons/index'

const NavBar = () =>{
    return(
        <header className={styles.header}>     
            <>
                <a  href="http://localhost:3001/">
                    <img
                        src="/images/logo_corelab.jpg"
                        alt="Logo Empresa"
                    />
                </a>
                
                <a href="http://localhost:3001/" >
                    Corelab Challenge
                </a>
            </>

            <a href="http://localhost:3001/favorites" className={styles.ContentOptions}>
                <i>{icon.heart}</i>
            </a>
        </header>
    )
}

export default NavBar;