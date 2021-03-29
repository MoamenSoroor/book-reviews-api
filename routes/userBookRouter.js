const express = require('express');
const {
  getFavBooks,
  getPostedBooks,
  postBook,
  putBook,
  deleteBook,
  putBookRating,
  putBookFavorite,
  putBookReview,
  getRatedBooks,
  getReviewedBooks } = require('../controllers/userController');
// const checkAuthentication = require('../middleware/checkAuthentication');

const userBookRouter = express.Router();
userBookRouter.get("/", getPostedBooks);
userBookRouter.post("/", postBook);
userBookRouter.put("/", putBook);
userBookRouter.delete("/", deleteBook);
userBookRouter.put("/rating", putBookRating);
userBookRouter.get("/rating", getRatedBooks);
userBookRouter.get("/fav", getFavBooks);
userBookRouter.put("/fav", putBookFavorite);
userBookRouter.put("/review", putBookReview);
userBookRouter.get("/review", getReviewedBooks);


module.exports = userBookRouter;