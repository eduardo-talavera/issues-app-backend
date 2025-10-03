import type { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from '../utils/tokens';

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export class AuthController {
  static register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    try {
      const existing = await User.findOne({ email });
      if (existing) {
        res
          .status(409)
          .json({
            message: 'Ya existe un usuario asociado con estas credenciales',
          });
        return;
      }

      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashed, name });

      await user.save();
      res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      res.status(500).json({ message: 'Error al registrar usuario' });
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        res.status(400).json({ message: 'Credenciales invalidas' });
        return;
      }

      const payload = {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      };

      const accessToken = signAccessToken(payload);
      const refreshToken = signRefreshToken(payload);

      // Save refresh token in DB (simple approach)
      user.refreshTokens.push({ token: refreshToken });
      await user.save();

      res.cookie('refreshToken', refreshToken, cookieOptions);
      res.json({ accessToken });
    } catch (error) {
      res.status(500).json({ message: 'Error al iniciar sesión' });
    }
  };

  static refreshToken = async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;

    if (!token) {
      res.status(401).json({ message: 'No se encontro el refresh token' });
      return;
    }

    try {
      const payload = verifyRefreshToken(token);
      const user = await User.findById(payload.id);
      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
      }

      const found = user.refreshTokens.find((rt) => rt.token === token);
      if (!found) {
        res.status(403).json({ message: 'Refresh token invalido o expirado' });
        return;
      }

      const accessToken = signAccessToken({
        id: user._id.toString(),
        email: user.email,
        name: user.name,
      });

      res.json({ accessToken });
    } catch (err) {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  };

  static logout = async (req: Request, res: Response) => {
    const token = req.cookies?.refreshToken;
    if (token) {
      try {
        const payload = verifyRefreshToken(token);
        const user = await User.findById(payload.id);
        if (user) {
          user.refreshTokens = user.refreshTokens.filter(
            (rt) => rt.token !== token
          );
          await user.save();
        }
      } catch (e) {
        console.log(`Error al cerrar sesión: ${e}`);
      }
    }
    res.clearCookie('refreshToken', cookieOptions);
    res.json({ message: 'Se cerro la sesión exitosamente' });
  };
}
