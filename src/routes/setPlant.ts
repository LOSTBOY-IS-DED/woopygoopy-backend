import { Router, Request, Response } from "express";
import prisma from "../config/prisma";

const setPlantRouter = Router(); // ✅ Renamed to match the import

setPlantRouter.post(
  "/setPlant",
  async (req: Request, res: Response): Promise<any> => {
    const { emailId, latitude, longitude } = req.body; // ✅ Fixed variable names

    try {
      console.log("user");
      const userExists = await prisma.user.findUnique({
        where: { email: emailId },
      });

      if (!userExists) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const response = await prisma.plantedTrees.create({
        data: {
          emailId,
          longitude,
          latitude,
        },
      });

      console.log("Response:", response);

      res.status(200).json({
        message: "Tree planted successfully",
        data: response,
      });
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

export default setPlantRouter; // ✅ Correctly exported
