import express, { Router } from 'express';
import prisma from '../config/prisma.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/get', async (req, res) => {
  const leaderboard = await prisma.house.findMany({
    select: { name: true, points: true },
    orderBy: { points: 'desc' },
  });

  res.json(leaderboard);
});

export default leaderboardRouter;
