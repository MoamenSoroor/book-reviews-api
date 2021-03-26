const express = require('express');
const { register, login, logout, getCurrentUser } = require('../controllers/userController');
const checkAuthentication = require('../middleware/checkAuthentication');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', checkAuthentication, logout);
userRouter.get('/', checkAuthentication, getCurrentUser);

module.exports = userRouter;