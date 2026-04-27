// src/sockets/index.ts
import { Server } from 'socket.io';

export let io: Server;

export const initSockets = (server: any) => {
  io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (s) => {
    console.log('🟢 conectado');
    s.on('disconnect', () => console.log('🔴 desconectado'));
  });

  return io;
};