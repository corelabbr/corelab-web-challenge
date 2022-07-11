import NavBar from "../navBar/navBar";
import styles from './layout.module.scss'


interface LayoutProps {
    children?:any
}

const Layout = (props: LayoutProps) =>{

    return(
        <div className={styles.Content} >
            <NavBar/>
            <div>
                {props.children}
            </div> 
        </div>
    )
}

export default Layout;