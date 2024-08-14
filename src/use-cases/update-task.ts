import { APP_HOST } from "@/config/app";

export async function handleUpdateDataStateUseCase(id: number, task: Partial<ITask>) {

  const res = await fetch(`${APP_HOST}/api/task`, {
    method: "PATCH",
    body: JSON.stringify({
      id: id,
      data: task,
    }),
  });

  const data = (await res.json()) as IApiResponse;
  // console.log(data);
  return data;
}
