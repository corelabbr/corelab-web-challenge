"use client";
import React, { useEffect } from "react";
import Card from "@/components/Card";
import { useTodos } from "@/context/TodosContext";
import { CustomColorKey } from "@/utils/customColors";

const CardList: React.FC = () => {
  const {
    todos,
    editingIndex,
    openColorPickerIndex,
    handleColorPickerToggle,
    handleEditToggle,
    handleTitleChange,
    handleDescriptionChange,
    handleFavoriteToggle,
    handleColorSelect,
    fetchTodos,
    handleDeleteTodo
  } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, []);

  const favoriteTodos = todos.filter((todo) => todo.favorite);
  const nonFavoriteTodos = todos.filter((todo) => !todo.favorite);

  return (
    <div className="bg-background h-full w-full pt-6 px-24 sm:px-28 flex flex-col items-center">
      {favoriteTodos.length > 0 && (
        <h2 className="text-xl font-bold mb-4">Favoritos</h2>
      )}
      {favoriteTodos.map((todo) => {
        const todoIndex = todos.findIndex((t) => t.id === todo.id);
        return (
          <Card
            key={todo.id}
            index={todoIndex}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            color={todo.color}
            favorite={todo.favorite}
            isEditing={editingIndex === todoIndex}
            isColorPickerOpen={openColorPickerIndex === todoIndex}
            onColorPickerToggle={() => handleColorPickerToggle(todoIndex)}
            onCloseColorPicker={() => handleColorPickerToggle(null)}
            onEditToggle={() => handleEditToggle(todoIndex)}
            onTitleChange={(newTitle: string) =>
              handleTitleChange(todoIndex, newTitle)
            }
            onDescriptionChange={(newDescription: string) =>
              handleDescriptionChange(todoIndex, newDescription)
            }
            onFavoriteToggle={() => handleFavoriteToggle(todoIndex)}
            onColorSelect={(color: CustomColorKey) =>
              handleColorSelect(todoIndex, color)
            }
            onDeleteTodo={() => handleDeleteTodo(todo.id!)}
          />
        );
      })}
      {favoriteTodos.length > 0 && (
        <h2 className="text-xl font-bold mt-8 mb-4">Outros</h2>
      )}
      {nonFavoriteTodos.map((todo) => {
        const todoIndex = todos.findIndex((t) => t.id === todo.id);
        return (
          <Card
            key={todo.id}
            index={todoIndex}
            id={todo.id}
            title={todo.title}
            description={todo.description}
            color={todo.color}
            favorite={todo.favorite}
            isEditing={editingIndex === todoIndex}
            isColorPickerOpen={openColorPickerIndex === todoIndex}
            onColorPickerToggle={() => handleColorPickerToggle(todoIndex)}
            onCloseColorPicker={() => handleColorPickerToggle(null)}
            onEditToggle={() => handleEditToggle(todoIndex)}
            onTitleChange={(newTitle: string) =>
              handleTitleChange(todoIndex, newTitle)
            }
            onDescriptionChange={(newDescription: string) =>
              handleDescriptionChange(todoIndex, newDescription)
            }
            onFavoriteToggle={() => handleFavoriteToggle(todoIndex)}
            onColorSelect={(color: CustomColorKey) =>
              handleColorSelect(todoIndex, color)
            }
            onDeleteTodo={() => handleDeleteTodo(todo.id!)}
          />
        );
      })}
    </div>
  );
};

export default CardList;
