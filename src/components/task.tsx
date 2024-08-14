"use client";

import { Check, PaintBucket, Pencil, Target, X } from "lucide-react";
import { StarFavorite } from "./star-favorite";
import { useState } from "react";
import { PaleteColorCollection } from "./palete-color-collections";
import { handleDeleteTaskUseCase } from "@/use-cases/delete-task";
import { useColorStore, useTasksStore } from "@/libs/zustend";
import { handleUpdateDataStateUseCase } from "@/use-cases/update-task";
import { contentIsAllowed } from "./post-tak-area";

interface ITaskProps {
  task: Required<ITask>;
}
export function Task({ task }: ITaskProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [isFavorite, setIsFavorite] = useState(task.isFavorite);
  const [showPaleteCollection, setShowPaleteCollection] = useState(false);
  const [taskContent, setTaskContent] = useState({
    title: task.title,
    content: task.content,
  });
  const { removeTask, updateTask } = useTasksStore();
  const { colors } = useColorStore();
  const findedBgColor = colors.find((color) => color.id == task.colorId);
  const bgColor = findedBgColor ? findedBgColor.value : "#ffffff";

  function handleDeleteTask() {
    const yesDelete = confirm("Deseja realmente eliminar esta 'Task'");
    if (yesDelete) {
      removeTask(task.id);
      handleDeleteTaskUseCase(task.id).then((res) => {
        alert(res.message);
      });
    }
  }

  function setDefaultTaskContent() {
    setTaskContent({ title: task.title, content: task.content });
  }
  function handleUpdateTaskContent() {
    if (isEditable) {
      const confirmIfWantToUpdateTaskContent = confirm("Deseja salvar as alterações?");
      if (confirmIfWantToUpdateTaskContent) {
        const taskTitleIsAllowed = contentIsAllowed({ value: taskContent.title, valueName: "titulo" });
        const taskContentIsAllowed = contentIsAllowed({ value: taskContent.content, valueName: "content" });

        if (!taskTitleIsAllowed || !taskContentIsAllowed) {
          return;
        }

        updateTask(task.id, { title: taskContent.title, content: taskContent.content });
        handleUpdateDataStateUseCase(task.id, { title: taskContent.title, content: taskContent.content }).then((res) => {
          if (!res.isOk) alert(res.message);
        });
      } else {
        setDefaultTaskContent();
      }
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
  }

  function handleUpdateFavoriteState(newState: boolean) {
    setIsFavorite(newState);
    updateTask(task.id, { isFavorite: newState });
    handleUpdateDataStateUseCase(task.id, { isFavorite: newState }).then((res) => {
      if (!res.isOk) alert(res.message);
    });
  }

  return (
    <div
      className="w-[390px] h-[437px] shadow-lg rounded-3xl flex flex-col *:p-4  "
      style={{
        backgroundColor: bgColor,
        color: bgColor == "#ffffff" ? "#51646e" : "#fdfdfd",
      }}
    >
      <div className="flex justify-between items-center gap-x-1 border-b-2 border-b-gray-300 text-wrap ">
        <input
          disabled={!isEditable}
          className="font-bold flex-1 bg-transparent outline-none"
          value={taskContent.title}
          onChange={({ target }) => setTaskContent((prev) => ({ ...prev, title: target.value }))}
        />
        <StarFavorite favoriteState={isFavorite} onClick={(newFavoriteState) => handleUpdateFavoriteState(newFavoriteState)} />
      </div>
      <textarea
        className="flex-1 bg-transparent outline-none "
        disabled={!isEditable}
        value={taskContent.content}
        onChange={({ target }) => setTaskContent((prev) => ({ ...prev, content: target.value }))}
      ></textarea>
      <div className="flex justify-between *:cursor-pointer relative">
        <div className="flex gap-x-2">
          <PaleteColorCollection taskId={task.id} paleteCollectionState={showPaleteCollection} changePaleteCollectionFn={setShowPaleteCollection} />

          <div onClick={handleUpdateTaskContent}>{isEditable ? <Check /> : <Pencil />}</div>
          <PaintBucket onClick={() => setShowPaleteCollection((prev) => !prev)} />
        </div>
        <X onClick={handleDeleteTask} />
      </div>
    </div>
  );
}
