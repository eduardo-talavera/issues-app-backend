// src/services/notify.ts
import Notification from '../models/Notification';
import { io } from '../sockets/index'; 
export async function notify(message: string) {
  const notification = await Notification.create({ message });

  // broadcast
  io.emit('notification:new', notification);

  return notification;
}
