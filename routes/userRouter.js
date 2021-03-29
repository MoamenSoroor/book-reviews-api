const express = require('express');
const {
  register,
  login,
  logout,
  getCurrentUser,
  getFavBooks,
  getPostedBooks,
  postBook,
  putBook,
  deleteBook,
  putBookRating,
  putBookFavorite,
  putBookReview } = require('../controllers/userController');
const checkAuthentication = require('../middleware/checkAuthentication');
const userBookRouter = require('./userBookRouter');

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.post('/logout', checkAuthentication, logout);
userRouter.get('/', checkAuthentication, getCurrentUser);
userRouter.use("/books", checkAuthentication, userBookRouter);

module.exports = userRouter;