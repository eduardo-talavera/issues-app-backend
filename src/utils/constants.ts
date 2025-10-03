import dotenv from 'dotenv';

dotenv.config();

export const {
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES = '15m',
  REFRESH_TOKEN_EXPIRES = '7d',
  MONGO_URI
} = process.env;

