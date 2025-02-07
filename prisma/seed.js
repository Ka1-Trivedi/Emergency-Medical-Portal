import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // Seed Users
    for (let i = 1; i <= 100; i++) {
        await prisma.user.create({
            data: {
                id: i.toString(),
                username: `user${i}`,
                password: await bcrypt.hash('password123', 10), // Hash passwords
                isAdmin: i % 10 === 0 // Every 10th user is an admin
            }
        });
    }

    // Seed Medical Records
    for (let i = 1; i <= 100; i++) {
        await prisma.medicalRecord.create({
            data: {
                id: i.toString(),
                aadharNumber: faker.string.numeric(12),
                name: faker.person.fullName(),
                age: faker.number.int({ min: 18, max: 80 }),
                bloodType: faker.helpers.arrayElement(['O+', 'A-', 'B+', 'AB-', 'O-', 'A+', 'B-', 'AB+']),
                medicalInfo: faker.lorem.sentence(),
            }
        });
    }
}

main()
  .catch((e) => {
      console.error(e);
      process.exit(1);
  })
  .finally(async () => {
      await prisma.$disconnect();
  });
