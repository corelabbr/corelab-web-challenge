import { APP_HOST } from "@/config/app";

interface IgetTextFromIa {
  text: string;
}

export async function getTextFromIa(text: IgetTextFromIa) {
  const res = await fetch(`${APP_HOST}/api/ia`, {
    method: "POST",
    body: JSON.stringify(text),
  });

  const data = await res.json() as IApiResponse;
//   console.log(data.data);
  return data;
}
