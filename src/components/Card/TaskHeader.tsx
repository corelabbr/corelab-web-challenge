import IconButton from "../IconButton";
import { MdStarBorder, MdStar } from "react-icons/md";
import styles from "./Card.module.scss";

interface TaskHeaderProps {
  title: string;
  isFavorite: boolean;
  isViewMode: boolean;
  onFavorite: () => void;
  onChangeTitle: (title: string) => void;
}

const TaskHeader = ({
  title,
  isFavorite,
  isViewMode,
  onFavorite,
  onChangeTitle,
}: TaskHeaderProps) => {
  return (
    <div className={styles.header}>
      {isViewMode ? (
        <h2 className={styles.title}>{title}</h2>
      ) : (
        <input
          className={styles.title}
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          placeholder="Título"
        />
      )}
      {isViewMode && (
        <IconButton
          Icon={isFavorite ? MdStar : MdStarBorder}
          color={isFavorite ? "#ffef13" : ""}
          onClick={onFavorite}
          title={isFavorite ? "Desfavoritar" : "Favoritar"}
        />
      )}
    </div>
  );
};

export default TaskHeader;
