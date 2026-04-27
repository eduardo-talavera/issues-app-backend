import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { corsConfig } from './config/cors';
import { connectDB } from './config/db';

import seedRoutes from './routes/sedRoutes';
import issuesRoutes from './routes/IssuesRoutes';
import authRoutes from './routes/authRoutes';
import { initSockets } from './sockets';

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
app.use('/seed', seedRoutes);
app.use('/auth', authRoutes);
app.use('/issues', issuesRoutes);

const server = http.createServer(app);
initSockets(server);

export default server;