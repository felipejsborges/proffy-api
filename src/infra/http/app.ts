import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import createConnection from '../typeorm';
import routes from './routes/';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

export default app;
