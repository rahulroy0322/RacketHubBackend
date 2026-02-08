import { Server, type Socket } from 'socket.io';
import ENV from './config/env.config';
import http from './http';
import { logger } from './logger/pino';

const io = new Server(http, {
  cors: {
    origin: ENV.FRONTEND_URLS,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  logger.debug(
    {
      id: socket.id,
    },
    'new connection'
  );

  socket.on('JOIN:ROOM', ({ matchId }: { matchId: string }) => {
    logger.debug(
      {
        id: socket.id,
        matchId,
      },
      'room join'
    );
    socket.join(matchId);
  });

  socket.on('MSG', (data: { matchId: string; type: string; data: unknown }) => {
    logger.debug(
      {
        id: socket.id,
        data,
      },
      'New Message'
    );
    socket.to(data.matchId).emit('MSG', data);
  });

  socket.once('disconnect', () => {
    logger.debug(
      {
        id: socket.id,
      },
      'disconnected'
    );
  });
});

export { io };
