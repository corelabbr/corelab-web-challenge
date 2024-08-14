import prisma from "@/../prisma/prismaConnect";

interface Params {
  params: { id: string };
}

export async function DELETE(req: Request, { params }: Params) {
  let apiResponse: IApiResponse;
  // const body = (await req.json()) as { content: string };

  try {
   
    await prisma.task.delete({
      where: { id: +params.id },
    });

    apiResponse = {
      isOk: true,
      message: "Task eliminada com sucesso",
      data: params.id,
    };
  } catch (error) {
    apiResponse = {
      isOk: false,
      message: "Ocorreu um erro ao eliminar a task",
      data: error,
    };
  }

  return Response.json(apiResponse);
}
