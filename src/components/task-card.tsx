"use client";
import React, { useState } from "react";
import { Check, PaintBucket, Pencil, Star, X } from "lucide-react";

import { ITask, useTaskStore } from "../store/taskStore";
import { ColorPicker } from "./color-picker";
import { toast } from "react-toastify";

interface taskCardProps {
  task: ITask;
}

export function TaskCard({ task }: taskCardProps) {
  const { id, title, content, color, isFavorite } = task;
  const [isFavorited, setFavorite] = useState(isFavorite);
  const [taskTitle, setTaskTitle] = useState(title);
  const [taskContent, setTaskContent] = useState(content);
  const [taskColor, setTaskColor] = useState(color);
  const [isEditing, setIsEditing] = useState(false);
  const [colorPickerHidden, setColorPickerHidden] = useState(true);
  const taskStore = useTaskStore((store) => store);

  const editTask = async (type: string) => {
    try {
      const editedTask = {
        id,
        title: taskTitle,
        content: taskContent,
        color: taskColor,
        isFavorite: type === "fav" ? !isFavorited : isFavorited,
      };

      await taskStore.updateTask(id as string, editedTask);
      setIsEditing(false);
      toast.success("Tarefa atualizada!");
    } catch (error: any) {
      toast.error(error.response.data.message as string);
    }
  };

  const deleteTask = async () => {
    await taskStore.deleteTask(id as string);
    toast.error("Tarefa removida.");
  };

  return (
    <div
      className={`flex flex-col relative rounded-3xl transition-all duration-500 ease-in-out shadow-2xl p-2 text-base min-w-80 md:w-[29rem] max-w-[85%] min-h-80 md:min-h-[30rem] sm:max-w-xl`}
      key={id}
      style={{ backgroundColor: taskColor }}
    >
      <div className="flex items-center py-5 px-4 justify-between border-b-2 border-b-gray-100 w-full">
        {isEditing ? (
          <input
            type="text"
            placeholder="Título"
            style={{ backgroundColor: taskColor }}
            className="outline-none"
            min={2}
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        ) : (
          <h1>{task.title}</h1>
        )}
        {isFavorited ? (
          <Star
            size={25}
            fill="#FFC222"
            className="cursor-pointer"
            onClick={() => {
              setFavorite(false);
              editTask("fav");
            }}
          />
        ) : (
          <Star
            size={25}
            className="cursor-pointer"
            onClick={() => {
              setFavorite(true);
              editTask("fav");
            }}
          />
        )}
      </div>

      <textarea
        value={taskContent}
        onChange={(e) => setTaskContent(e.target.value)}
        style={{ background: taskColor }}
        className="md:h-[30.5rem] h-80 w-full resize-none outline-none p-3 transition-colors duration-500 ease-in-out"
        placeholder="Descrição da tarefa..."
        minLength={2}
        disabled={!isEditing}
      />

      <div className="flex w-full justify-between items-center p-2">
        <div className="relative flex gap-3 px-3 py-3">
          <Pencil
            size={25}
            onClick={() => {
              if (!isEditing) {
                toast.warn("Editando tarefa...");
              } else {
                setFavorite(isFavorite);
                setTaskTitle(title);
                setTaskContent(content);
                setTaskColor(color);
                toast.error("Edição cancelada.");
              }
              setIsEditing(!isEditing);
            }}
            className="cursor-pointer"
          ></Pencil>
          <PaintBucket
            size={25}
            className="cursor-pointer"
            onClick={() => setColorPickerHidden(!colorPickerHidden)}
          />
          {!colorPickerHidden && (
            <ColorPicker
              taskId={id as string}
              taskColor={taskColor}
              setTaskColor={setTaskColor}
              closeColorPicker={setColorPickerHidden}
            />
          )}
        </div>
        <div className="relative flex gap-3 px-3 py-3">
          {isEditing && <Check onClick={() => editTask("normal")}></Check>}
          {isEditing ? (
            <X
              onClick={() => {
                setIsEditing(!isEditing);
                toast.error("Edição cancelada.");
                setFavorite(isFavorite);
                setTaskTitle(title);
                setTaskContent(content);
                setTaskColor(color);
              }}
            ></X>
          ) : (
            <X onClick={() => deleteTask()}></X>
          )}
        </div>
      </div>
    </div>
  );
}
