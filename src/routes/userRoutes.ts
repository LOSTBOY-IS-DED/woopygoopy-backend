import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();
const userRouter = Router();

userRouter.post('/register', async (req: any, res: any) => {
  try {
    const { name, house, password } = req.body;

    if (!name || !house || !password) {
      return res.status(400).json({ error: 'Name, house, and password are required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Find or create the house
    let houseRecord = await prisma.house.findUnique({ where: { name: house } });

    if (!houseRecord) {
      houseRecord = await prisma.house.create({ data: { name: house } });
    }

    // Create user
    const user = await prisma.user.create({
      data: { name, houseId: houseRecord.id, password: hashedPassword },
    });

    // Update house points by summing all user scores in the house
    const totalPoints = await prisma.user.aggregate({
      where: { houseId: houseRecord.id },
      _sum: { score: true },
    });

    await prisma.house.update({
      where: { id: houseRecord.id },
      data: { points: totalPoints._sum.score || 0 },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default userRouter;