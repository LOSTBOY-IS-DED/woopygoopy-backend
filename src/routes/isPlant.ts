import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";
import { parseGeminiResponse } from "../utils/parseGeminiResponse";

const getImageResponseRouter = express.Router();
const upload = multer({ dest: "uploads/" });
const media = path.resolve("uploads");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

getImageResponseRouter.post(
  "/",
  upload.single("image"),
  async (req: MulterRequest, res: Response): Promise<void> => {
    if (!req.file) {
      res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    const filePath = path.join(media, req.file.filename);
    const mimetype = req.file.mimetype;

    try {
      const imageBuffer = await fs.readFile(filePath);
      const base63Image = imageBuffer.toString("base64");

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const result = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: "Analyze the given image and determine if there is a plant visible in the image. Return a JSON response with the property 'isPlant', setting it to true if a plant is detected, otherwise false.",
              },
              { inlineData: { mimeType: mimetype, data: base63Image } },
            ],
          },
        ],
      });

      const geminiResponse = await result.response;
      const textResponse = geminiResponse.text();
      const out = parseGeminiResponse(textResponse);

      console.log(out);

      res.json({
        success: true,
        message: "File uploaded and processed successfully",
        filePath: `/uploads/${req.file.filename}`,
        geminiResponse: out,
      });
    } catch (error) {
      console.error("Error processing image:", error);
      res.status(500).json({
        success: false,
        message: "Failed to process image",
        error: (error as Error).message,
      });
    }
  }
);

export default getImageResponseRouter;
