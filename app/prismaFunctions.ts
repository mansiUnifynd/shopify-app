import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Upsert function to create or update the user
export const upsertUser = async (id: number | null, name: string) => {
  try {
    const user = await prisma.user.upsert({
      where: {
        id: id ?? 0,  // If id is provided, use it; else fallback to 0 for create.
      },
      update: {
        name, // Update name if the user exists.
      },
      create: {
        name, // Create new user if id doesn't exist.
      },
    });
    console.log('User upserted:', user);
  } catch (error) {
    console.error('Error upserting user:', error);
  }
};
