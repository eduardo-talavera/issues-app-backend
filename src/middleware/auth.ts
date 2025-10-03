import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../utils/constants';
import { TokenPayload } from '../utils/tokens';

export interface AuthRequest extends Request {
  user?: { id: string; email: string; name: string };
}

export const authenticateAccessToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers['authorization'];
  if (!auth) {
    res
      .status(401)
      .json({ message: 'recurso no autorizado' });
    return;
  }

  const token = auth.split(' ')[1];
  if (!token) {
    res
      .status(401)
      .json({ message: 'token invalido recurso no autorizado' });
    return;
  }

  try {
    const { id, name, email } = jwt.verify(
      token,
      ACCESS_TOKEN_SECRET!
    ) as TokenPayload;
    req.user = { id, name, email };
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token Invalido o expirado' });
    return;
  }
};
