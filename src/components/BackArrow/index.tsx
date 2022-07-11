import styles from "./BackArrow.module.scss";

const BackArrow = () => {
  return (
    <>
      <div>
        <img src='./assets/backArrow.svg' alt='voltar para página principal' className={styles.backArrow} />
      </div>
    </>
  );
};

export default BackArrow;
