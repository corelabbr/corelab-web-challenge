"use client";
import { TodoCard } from "@/components/TodoCard";
import { TodoCardSkeleton } from "@/components/TodoCard/skeleton";
import useTodoListStore from "@/features/store/todoListStore";
import { useMemo } from "react";
function SectionOther() {
  const { loading, todoList } = useTodoListStore();
  
  // Filtrar a lista de tarefas para mostrar apenas as não favoritas
  const filteredTodoList = useMemo(() => {
    return todoList.filter((list) => !list.favorited);
  }, [todoList]);

  return (
    <div className="space-y-1.5">
      <div className="max-w-screen-xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6  justify-items-center-safe">
            <TodoCardSkeleton />
            <TodoCardSkeleton />
            <TodoCardSkeleton />
          </div>
        ) : (
          <>
            <h2>Outras</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-6  justify-items-center-safe">
              {filteredTodoList.length > 0 ? (
                filteredTodoList.map((list) => (
                  <TodoCard
                    key={list.id}
                    id={list.id}
                    title={list.title}
                    color={list.color}
                    notes={list.notes}
                    favorited={list.favorited}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <p>Nenhuma tarefa</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SectionOther;
