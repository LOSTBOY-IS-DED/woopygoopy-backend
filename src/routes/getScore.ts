import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

const prisma = new PrismaClient();
const getScore = Router();

type Query = {
  emailId?: string;
}

getScore.get('/', async (req: Request<{} , {} , {} , Query>, res: Response) : Promise<void> => {
  const emailId = req.query.emailId as string;

  if (!emailId) {
    res.status(400).json({ error: "Email ID is required" });
  }

  try {
    // Count the number of trees planted by the user
    const plantedTreesCount = await prisma.plantedTrees.count({
      where: { emailId },
    });

    // Calculate the new score
    const newScore = plantedTreesCount * 5;

    // Update the user's score
    const user = await prisma.user.update({
      where: { email: emailId },
      data: { score: newScore },
      select: { score: true },
    });

      res.status(200).json({
      message: "Score updated successfully",
      score: user.score,
    });

  } catch (error) {
    console.error("Error:", error);
   res.status(500).json({ error: "Internal Server Error" });
  }
});

export default getScore;
