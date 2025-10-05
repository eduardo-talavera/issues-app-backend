import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { corsOptions } from './config/cors';
import { connectDB } from './config/db';

import seedRoutes from './routes/sedRoutes';
import issuesRoutes from './routes/IssuesRoutes';
import authRoutes from './routes/authRoutes';
import { CORS_STRATEGY } from './utils/constants';

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsOptions[CORS_STRATEGY]));

// Leer datos de formulario
app.use(express.json());

// Leer cookies
app.use(cookieParser())

// Loggin
app.use(morgan('dev'));

// Routes
app.use('/seed', seedRoutes);
app.use('/auth', authRoutes);
app.use('/issues', issuesRoutes);


export default app