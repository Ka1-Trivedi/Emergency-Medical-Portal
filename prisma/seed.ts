import { PrismaClient } from "@prisma/client"
import argon2 from "argon2"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await argon2.hash("Kavan#17122005")

  await prisma.user.upsert({
    where: { username: "Ka1_Trivedi" },
    update: {},
    create: {
      username: "Ka1_Trivedi",
      password: hashedPassword,
      isAdmin: true,
    },
  })

  console.log("Admin user created or updated")
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())

