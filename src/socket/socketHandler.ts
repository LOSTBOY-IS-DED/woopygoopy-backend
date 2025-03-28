import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const socketHandler = (io: Server, prisma: PrismaClient) => {
  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('task_completed', async ({ userId, points }: { userId: string; points: number }) => {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      console.log(user)
      if (!user) return;

      await prisma.user.update({
        where: { id: userId },
        data: { score: { increment: points } },
      });

      await prisma.house.update({
        where: { id: user.houseId },
        data: { points: { increment: points } },
      });

      const leaderboard = await prisma.house.findMany({
        select: { name: true, points: true },
        orderBy: { points: 'desc' },
      });

      io.emit('leaderboard_update', leaderboard);
    });

    socket.on('disconnect', () => console.log('User disconnected:', socket.id));
  });
};

export default socketHandler;