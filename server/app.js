'use strict';

import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import Logger from './utils/logger';
import indexRouter from './routes/index';

const app = express();
const logger = new Logger();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(compression());


process.on('SIGINT', () => {
	logger.log('stopping the server', 'info');
	process.exit();
});

app.use('/', indexRouter);
export default app;