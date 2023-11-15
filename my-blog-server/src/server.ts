'use strict';
import express from 'express';
import routes from './routes';
import { connect } from './database/connection';

const app = express();
app.use(express.json());
app.use(routes);

connect(() => {
    console.log("Successfully connected to database");
    app.listen(8000, () => console.log('Server is listening on port 8000'));
});