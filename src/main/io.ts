// import { type WebSocket, WebSocketServer } from 'ws';

// import {
//   type EventType,
//   eventSchema,
//   roomJoinSchema,
// } from '../schemas/io.schema';
import { Server, type Socket } from 'socket.io';
import ENV from '../config/env.config';
import { logger } from '../logger/pino';
import http from './http';

// // ? TODO convert to socket.io
// const io = new WebSocketServer({ server: http });

// const rooms: Record<string, Set<WebSocket>> = {};

// type Socket = WebSocket & {
//   roomId?: string;
// };

// const brodCustToRoom = (roomId: string, data: unknown) => {
//   if (rooms[roomId]) {
//     rooms[roomId].forEach((s) => {
//       s.send(JSON.stringify(data));
//     });
//   }
// };

// const handleMessage = (
//   event: EventType,
//   socket: Socket & {
//     roomId: string;
//   }
// ) => {
//   const { type, data } = event;

//   switch (type) {
//     case 'p:fair':
//     case 'p:out':
//     case 'ir:net':
//     case 'ir:touch':
//     case 'ir:double':
//     case 'ir:over-net':
//     case 'ir:under-net':
//     case 's:hight':
//     case 's:foot-line':
//     case 's:foot-ground':
//     case 's:contact':
//     case 's:court':
//     case 's:flick':
//     case 'compleate':
//       return brodCustToRoom(socket.roomId, event);
//     default:
//       logger.error(
//         {
//           type,
//           data,
//         },
//         `"${type satisfies never}" not implimented yet!` as string
//       );
//   }
// };

// io.on('connection', (socket: Socket) => {
//   logger.debug({
//     socket
//   }, 'new connection')
//   socket.on('message', (_data: string) => {
//     try {
//       if (typeof _data !== 'string') {
//         // biome-ignore lint/suspicious/noExplicitAny: nooohhhhhh
//         _data = (_data as any).toString();
//       }

//       const parsed = JSON.parse(_data);

//       const data = eventSchema.safeParse(parsed);

//       if (!data.success) {
//         const roomData = roomJoinSchema.safeParse(parsed);
//         if (roomData.success) {
//           const { data: id } = roomData.data;
//           if (!rooms[id]) {
//             rooms[id] = new Set();
//           }

//           rooms[id].add(socket);
//           socket.roomId = id;
//           return;
//         }

//         throw data.error;
//       }

//       if (socket.roomId) {
//         handleMessage(
//           data.data,
//           socket as Socket & {
//             roomId: string;
//           }
//         );
//       }
//     } catch (e) {
//       logger.error(e, 'some event handled!');
//     }
//   });

//   socket.on('close', () => {
//     logger.info({ id: socket.roomId || '' }, 'disconnect');
//     if (socket.roomId) {
//       const room = rooms[socket.roomId];

//       room?.delete(socket);

//       if (!room?.size) {
//         delete rooms[socket.roomId];
//       }
//     }
//   });
// });

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
      'room join'
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
