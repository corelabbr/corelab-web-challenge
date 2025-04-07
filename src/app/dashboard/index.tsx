"use client";
import TodoInput from "@/components/TodoInput";
import SectionOther from "./_components/SectionOther";
import useTodoListStore from "@/features/store/todoListStore";
import getTodoLists from "@/service/routesAPI/todoList/all";
import { useEffect } from "react";
import SectionFavorite from "./_components/SectionFavorite";
import { useSearchParams } from "next/navigation";
import { ColorFilter } from "@/components/ColorFilter";

export default function Home() {
  const searchParams = useSearchParams();
  const { setTodoList, setLoading } = useTodoListStore();

  // obter valores da query string
  const searchTitle = searchParams.get("title") ?? "";
  const searchColor = searchParams.get("color") ?? "";

  console.log("searchColor", searchColor);

  useEffect(() => {
    setLoading(true);
    getTodoLists(searchTitle, searchColor)
      .then((response) => {
        //console.log("Listas de Tarefas:", response.data.lists);
        setTodoList(response.data.lists);
      })
      .catch((error) => {
        console.error("Erro ao buscar listas de tarefas:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTitle, searchColor]);

  return (
    <div className="min-h-screen pt-8 pb-20 space-y-8 font-[family-name:var(--font-geist-sans)] lg:px-20 px-8">
      <div className="flex justify-center">
        <TodoInput />
      </div>
      <div className="flex sm:justify-end justify-center max-w-screen-xl mx-auto">
        <ColorFilter />
      </div>
      <SectionFavorite />
      <SectionOther />
    </div>
  );
}
