import { Gemini } from "./gemini";

export async function POST(req: Request) {
  let apiResponse: IApiResponse;
  const body = (await req.json()) as { text: string };

  try {
    if (body.text.length == 0) {
      throw new Error("O texto precisa ter pelo menos um caracter");
    }

    const prompt = `Cria um texto resumido sobre ${body.text}`;
    const apiKey = process.env.GOOGLE_GEMINI as string;

    const iaResponse = await Gemini({ apiKey, prompt });

    apiResponse = {
      isOk: true,
      message: "Requisição feita com sucesso",
      data: iaResponse,
    };
  } catch (error) {
    let message = "Erro ao fazer requisição na IA";
    if (error instanceof Error) {
      message = error.message as string;
    }
    apiResponse = {
      isOk: false,
      message: message,
      data: error,
    };
  }

  return Response.json(apiResponse);
}
