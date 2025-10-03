import type { NextFunction, Request, Response } from 'express';
import { IIssue, Issue } from '../models/Issue';

declare global {
  namespace Express {
    interface Request {
      issue: IIssue;
    }
  }
}

export async function IssueExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { issueId } = req.params;
    const issue = await Issue.findById(issueId);

    if (!issue) {
      const error = new Error('Ticket no encontrado');
      res.status(404).json({ error: error.message });
      return;
    }

    req.issue = issue;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error del servidor' });
  }
}
