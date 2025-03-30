import { Router, Request, Response } from "express";
import prisma from "../config/prisma";

const setPlantRouter = Router();

setPlantRouter.post("/", async (req: Request, res: Response): Promise<any> => {
  const { emailId, latitude, longitude } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: emailId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const tree = await prisma.plantedTrees.create({
      data: {
        emailId,  
        latitude,
        longitude,
      },
    });

    return res.status(201).json({
      message: "Tree planted successfully",
      data: tree,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default setPlantRouter;