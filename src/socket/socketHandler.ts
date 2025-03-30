import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const socketHandler = (io: Server, prisma: PrismaClient) => {
  const users: Record<string, { latitude: number; longitude: number }> = {};

  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('update_location', ({ userEmail, latitude, longitude }) => {
      if (!userEmail) return;
      users[userEmail] = { latitude, longitude };

      io.emit('location_update', users);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

export default socketHandler;
