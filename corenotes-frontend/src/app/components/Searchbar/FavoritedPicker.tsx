import styles from "./styles.module.scss";

interface propsType {
  selectOption: (option: string) => void;
}

export function FavoritedPicker(props: propsType) {
  const { selectOption } = props;

  return (
    <ul className={styles.favorites_filter}>
      <li onClick={() => selectOption("favoritas")}>Favoritas</li>
      <li onClick={() => selectOption("outras")}>Outras</li>
      <li onClick={() => selectOption("todas")}>Todas</li>
    </ul>
  );
}
