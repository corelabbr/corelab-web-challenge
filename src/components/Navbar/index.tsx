import styles from './Navbar.module.scss'

interface INavbar {
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }
  
  const Navbar = (props: INavbar) => {
    return (
        <div className={styles.Navbar}>
            <img src="/logo512.png" />
            <h1>CoreNotes</h1>
            <input type="text" placeholder={props.placeholder} value={props.value} />
        </div>
    );
  };
  
  export default Navbar;
  