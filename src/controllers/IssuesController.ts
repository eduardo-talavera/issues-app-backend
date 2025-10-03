import type { Request, Response } from 'express';
import { Issue } from '../models/Issue';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';

export class IssuesController {
  static createIssue = async (req: AuthRequest, res: Response) => {
    const { title, description, userAssigned } = req.body;
    try {
      const issue = new Issue({
        title,
        description,
        author: req.user.id,
        userAssigned: userAssigned ?? null,
      });

      await issue.save();
      res.status(201).send('Ticket creado exitosamente');
    } catch (error) {
      console.error('error al crear ticket: ', error);
      res.status(500).send('Error al crear el ticket');
    }
  };

  static getIssues = async (req: Request, res: Response) => {
    try {
      const issues = await Issue.find().populate('author').populate('userAssigned');
      res.status(200).json(issues);
    } catch (error) {
      res.status(500).send('Error al obtener el ticket');
    }
  };

  static getIssueById = async (req: Request, res: Response) => {
    try {
      res.json(req.issue);
    } catch (error) {
      res.status(500).send('Error al obtener el ticket');
    }
  };

  static updateIssue = async (req: Request, res: Response) => {
    try {
      req.issue.title = req.body.title;
      req.issue.description = req.body.description;
      await req.issue.save();

      res.status(200).send('ticket actualizado exitosamente');
    } catch (error) {
      res.status(500).send('Error al actualizar el ticket');
    }
  };

  static deleteIssue = async (req: AuthRequest, res: Response) => {
    try {
      const assignedUser = req.issue.userAssigned?.toString();

      if (assignedUser) {
        const user = await User.findById(assignedUser);
        if (user) {
          user.assignedIssues = user.assignedIssues.filter(
            (issueId) => issueId.toString() !== req.issue._id.toString()
          );
          await user.save();
        }
      }

      await req.issue.deleteOne();

      res.send('Ticket eliminado exitosamente');
    } catch (error) {
      res.status(500).send('Error al actualizar la tarea');
    }
  };

  static updateState = async (req: Request, res: Response) => {
    try {
      const { state } = req.body;
      req.issue.state = state;
      await req.issue.save();

      res.status(200).send('Estado del ticket actualizado exitosamente');
    } catch (error) {
      res.status(500).send('Error al actualizar el estado del ticket');
    }
  };
}
