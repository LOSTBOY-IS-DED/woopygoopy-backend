import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

const prisma = new PrismaClient();
const userDetailsRouter = Router();

userDetailsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const emailId = req.query.emailId as string;

    const users = await prisma.user.findMany({
      where: {
        email: emailId,
      },
      include: {
        house: true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user details' });
    console.log(error);
  }
});

export default userDetailsRouter;
