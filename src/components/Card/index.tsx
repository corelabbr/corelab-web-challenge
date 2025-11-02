import { useState } from "react";
import { ITask } from "../../types/Task";
import { useTasks } from "../../contexts/TasksContext";
import TaskHeader from "./TaskHeader";
import TaskContent from "./TaskContent";
import TaskFooter from "./TaskFooter";
import ColorPickerModal from "./ColorPickerModal";
import { IoCheckmark } from "react-icons/io5";
import styles from "./Card.module.scss";

interface ICard {
  task?: ITask;
  type?: "create" | "edit" | "view";
}

const Card = ({ task, type = "view" }: ICard) => {
  const { deleteTask, updateTask, favoriteTask, changeTaskColor, createTask } =
    useTasks();
  const [item, setItem] = useState<ITask>(
    task || {
      id: "",
      title: "",
      description: "",
      isCompleted: false,
      isFavorite: false,
      color: "#ffffff",
      createdAt: "",
      updatedAt: "",
    }
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isViewMode = type === "view";

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFavorite = () => {
    if (item.id) {
      favoriteTask(item.id);
      setItem((prev) => ({ ...prev, isFavorite: !prev.isFavorite }));
    }
  };

  const handleEditText = (text: string) => {
    setItem((prev) => ({ ...prev, description: text }));
    if (item.id) {
      updateTask(item.id, { description: text });
    }
  };

  const handleChangeColor = (color: string) => {
    if (item.id) {
      changeTaskColor(item.id, color);
      setItem((prev) => ({ ...prev, color }));
    }
    closeModal();
  };

  const handleDelete = () => {
    if (item.id) {
      deleteTask(item.id);
    }
  };

  const handleCreate = () => {
    if (item.title === "" || item.description === "") return;
    if (item.id === "") {
      createTask(item).then(() => {
        setItem({
          id: "",
          title: "",
          description: "",
          isCompleted: false,
          isFavorite: false,
          color: "#ffffff",
          createdAt: "",
          updatedAt: "",
        });
      });
    }
  };

  const cardStyles = {
    backgroundColor: item.color,
    height: isViewMode ? "438px" : "auto",
    border: isViewMode ? "none" : "1px solid #D9D9D9",
    boxShadow: isViewMode
      ? "2px 2px 3px 0px #00000040"
      : "1px 1px 3px 0px #00000040",
  };

  return (
    <div className={styles.Card} style={cardStyles}>
      <TaskHeader
        title={item.title}
        isFavorite={item.isFavorite}
        isViewMode={isViewMode}
        onFavorite={handleFavorite}
        onChangeTitle={(title) => setItem((prev) => ({ ...prev, title }))}
      />
      <TaskContent
        text={item.description}
        isViewMode={isViewMode}
        onChangeText={handleEditText}
      />
      {!isViewMode && (
        <button onClick={handleCreate} className={styles.createButton}>
          <IoCheckmark />
        </button>
      )}
      {isViewMode && (
        <TaskFooter
          onEdit={() => setItem((prev) => ({ ...prev, description: "" }))}
          onDelete={handleDelete}
          onOpenColorPicker={openModal}
        />
      )}
      <ColorPickerModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onChangeColor={handleChangeColor}
      />
    </div>
  );
};

export default Card;
