import { Rss, WandSparkles } from "lucide-react";
import { StarFavorite } from "./star-favorite";
import { getTextFromIa } from "@/use-cases/generate-text";
import { handleCreateTaskUseCase } from "@/use-cases/create-task";
import { usePostTask, useTasksStore } from "@/libs/zustend";
import { useState } from "react";

export function contentIsAllowed({ value, valueName }: { value: string; valueName: string }) {
  if (value.length == 0) {
    alert(`O campo '${valueName}', precisa ter pelo menos um caracter`);
    return false;
  }
  return true;
}

export function PostTask() {
  const { postTask, setPostTaskContent, setPostTaskIsFavorite, setPostTaskTitle, clearPostTask } = usePostTask();
  const { tasks, addTask, searchQuery } = useTasksStore();
  const [iaIsLoading, setIaIsLoading] = useState(false);

  function handleCreateTask() {
    const taskTitleIsAllowed = contentIsAllowed({ value: postTask.title, valueName: "titulo" });
    if (!taskTitleIsAllowed) return;

    const taskContentIsAllowed = contentIsAllowed({ value: postTask.content, valueName: "content" });
    if (!taskContentIsAllowed) return;

    try {
      addTask(postTask);
      handleCreateTaskUseCase(postTask).then((res) => {
        if (!res.isOk) {
          alert(res.message);
        }
      });
    } catch (error) {
      alert("Erro ao tentar Adicionar");
    }

    clearPostTask();
  }

  function handleGenerateText() {
    const text = prompt("Deseja gerar uma 'Nota' sobre o que?") as string;

    const cancelRequest = !text?.length;
    if (cancelRequest) return;

    const thereIsNothingAtTextToGenerate = text.length == 0;
    if (thereIsNothingAtTextToGenerate) {
      return alert("O texto precisa pelo menos ter um caracte");
    }

    setIaIsLoading(true);
    getTextFromIa({ text })
      .then((res) => {
        if (res.isOk) {
          setPostTaskContent(res.data);
        } else {
          alert(res.message);
        }
      })
      .finally(() => {
        setIaIsLoading(false);
      });
  }

  return (
    <div className="w-[530px]  shadow-lg rounded *:p-4 bg-white *:text-[#455a64] overflow-hidden relative" hidden={searchQuery ? true : false}>
      <div className="flex justify-between items-center gap-x-1 border-b-2 border-b-gray-300 text-wrap ">
        <input
          onChange={({ target }) => setPostTaskTitle(target.value)}
          value={postTask.title}
          type="text"
          placeholder="Título"
          className="w-full outline-none font-bold"
        />

        <StarFavorite favoriteState={postTask.isFavorite} onClick={(newState) => setPostTaskIsFavorite(newState)} />

        <WandSparkles className="bg-yellow-500/50 rounded absolute bottom-2 right-10 cursor-pointer" onClick={handleGenerateText} />
        <Rss className="absolute bg-yellow-300 rounded bottom-2 right-2 cursor-pointer" onClick={handleCreateTask} />
      </div>
      {iaIsLoading ? (
        <p>Aguarde enquanto a IA está gerando o texto...</p>
      ) : (
        <textarea
          onChange={({ target }) => setPostTaskContent(target.value)}
          value={postTask.content}
          rows={4}
          placeholder="Criar Nota..."
          className="w-full outline-none"
        ></textarea>
      )}
    </div>
  );
}
