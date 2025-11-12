import styles from "./NotFound.module.scss";

const NotFound = () => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContent}>
        <h1 className={styles.title}>Página não encontrada!</h1>

        <img
          src="/navbar-icon.png"
          alt="CoreNotes Icon"
          width="72px"
          height="72px"
        />

        <p className={styles.subtitle}>
          Volte para tela de <a href="/login">login</a> para entrar no CoreNotes
        </p>
      </div>
    </div>
  );
};

export default NotFound;
