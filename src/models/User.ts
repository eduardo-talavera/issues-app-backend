import { Schema, model, Document, PopulatedDoc } from 'mongoose';
import { IIssue } from './Issue';

export interface IUser extends Document {
  name: string
  email: string;
  password: string;
  assignedIssues: PopulatedDoc<IIssue & Document>[]
  refreshTokens: IRefreshToken[]; 
}

interface IRefreshToken {
  token: string;
  createdAt?: Date;
}

const userSchema = new Schema<IUser>({
  name: { 
    type: String,
    required: true
  },  
  email: { 
    type: String, 
    unique: true, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  assignedIssues: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Issue'
    }
  ],
  refreshTokens: [
    {
      token: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export const User = model<IUser>('User', userSchema);
