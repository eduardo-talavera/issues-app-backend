import { Schema, Document, Types } from 'mongoose';
declare const issueStates: {
    readonly OPEN: "open";
    readonly IN_PROGRESS: "in_progress";
    readonly CLOSED: "closed";
};
declare const issuePriorities: {
    readonly LOW: "low";
    readonly MEDIUM: "medium";
    readonly HIGHT: "hight";
};
export type IssueState = (typeof issueStates)[keyof typeof issueStates];
export type IssuePriority = (typeof issuePriorities)[keyof typeof issuePriorities];
export interface IIssue extends Document {
    title: string;
    description: string;
    author: Types.ObjectId;
    userAssigned?: Types.ObjectId;
    state: IssueState;
    priority: IssuePriority;
}
export declare const IssueSchema: Schema;
export declare const Issue: import("mongoose").Model<IIssue, {}, {}, {}, Document<unknown, {}, IIssue> & IIssue & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
