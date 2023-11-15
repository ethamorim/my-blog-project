'use strict';
import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);


app.listen(8000, () => console.log('Server is listening on port 8000'));