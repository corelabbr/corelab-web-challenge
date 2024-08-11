"use client";

import { ComponentProps, Dispatch, SetStateAction } from "react";
import style from "./color-palette.style.module.scss";
import updateTodo from "@/app/services/update-todo";
import { toast } from "react-toastify";
import { useTodoStore } from "@/app/stores/todo-store";

type ColorPaletteProps = ComponentProps<"div"> & {
  todoId?: number;
  stateCallback?: Dispatch<SetStateAction<string>>;
};

export default function ColorPalett(props: ColorPaletteProps) {
  const filter = useTodoStore((state) => state.filter);

  const colors = [
    "#BAE2FF",
    "#B9FFDD",
    "#FFE8AC",
    "#FFCAB9",
    "#F99494",
    "#9DD6FF",
    "#ECA2FF",
    "#DAFF8B",
    "#FFA285",
    "#CDCDCD",
    "#979797",
    "#A99A7C",
  ];

  const handleUpdate = (color: string) => {
    if (props.todoId)
      updateTodo({
        id: props.todoId,
        color,
      })
        .then(() => {
          if (props.stateCallback) props.stateCallback(color);
          filter();
        })
        .catch(() => {
          toast.warning(
            "Algum erro ocorreu durante a atualização de cor do todo"
          );
        });
  };

  return (
    <div {...props} className={`${style.palette} ${props.className}`}>
      {colors.map((color) => (
        <div
          key={color}
          onClick={() => handleUpdate(color)}
          style={{ backgroundColor: color }}
        ></div>
      ))}
    </div>
  );
}
