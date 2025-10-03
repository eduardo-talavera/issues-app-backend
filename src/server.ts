import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { corsConfig } from './config/cors';
import { connectDB } from './config/db';

import issuesRoutes from './routes/IssuesRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

connectDB();

const app = express();
app.use(cors(corsConfig));

// Leer datos de formulario
app.use(express.json());

// Leer cookies
app.use(cookieParser())

// Loggin
app.use(morgan('dev'));

// Routes
app.use('/auth', authRoutes);
app.use('/issues', issuesRoutes)

export default app