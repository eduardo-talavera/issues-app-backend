import type { NextFunction, Request, Response } from 'express';
import { IIssue } from '../models/Issue';
declare global {
    namespace Express {
        interface Request {
            issue: IIssue;
        }
    }
}
export declare function IssueExists(req: Request, res: Response, next: NextFunction): Promise<void>;
