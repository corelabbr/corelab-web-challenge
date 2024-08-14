import { APP_HOST } from "@/config/app";

export async function handleDeleteTaskUseCase(id: number) {
  console.log("delete ", id);

  const res = await fetch(`${APP_HOST}/api/task/${id}`, {
    method: "DELETE",
  });

  const data = (await res.json()) as IApiResponse;
    console.log(data.data);
  return data;

}
