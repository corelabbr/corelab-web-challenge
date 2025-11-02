import IconButton from "../IconButton";
import { MdOutlineEdit } from "react-icons/md";
import { BiSolidColorFill } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./Card.module.scss";

interface TaskFooterProps {
  onEdit: () => void;
  onDelete: () => void;
  onOpenColorPicker: () => void;
}

const TaskFooter = ({
  onEdit,
  onDelete,
  onOpenColorPicker,
}: TaskFooterProps) => {
  return (
    <div className={styles.footer}>
      <div>
        <IconButton Icon={MdOutlineEdit} onClick={onEdit} title="Editar nota" />
        <IconButton
          Icon={BiSolidColorFill}
          onClick={onOpenColorPicker}
          title="Mudar cor"
        />
      </div>
      <IconButton
        Icon={AiOutlineClose}
        onClick={onDelete}
        title="Deletar nota"
      />
    </div>
  );
};

export default TaskFooter;
