import styles from "./Card.module.scss";

interface TaskContentProps {
  text: string;
  isViewMode: boolean;
  onChangeText: (text: string) => void;
}

const TaskContent = ({ text, isViewMode, onChangeText }: TaskContentProps) => {
  return (
    <div className={styles.content}>
      <textarea
        value={text}
        onChange={(e) => onChangeText(e.target.value)}
        className={styles.inputText}
        disabled={isViewMode}
        readOnly={isViewMode}
        placeholder={
          isViewMode
            ? ""
            : "Clique ou arraste o arquivo para esta área para fazer upload"
        }
      />
    </div>
  );
};

export default TaskContent;
