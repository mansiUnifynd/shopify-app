import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function upsertEvent(eventName) {
  try {
    const event = await prisma.event.upsert({
      where: { eventName }, // Now this works since eventName is unique
      update: {}, 
      create: { eventName },
    });
    console.log("Event Upserted:", event);
  } catch (error) {
    console.error("Error inserting event:", error);
  } finally {
    await prisma.$disconnect();
  }
}

export default upsertEvent;
