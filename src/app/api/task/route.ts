// import { API_Notes } from "@/libs/fake";
import prisma from "@/../prisma/prismaConnect";

interface Params {
  params: { id: string };
}

export async function GET() {
  let apiResponse: IApiResponse;
  try {
    const tasks = await prisma.task.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        isFavorite: true,
        colorId: true,
      },
    });
    apiResponse = {
      isOk: true,
      message: "Dados obtidos com sucesso",
      data: tasks,
    };
  } catch (error) {
    apiResponse = {
      isOk: false,
      message: "Erro ao buscar as 'task'",
      data: error,
    };
  }

  return Response.json(apiResponse);
}

export async function POST(req: Request) {
  let apiResponse: IApiResponse;
  const body = (await req.json()) as ITask;

  try {
    //TODO, precisa fazer validação, antes de adicionar

    await prisma.task.create({
      data: {
        title: body.title,
        content: body.content,
        isFavorite: body.isFavorite,
        colorId: 1,
      },
    });

    apiResponse = {
      isOk: true,
      message: "Adicionado com sucesso",
      data: body,
    };
  } catch (error) {
    apiResponse = {
      isOk: false,
      message: "Erro ao adicionar na DB",
      data: error,
    };
  }

  return Response.json(apiResponse);
}

export async function PATCH(req: Request) {
  let apiResponse: IApiResponse;
  const body = (await req.json()) as {
    id: string;
    data: ITask;
  };

  try {
    const res = await prisma.task.update({
      where: {
        id: Number(body.id),
      },
      data: body.data,
    });
    apiResponse = {
      isOk: true,
      message: "Dados actualizado com sucesso!",
      data: res,
    };
  } catch (error) {
    apiResponse = {
      isOk: false,
      message: "Erro ao atualizar a task",
      data: error,
    };
  }

  return Response.json(apiResponse);
}
