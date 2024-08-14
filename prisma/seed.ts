import prisma from "./prismaConnect";

async function seed() {
  const COLORS = [
    { id: 1, color: "White", value: "#ffffff" },
    { id: 2, color: "Sky Blue", value: "#bae2ff" },
    { id: 3, color: "Mint Green", value: "#b9ffdd" },
    { id: 4, color: "Pale Yellow", value: "#ffe8ac" },
    { id: 5, color: "Peach", value: "#ffcab9" },
    { id: 6, color: "Soft Red", value: "#f99494" },
    { id: 7, color: "Light Blue", value: "#9dd6ff" },
    { id: 8, color: "Lavender", value: "#eca1ff" },
    { id: 9, color: "Lime Green", value: "#daff8b" },
    { id: 10, color: "Coral", value: "#ffa285" },
    { id: 11, color: "Light Gray", value: "#cdcdcd" },
    { id: 12, color: "Gray", value: "#979797" },
    { id: 13, color: "Taupe", value: "#a99a7c" }
  ];

  await prisma.color.createMany({
    data: COLORS,
  });
}

seed().then(() => {
  console.log("db seeded!");
  prisma.$disconnect();
});


// npx prisma db seed