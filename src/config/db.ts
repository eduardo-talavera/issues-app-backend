import mongoose from 'mongoose';
import colors from 'colors';
import { exit } from 'node:process';
import { MONGO_URI } from '../utils/constants';

export const connectDB = async () => {
  try {
    const {
      connection: { host, port },
    } = await mongoose.connect(MONGO_URI!);
    const url = `${host}:${port}`;
    console.log(colors.yellow.bold(`MongoDB Conectado en ${url}`));
  } catch (error) {
    console.log(colors.red.bold(`Error al conectar a MongoDB, error: ${error}`));
    exit(1);
  }
};
