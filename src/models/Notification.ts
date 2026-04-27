
import { Schema, Document, Types, model } from 'mongoose';

export interface INotification extends Document {
  message: string;
  read: boolean;
  userId?: string;
}

const NotificationSchema: Schema = new Schema(
  {
    message: String,
    read: { type: Boolean, default: false },
    userId: Types.ObjectId,
  },
  { timestamps: true }
);

export default model<INotification>('Notification', NotificationSchema);