'use strict';

import express from 'express';
import routes from './routes';
import logger from 'morgan';
import { connect } from './database/connection';
import admin from 'firebase-admin';
import path from 'path';


admin.initializeApp({
    credential: admin.credential.cert(path.join(__dirname, '../credentials.json'))
});

const app = express();
app.use(express.json());
app.use(logger('dev'));

app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    
    if (authtoken && typeof authtoken === 'string') {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);    
        } catch (e) {
            res.sendStatus(400);
        }
    }
    next();
});

app.use(routes);

connect(() => {
    console.log("Successfully connected to database");
    app.listen(8000, () => console.log('Server is listening on port 8000'));
});