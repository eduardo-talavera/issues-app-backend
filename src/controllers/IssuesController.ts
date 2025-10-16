import type { Request, Response } from 'express';
import { Issue } from '../models/Issue';
import { AuthRequest } from '../middleware/auth';
import { User } from '../models/User';

export class IssuesController {
  static createIssue = async (req: AuthRequest, res: Response) => {
    const { title, description, userAssigned, priority, state } = req.body;
    try {
      const issue = new Issue({
        title,
        description,
        author: req.user.id,
        userAssigned: userAssigned ?? null,
        priority,
        state
      });

      await issue.save();
      res.status(201).send('Ticket creado exitosamente');
    } catch (error) {
      res.status(500).send('Error al crear el ticket');
    }
  };

  static getIssues = async (req: Request, res: Response) => {
    try {
      const { state, priority, search, page = 1, limit = 10 } = req.query;

      const filters: any = {};

      if (state) filters.state = state;
      if (priority) filters.priority = priority;
      if (search) {
        filters.$or = [
          { title: { $regex: search as string, $options: 'i' } },
          { description: { $regex: search as string, $options: 'i' } },
        ];
      }

      const skip = (Number(page) - 1) * Number(limit);

      const [issues, total] = await Promise.all([
        Issue.find(filters)
          .populate('author', 'name email')
          .populate('userAssigned', 'name email')
          .sort({ createdAt: -1, _id: -1 })
          .skip(skip)
          .limit(Number(limit)),

        Issue.countDocuments(filters),
      ]);

      res.json({
        data: issues,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al obtener los issues' });
    }
  };

  static getIssueById = async (req: Request, res: Response) => {
    try {
      res.status(200).json(req.issue)
    } catch (error) {
      res.status(500).send('Error al obtener el ticket');
    }
  };

  static updateIssue = async (req: Request, res: Response) => {
    try {
      req.issue.title = req.body.title;
      req.issue.description = req.body.description;
      req.issue.state = req.body.state;
      req.issue.priority = req.body.priority;

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
