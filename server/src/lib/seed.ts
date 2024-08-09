import { prisma } from "./prisma";

async function main() {
  await prisma.color.deleteMany();

  const colors = [
    { name: "Red", code: "#FF0000" },
    { name: "Green", code: "#00FF00" },
    { name: "Blue", code: "#0000FF" },
    { name: "Yellow", code: "#FFFF00" },
    { name: "Cyan", code: "#00FFFF" },
    { name: "Magenta", code: "#FF00FF" },
    { name: "White", code: "#FFFFFF" },
    { name: "Orange", code: "#FFA500" },
    { name: "Purple", code: "#800080" },
    { name: "Pink", code: "#FFC0CB" },
  ];

  await prisma.$transaction(
    colors.map((color) =>
      prisma.color.create({
        data: color,
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Erro ao inserir seed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
