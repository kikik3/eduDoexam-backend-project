const express = require('express');
const cors = require('cors');
const authRouters = require("./controllers/auth")
const usersRouters = require("./controllers/users")
const examsRouters = require("./controllers/exams")
const app = express();

const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouters);

app.use(middleware.tokenExtractor);

app.use('/api/users', usersRouters);
app.use('/api/exams', examsRouters);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;