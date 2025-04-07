"use client";
import { TodoCard } from "@/components/TodoCard";
import { TodoCardSkeleton } from "@/components/TodoCard/skeleton";
import useTodoListStore from "@/features/store/todoListStore";

function SectionFavorite() {
  const { loading, todoList } = useTodoListStore();

  // Filtrar a lista de tarefas para mostrar apenas as favoritas
  const filteredTodoList = todoList.filter((list) => list.favorited);


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
            <h2>Favoritas</h2>
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
                    className="shadow-sm"
                  />
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <p>Nenhuma tarefa favorita!</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SectionFavorite;
