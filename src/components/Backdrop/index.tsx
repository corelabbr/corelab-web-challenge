import styles from "./Backdrop.module.scss";

type BackdropProps = {
  children?: React.ReactNode;
};

const Backdrop = ({ children }: BackdropProps) => {
  return <div className={styles.backdrop}>{children}</div>;
};

export default Backdrop;
