import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();
const getPlantRouter = Router();

getPlantRouter.get('/', async (req: any, res: any) => {
  try {
    const emailId = req.query.emailId as string;

    if (!emailId) {
      return res.status(400).json({ error: "Email ID is required" });
    }

    const plants = await prisma.plantedTrees.findMany({
      where: { emailId },
    });

    return res.status(200).json(plants);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default getPlantRouter;