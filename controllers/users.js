const usersRouter = require('express').Router()
const middleware = require('../utils/middleware');

usersRouter.get('/profile', middleware.userExtractor, async (request, response) => {
    
    response.json(request.user);
});

module.exports = usersRouter