"use client";
import PencilIcon from "@/assets/icons/pencilIcon";
import StarIcon from "@/assets/icons/starIcon";
import XIcon from "@/assets/icons/xIcon";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import useTodoListStore from "@/features/store/todoListStore";
import deleteTodoList from "@/service/routesAPI/todoList/delete";
import editTodoList from "@/service/routesAPI/todoList/edit";
import { TodoListInterface } from "@/types/todo_list_type";
import { useState } from "react";
import { toast } from "sonner";
import PaletteColor from "../PaletteColor";
import { Textarea } from "../ui/textarea";
import { Toggle } from "../ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TodoCard({
  id,
  title,
  color,
  notes,
  favorited,
  className,
}: TodoListInterface) {
  const [isFavorite, setIsFavorite] = useState(favorited);
  const [colorCard, setColorCard] = useState(color);
  const [enableNoteEdit, setEnableNoteEdit] = useState(true);
  const [newNote, setNewNote] = useState(notes);
  const { deleteNote, todoList } = useTodoListStore();

  // Editar a cor da lista de tarefas
  const handleEditColorTodoList = async (color: string) => {
    setColorCard(color);
    await editTodoList(
      {
        color: color,
      },
      id
    )
      .then((res) => {
        console.log("Cor da lista de tarefas atualizada:", res.statusText);
        toast.success("Cor da task editada com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao atualizar a cor da lista de tarefas:", error);
        setColorCard("#FFFFFF");
      });
  };

  // Editar a nota
  const handleEditDescriptionText = async (note: string) => {
    await editTodoList(
      {
        notes: note,
      },
      id
    )
      .then((res) => {
        console.log("Nota da lista de tarefas atualizada:", res.statusText);
        toast.success("Nota editada com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao atualizar a nota da lista de tarefas:", error);
        toast.error("Não é possível editar a nota");
      });
  };

  // Deletar a tarefa
  const handleDeleteTask = async () => {
    await deleteTodoList(id)
      .then((response) => {
        console.log("Tarefa deletada:", response.statusText);
        toast.success("Tarefa deletada com sucesso!");
        deleteNote(id);
        //window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao deletar a tarefa:", error);
        toast.error("Erro ao deletar a tarefa");
      });
  };

  // Editar a tarefa como favorita
  const handleFavoritedTask = async (favoriteValue: boolean) => {
    await editTodoList(
      {
        favorited: favoriteValue,
      },
      id
    )
      .then((res) => {
        console.log("Lista de tarefas atualizada:", res.statusText);
        toast.success("Nota editada com sucesso!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao atualizar a lista de tarefas:", error);
        toast.error("Não foi possível editar a nota");
      });
  };

  // Alternar o estado de favorito
  const handleFavorite = () => {
    let favoriteValue = !isFavorite;
    setIsFavorite(favoriteValue);
    handleFavoritedTask(favoriteValue);
  };

  // Alternar o estado do Toggle e salvar a nota quando desmarcado
  const handleToggleEditNoteChange = () => {
    setEnableNoteEdit(!enableNoteEdit);
    // Quando o Toggle é desmarcado (de editável para não editável),
    // a nota é automaticamente salva.
    if (!enableNoteEdit && newNote !== notes) {
      handleEditDescriptionText(newNote); // Salvar a nota quando o Toggle é desmarcado
    }
  };

  return (
    <Card
      className={`w-full  rounded-[25px] py-4 shadow-none border-none ${className}`}
      style={{ backgroundColor: colorCard }}
    >
      <div className="flex items-center border-b-1 pb-4 px-4 justify-between">
        <CardTitle className="font-bold text-[14px] text-[#4F4F4D]">
          {title}
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <StarIcon
                className="w-4 h-4 cursor-pointer"
                onClick={handleFavorite}
                color={isFavorite ? "#FFA000" : "rgba(255, 255, 255, 0.0)"}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar aos favoritos</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <CardContent className="h-80 font-normal px-4 text-[13px]">
        <Textarea
          className="w-full h-full border-none px-4 text-[13px] focus-visible:border-none focus-visible:ring-[none] resize-none font-light shadow-none"
          defaultValue={notes}
          onChange={(e) => setNewNote(e.target.value)}
          disabled={enableNoteEdit}
        />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-3 items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Toggle
                  onClick={handleToggleEditNoteChange}
                  className={`cursor-pointer hover:bg-[#ffe3b388] rounded-full 
            ${
              enableNoteEdit ? "bg-transparent" : "data-[state=on]:bg-[#FFE3B3]"
            } 
            transition-colors duration-300 ease-in-out`}
                >
                  <PencilIcon className="w-4 h-4 cursor-pointer" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>
                <p>Editar a nota</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <PaletteColor onChangeColorCard={handleEditColorTodoList} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mudar a cor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <XIcon
                className="w-[13px] h-[13px] cursor-pointer"
                color="#9E9E9E"
                onClick={() => handleDeleteTask()}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Deletar nota</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
}
