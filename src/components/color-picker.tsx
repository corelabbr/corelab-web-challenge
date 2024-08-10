"use client";
import React from "react";

import { useTaskStore, ITask } from "../store/taskStore";
import { toast } from "react-toastify";

interface colorPickerProps {
  taskId: string;
  taskColor: string;
  setTaskColor: (value: string) => void;
  closeColorPicker: (value: boolean) => void;
}

const colors = [
  "#FFFFFF",
  "#BAE2FF",
  "#B9FFDD",
  "#FFE8AC",
  "#FFCAB9",
  "#F99494",
  "#9DD5FF",
  "#ECA1FF",
  "#DAFF8B",
  "#FFA285",
  "#CDCDCD",
  "#979797",
  "#A99A7C",
];

export function ColorPicker({
  taskId,
  taskColor,
  closeColorPicker,
  setTaskColor,
}: colorPickerProps) {
  const taskStore = useTaskStore((store) => store);
  const currentTask = taskStore.tasks.filter((task) => task.id === taskId)[0];

  const changeTaskColor = async (task: ITask, newColor: string) => {
    const { id, title, content, isFavorite } = task;
    await taskStore.updateTask(id as string, {
      id,
      title,
      content,
      color: newColor,
      isFavorite,
    });
    closeColorPicker(true);
    toast.success("Cor atualizada!");
  };
  return (
    <div className="absolute bg-white p-2 rounded-md border border-zinc-200 shadow-md z-10 top-2 left-0 md:left-[-4rem] mt-8 grid lg:grid-cols-12 grid-cols-6 gap-2 min-w-max ">
      {colors
        .filter((color) => color !== taskColor)
        .map((color, index) => (
          <div
            key={index}
            className="w-10 h-10 rounded-full cursor-pointer border border-zinc-400"
            style={{ backgroundColor: color }}
            onClick={() => {
              changeTaskColor(currentTask, color);
              setTaskColor(color);
              closeColorPicker(true);
            }}
          />
        ))}
    </div>
  );
}
