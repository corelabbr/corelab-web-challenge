import styles from "./BackArrow.module.scss";

// TODO: remove style
// TODO: types

const BackArrow = (props: any) => {
  return (
    <div
      style={{
        background: "none",
        color: "inherit",
        border: "none",
        padding: 0,
        font: "inherit",
        cursor: "pointer",
        outline: "inherit",
      }}
      onClick={props.onClick}
    >
      <img src='./assets/backArrow.svg' alt='voltar para página principal' className={styles.backArrow} />
    </div>
  );
};

export default BackArrow;
