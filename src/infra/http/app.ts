import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';

import createConnection from '../typeorm';
import routes from './routes/';
import uploadConfig from '../../shared/config/upload';
import handleErrors from './middlewares/handleErrors';

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.tempFolder));

app.use(routes);

app.use(handleErrors);

export default app;
