import styles from "./Input.module.scss";

const Input = ({ label, type, onChange, placeholder, value }) => {
  return (
    <div className={styles.Main}>
      <span className={styles.label}>{label}</span>
      <input
        type={type}
        className={styles.input}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default Input;
