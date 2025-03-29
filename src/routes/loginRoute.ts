import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { Request, Response, Router } from 'express';

const prisma = new PrismaClient();
const loginRouter = Router();

loginRouter.post('/', async (req : any, res : any) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Respond with success
    res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default loginRouter;