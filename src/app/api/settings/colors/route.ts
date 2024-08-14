import prisma from "@/../prisma/prismaConnect";

export async function GET() {
  let apiResponse: IApiResponse;
  try {
    //TODO Request from PRISMA

    const colors = await prisma.color.findMany({
      where: {
        id: {
          not: 1,
        },
      },
      select: {
        id: true,
        color: true,
        value: true
      },
    });

    apiResponse = {
      isOk: true,
      message: "Cores obtidas com sucesso!",
      data: colors,
    };
  } catch (error) {
    apiResponse = {
      isOk: false,
      message: "Erro ao buscar as cores...",
      data: error,
    };
  }

  return Response.json(apiResponse);
}
