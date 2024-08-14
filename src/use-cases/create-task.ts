import { APP_HOST } from "@/config/app";

// interface IhandleCreateTask {}

export async function handleCreateTaskUseCase(task: ITask) {
  const res = await fetch(`${APP_HOST}/api/task`, {
    method: "POST",
    body: JSON.stringify(task),
  });

  const data = (await res.json()) as IApiResponse;
    console.log(data.data);
  return data;
}
