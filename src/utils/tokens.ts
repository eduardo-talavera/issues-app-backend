import jwt from 'jsonwebtoken';

import {
  ACCESS_TOKEN_EXPIRES,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
} from './constants';

export interface TokenPayload {
  id: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

export const signAccessToken = (user: {
  id: string;
  email: string;
  name: string;
}) => {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES as jwt.SignOptions['expiresIn'],
  });
};

export const signRefreshToken = (user: { id: string; email: string }) => {
  return jwt.sign(user, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES as jwt.SignOptions['expiresIn'],
  });
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
};
