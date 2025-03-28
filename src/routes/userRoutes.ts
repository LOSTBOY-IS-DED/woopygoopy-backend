import express, { Router } from 'express';
import prisma from '../config/prisma.js';

const userRouter = Router();

userRouter.post('/register', async (req, res) => {
  const { name, house } = req.body;

  let houseRecord = await prisma.house.findUnique({ where: { name: house } });

  if (!houseRecord) {
    houseRecord = await prisma.house.create({ data: { name: house } });
  }

  const user = await prisma.user.create({
    data: { name, houseId: houseRecord.id },
  });

  res.json(user);
});

export default userRouter;