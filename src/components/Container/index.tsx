import { ReactNode } from "react";
import styles from "./Container.module.scss"

interface IContainer {
  title: string;
  children: ReactNode;
}

const Container = (props: IContainer) => {
  return (
    <div className={styles.Container}>
      <div className={styles.containerAlign}>
        <p className={styles.containerTitle}>{props.title}</p>
        <div className={styles.containerContent}>{props.children}</div>
      </div>


    </div>
  );
};

export default Container;
