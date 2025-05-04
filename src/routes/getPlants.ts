import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

const prisma = new PrismaClient();
const getPlantRouter = Router();

// Type for query parameters
type Query = {
  emailId?: string;
};

getPlantRouter.get(
  '/',
  async (
    req: Request<{}, {}, {}, Query>,
    res: Response
  ): Promise<void> => {
    try {
      const { emailId } = req.query;

      if (!emailId) {
        res.status(400).json({ error: "Email ID is required" });
        return;
      }

      const plants = await prisma.plantedTrees.findMany({
        where: { emailId },
      });

      res.status(200).json(plants);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default getPlantRouter;
