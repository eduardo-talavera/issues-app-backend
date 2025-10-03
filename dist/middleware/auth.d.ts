import { Request, Response, NextFunction } from 'express';
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        name: string;
    };
}
export declare const authenticateAccessToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
