const config = require('./utils/config');
const express = require('express');
require('express-async-errors');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const loginRouter = require('./controllers/login');
const userRouter = require('./controllers/signUp');
const reviewsRouter = require('./controllers/reviews');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('Connected to MongoDB');
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB', error.message);
    });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
app.use('/reviews', reviewsRouter);
app.use('/login', loginRouter);
app.use('/signUp', userRouter);
if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing');
    app.use('/testing', testingRouter);
};
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;