import 'reflect-metadata';

import express from 'express';
import cors from 'cors';

import '../typeorm';

import routes from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

const port = 3333;
app.listen(port, () => console.log(`📡 Server listening on port ${port} 📡`));
