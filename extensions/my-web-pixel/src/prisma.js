import prisma from "../../../app/db.server.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { eventName } = req.body;
      const createdEvent = await prisma.event.create({
        data: { eventName },
      });
      res.status(200).json(createdEvent);
    } catch (error) {
      console.error("Error storing event:", error.message);
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
