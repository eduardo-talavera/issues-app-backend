import { Schema, Document, Types, model } from 'mongoose';

const issueStates = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  CLOSED: 'closed',
} as const;

const issuePriorities = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGHT: 'hight',
} as const;

export type IssueState = (typeof issueStates)[keyof typeof issueStates];
export type IssuePriority =
  (typeof issuePriorities)[keyof typeof issuePriorities];

export interface IIssue extends Document {
  title: string;
  description: string;
  author: Types.ObjectId;
  userAssigned?: Types.ObjectId;
  state: IssueState;
  priority: IssuePriority;
}

export const IssueSchema: Schema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: 'User',
    },
    userAssigned: {
      type: Types.ObjectId,
      ref: 'User',
      default: null,
    },
    state: {
      type: String,
      enum: Object.values(issueStates),
      default: issueStates.OPEN,
    },
    priority: {
      type: String,
      enum: Object.values(issuePriorities),
      default: issuePriorities.LOW,
    },
  },
  { timestamps: true }
);

export const Issue = model<IIssue>('Issue', IssueSchema);
