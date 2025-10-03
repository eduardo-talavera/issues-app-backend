import { Document, PopulatedDoc } from 'mongoose';
import { IIssue } from './Issue';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    assignedIssues: PopulatedDoc<IIssue & Document>[];
    refreshTokens: IRefreshToken[];
}
interface IRefreshToken {
    token: string;
    createdAt?: Date;
}
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
