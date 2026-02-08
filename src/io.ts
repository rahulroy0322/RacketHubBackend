import { Server, type Socket } from 'socket.io';
import ENV from './config/env.config';
import http from './http';
import { logger } from './logger/pino';
import { PUB_KEY } from './subscribe/const';
import { pubMsg, type RedisCommentType, sub } from './subscribe/main';

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

    pubMsg(data as RedisCommentType);
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

sub.on('message', (channel, message) => {
  if (channel === PUB_KEY) {
    try {
      const data = JSON.parse(message) as {
        matchId: string;
        type: string;
        data: unknown;
      };

      if (data?.matchId) {
        io.to(data.matchId).emit('MSG', data);
      }
    } catch (e) {
      logger.error(e, 'ERROR: parsing msg in sub msg!');
    }
  }
});

sub.subscribe(PUB_KEY, (err, count) => {
  if (err) {
    logger.error(err, 'Error in sub');
    return;
  }
  logger.debug(
    `Subscribed to ${count} channel. Listening for updates on the ${PUB_KEY} channel.`
  );
});

export { io };
