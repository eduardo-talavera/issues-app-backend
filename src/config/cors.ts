import { FRONTEND_URL } from '../utils/constants';
import { CorsOptions } from 'cors';


const whitelistConfig: CorsOptions = {
  origin: function (origin, callback) {
    const whiteList = [FRONTEND_URL, 'http://localhost:5173'];
    // (!origin) enabled only for test in postman
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

const allOriginsConfig = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

export const corsOptions = {
  all_origins: allOriginsConfig,
  whitelist: whitelistConfig
}
