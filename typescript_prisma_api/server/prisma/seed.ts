import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function run() {
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "Timothy Garcia",
    },
  });

  console.log({ user });
}

run()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
