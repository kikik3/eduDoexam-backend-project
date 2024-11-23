const express = require('express');
const cors = require('cors');
const authRouters = require("./controllers/auth")
const app = express();

const middleware = require('./utils/middleware');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouters);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;