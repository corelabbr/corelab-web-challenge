import styles from "./BackArrow.module.scss";

interface IBackArrow {
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

const BackArrow = (props: IBackArrow) => {
  return (
    <div className={styles.arrowContainer} onClick={props.onClick}>
      <img src='./assets/backArrow.svg' alt='voltar para página principal' className={styles.backArrow} />
    </div>
  );
};

export default BackArrow;
