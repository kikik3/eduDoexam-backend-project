const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {

  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: true,
      message: 'malformatted id'
    });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: true,
      message: error.message
    });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: true,
      message: 'token invalid'
    });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: true,
      message: 'token expired'
    })
  }

  next(error)
}


const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};


const userExtractor = async (request, response, next) => {
  const token = request.token;

  if (token) {

    try {

      const admin = require("firebase-admin");
      const decodedToken = await admin.auth().verifyIdToken(token);

      if (!decodedToken.uid) {
        return response.status(401).json({
          error: true,
          message: 'Token invalid'
        });
      }

      request.user = decodedToken; 
      next();

    } catch (error) {

      return response.status(401).json({
        error: true,
        message: `Token verification failed`
      });
    }

  } else {

    return response.status(401).json({
      error: true,
      error: 'Token missing'
    });
  }

  next();
};



module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  userExtractor,
  tokenExtractor
}