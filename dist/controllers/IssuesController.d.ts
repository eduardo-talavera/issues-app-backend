import type { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare class IssuesController {
    static createIssue: (req: AuthRequest, res: Response) => Promise<void>;
    static getIssueById: (req: Request, res: Response) => Promise<void>;
    static updateIssue: (req: Request, res: Response) => Promise<void>;
    static deleteIssue: (req: AuthRequest, res: Response) => Promise<void>;
    static updateState: (req: Request, res: Response) => Promise<void>;
}
