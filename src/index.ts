import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "./socket/socketHandler";
import prisma from "./config/prisma";
import leaderboardRouter from "./routes/leaderboardRoutes";
import userRouter from "./routes/userRoutes";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/leaderboard', leaderboardRouter);

socketHandler(io, prisma);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));