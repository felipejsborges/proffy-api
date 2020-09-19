import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import createConnection from '../typeorm';
import routes from './routes/';
import { tempFolder } from '../../config/upload';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(tempFolder));

app.use(routes);

export default app;
