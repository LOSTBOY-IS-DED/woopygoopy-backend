import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("server is listening");
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hii this side Sourav",
    success: true,
  });
});
