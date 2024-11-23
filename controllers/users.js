const usersRouter = require('express').Router()
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");


usersRouter.get('/', async (request, response) => {
    
    response.json({});
});

module.exports = usersRouter