const usersRouter = require('express').Router()

usersRouter.get('/create', async (request, response) => {
    
    response.json({});
});

module.exports = usersRouter