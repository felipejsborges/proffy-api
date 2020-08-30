import express from 'express';
import cors from 'cors';

import routes from './api/routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

const port = 3333;
app.listen(port);
console.log(`Server listen on port ${port} 📡`);
