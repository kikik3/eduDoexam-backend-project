const usersRouter = require('express').Router()

usersRouter.get('/profile', async (request, response) => {
    
    response.json({});
});

module.exports = usersRouter