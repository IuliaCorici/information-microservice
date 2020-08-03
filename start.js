const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const createError = require('http-errors');

require('dotenv').config();
require('express-async-errors');
require('log-timestamp');

const routes = require('./routes.js');

const app = express();

app.use(helmet());
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err);
    let status = 500;
    let message = 'Something Bad Happened';
    if (err.httpStatus) {
        status = err.httpStatus;
        message = err.message;
    } 
    return next(createError(status, message));
});

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`App is listening on ${port} and running on ${process.env.NODE_ENV} mode`);
});