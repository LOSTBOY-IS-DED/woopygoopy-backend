import { Server, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const socketHandler = (io: Server, prisma: PrismaClient) => {
  const users: Record<string, { latitude: number; longitude: number }> = {};

  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);

    socket.on('update_location', ({ userId, latitude, longitude }) => {
      users[userId] = { latitude, longitude };

      io.emit('location_update', users);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      delete users[socket.id];
      io.emit('location_update', users);
    });
  });
};

export default socketHandler;
