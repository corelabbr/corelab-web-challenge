import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Star } from "@phosphor-icons/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import paintIcon from "../assets/icons/paint.svg";
import { useTask } from "../hooks/useTask";
import { Popover } from "./Popover";

const createTaskFormSchema = z.object({
  title: z.string(),
  content: z.string(),
});

type CreateTaskFormSchema = z.infer<typeof createTaskFormSchema>;

export function CreateTaskForm() {
  const { colorsQuery } = useTask();
  const [colorCode, setColorCode] = useState("#ffffff");
  const [colorId, setColorId] = useState<number | undefined>();
  const [favorite, setFavorite] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateTaskFormSchema>({
    resolver: zodResolver(createTaskFormSchema),
  });

  const { createTask } = useTask();

  function handleSubmitCreateTask(data: CreateTaskFormSchema) {
    try {
      createTask({
        title: data.title,
        content: data.content,
        color_id: colorId,
        favorite,
      });
    } catch (error) {
      console.error(error);
    } finally {
      reset();
      setColorCode("#ffffff");
      setColorId(undefined);
      setFavorite(false);
    }
  }

  function changeColorTask(color_id: number, color_code: string) {
    setColorId(color_id);
    setColorCode(color_code);
  }

  return (
    <form
      onSubmit={handleSubmit(handleSubmitCreateTask)}
      style={{ backgroundColor: colorCode }}
      className="relative flex flex-col w-[520px] h-[280px] max-md:h-[420px] max-md:w-full rounded-lg bg-white shadow-lg border border-gray-300"
    >
      <Star
        className="absolute top-5 right-2"
        onClick={() => setFavorite(!favorite)}
        size={24}
        color={favorite ? "#ffff00" : "#121212"}
        weight={favorite ? "fill" : "regular"}
      />
      <input
        {...register("title")}
        type="text"
        placeholder="Título"
        className="p-4 pb-2 focus:outline-none border-b-[3px] bg-transparent border-b-gray-300 placeholder:text-black"
      />
      <textarea
        {...register("content")}
        className="flex-1 p-4 resize-none font-light focus:outline-none bg-transparent placeholder:text-black"
        placeholder="criar nota..."
      />

      <div className="flex items-center justify-between w-full px-4 py-3 gap-2">
        <Popover
          content={
            <div className="grid grid-cols-10 max-md:grid-cols-6 place-content-center gap-2">
              {colorsQuery.data?.map((item) => (
                <div
                  key={item.id}
                  onClick={() => changeColorTask(item.id, item.code)}
                  className="rounded-full h-8 w-8 border border-gray-400 cursor-pointer"
                  style={{ backgroundColor: item.code }}
                  aria-label={`selecionar cor ${item.code}`}
                />
              ))}
            </div>
          }
        >
          <img className="h-5 w-auto" src={paintIcon} alt="paint-icon" />
        </Popover>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center uppercase border-white border bg-green-500 hover:bg-green-700 rounded-md text-white transition-colors px-3 py-2"
        >
          <Plus size={20} weight="bold" color="#ffffff"/>
        </button>
      </div>
    </form>
  );
}
