
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { CustomError, internalServerError, invalidData, notFoundError } = require('../models/customError');
const Token = require('../models/token');
const Book = require('../models/book');
const BookRating = require('../models/bookRating');
const mongoose = require('mongoose');

var ObjectID = require('mongodb').ObjectID;

const register = async (req, res, next) => {
  const registerData = req.body || {};
  if (!req.body) return next(new CustomError(400, 'invalid registration data'))
  const { email, password, userName } = registerData;
  const existentUser = await User.findOne({ email }).catch(err => { throw internalServerError });
  if (existentUser) return next(new CustomError(400, 'email already exists'));
  const user = new User({ email, userName });
  const salt = await bcrypt.genSalt(10).catch(err => { throw internalServerError });
  const hash = await bcrypt.hash(password, salt).catch(err => { throw internalServerError })
  user.password = hash;
  const savedUser = await user.save().catch(err => { throw internalServerError });
  if (!savedUser) throw internalServerError;

  const token = new Token({ userId: savedUser._id });
  const savedToken = await token.save().catch(err => { throw internalServerError; });

  res.cookie('session', savedToken._id);
  res.send(user.toJSON());
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (err || !user) return next(new CustomError(401, 'Unauthorized'));
    else {
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) return next(new CustomError(401, 'Unauthorized'));
      const token = new Token({ userId: user._id });
      token.save((err, doc) => {
        if (!err) {
          res.cookie('session', token._id);
          res.send(doc);
        }
      });
    }
  })
};

const logout = async (req, res, next) => {
  await Token.findOneAndRemove({ userId: req.cookies.session });
  res.clearCookie('session');
  res.send();
};

const getCurrentUser = (req, res, next) => {
  // res.render('userPage', { firstName: req.user.firstName })

  res.send({ _id: req.user._id, userName: req.user.userName, email: req.user.email });
};


const getFavBooks = async (req, res, next) => {
  // let books = await BookRating.find({ userId: req.user._id, status: { $exists: true } }).populate("books").exec();
  // res.send(books);

  let books = await BookRating.aggregate([
    { $match: { userId: req.user._id, status: { $exists: true } } },
    {
      $lookup:
      {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book"
      }
    }
  ]);

  res.send(books);


}


const getRatedBooks = async (req, res) => {
  let books = await BookRating.aggregate([
    { $match: { userId: req.user._id, rating: { $exists: true } } },
    {
      $lookup:
      {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book"
      }
    }
  ]);

  res.send(books);


}
const getReviewedBooks = async (req, res) => {
  let books = await BookRating.aggregate([
    { $match: { userId: req.user._id, review: { $exists: true } } },
    {
      $lookup:
      {
        from: "books",
        localField: "bookId",
        foreignField: "_id",
        as: "book"
      }
    }
  ]);

  res.send(books);


}





const getPostedBooks = async (req, res, next) => {
  let books = await Book.find({ postedBy: req.user._id });
  res.send(books);
}


const postBook = async (req, res, next) => {
  const { ISBN, title, description } = req.body;
  const book = new Book({ ISBN, title, description, postedBy: req.user._id });

  const savedBook = await book.save().catch(err => { throw internalServerError });
  if (!savedBook) throw internalServerError;
  res.send(savedBook);
}

const putBook = async (req, res, next) => {
  if (!req.body) return next(new CustomError(400, 'invalid book data data'));
  const { ISBN, title, description } = req.body;
  const doc = await Book.findOne({ _id: req.body.bookId, postedBy: req.user._id });
  if (doc == undefined || doc == null) return next(new CustomError(404, 'Not found book'));
  doc.ISBN = ISBN;
  doc.title = title;
  doc.description = description;

  await doc.save().catch(err => { throw internalServerError });
  res.send(doc);
}


const deleteBook = async (req, res, next) => {
  try {
    const doc = await Book.findOne({ _id: req.body.bookId, postedBy: req.user._id });
    if (doc == undefined || doc == null) throw internalServerError;
    await Book.deleteOne({ _id: doc._id });
    await BookRating.deleteMany({ bookId: doc._id });
    console.log("book deleted.");
    res.send("book deleted : " + doc._id);
  } catch (error) {
    res.status(500)
    res.send("internal server error");
  }

}


//{bookId:"212312", rating:3.5}
// const putBookRating = async (req, res, next) => {
//   if (!req.body)
//     next(new CustomError(400, 'invalid Rating data'));
//   let doc = await BookRating.findOne({ userId: req.user._id, bookId: req.body.bookId }).catch((err) => { throw internalServerError; });
//   if (!doc)
//     doc = new BookRating({ userId: req.user._id, bookId: req.body.bookId });

//   console.log(doc);

//   if ([0, 0.5, 1, 1.5, 2.5, 3, 3.5, 4, 4.5, 5].some(value => value == req.body.rating)) {
//     doc.rating = req.body.rating;
//     await doc.save().catch(err => { throw internalServerError });
//     let result = await BookRating.aggregate([
//       { $match: { bookId: doc.bookId } },
//       { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } }
//     ]).catch((err) => { throw internalServerError; });
//     console.log("avg and count ----------------------");
//     console.log(result);

//     try {
//       await Book.updateOne({ _id: doc.bookId }, { $set: { ratings: result.count, avgRating: result.avg } })

//       res.send(result);
//     } catch (error) {

//     }

//   }
//   else next(new CustomError(400, 'invalid Rating data ' + JSON.stringify(req.body)));
// }






//{bookId:"212312", status:1} //   WantToRead: 1, CurrentlyReading: 2, Read: 3
const putBookRating = async (req, res, next) => {
  if (!req.body) throw invalidData;
  if (!([0, 0.5, 1, 1.5, 2.5, 3, 3.5, 4, 4.5, 5].some(value => value == req.body.rating)))
    throw invalidData;
  try {

    let doc = await BookRating.findOne({ userId: req.user._id, bookId: req.body.bookId });
    if (!doc) {
      doc = new BookRating({ userId: req.user._id, bookId: req.body.bookId, rating: req.body.rating });
      await doc.save();
    }
    else
      await BookRating.updateOne({ _id: doc._id }, { $set: { rating: req.body.rating } });


    // doc.rating = req.body.rating
    let result = await BookRating.aggregate([
      { $match: { bookId: doc.bookId } },
      { $group: { _id: null, avg: { $avg: "$rating" }, count: { $sum: 1 } } }
    ]);
    console.log("avg and count ----------------------");
    console.log(result);

    console.log(doc);
    await Book.updateOne({ _id: doc.bookId }, { $set: { ratings: result[0].count, avgRating: result[0].avg } }).catch((err) => { throw internalServerError; });

    res.send(await Book.findOne({ _id: doc.bookId }).catch((err) => { throw internalServerError }));

  } catch (error) {
    console.log("internal server error");
    throw internalServerError;
  }


}


const putBookFavorite = async (req, res, next) => {
  if (!([1, 2, 3].some(value => value == req.body.status)))
    throw invalidData;

  let doc = await BookRating.findOne({ userId: req.user._id, bookId: req.body.bookId });

  if (doc == undefined || doc == null) {
    doc = new BookRating({ userId: req.user._id, bookId: req.body.bookId, rating: req.body.rating });
    let result = await doc.save().catch((err) => { throw internalServerError; });
    return res.send(result);
  }
  doc.status = req.body.status;
  await doc.save().catch(err => { throw internalServerError });
  res.send(doc);
}



//{bookId:ObjectId("212312"), review:"lablablaaaaa..."} 
const putBookReview = async (req, res, next) => {
  if (!req.body || !req.body.review) throw invalidData;

  let doc = await BookRating.findOne({ userId: req.user._id, bookId: req.body.bookId })
    .catch((err) => { throw notFoundError; });

  if (!doc) {
    doc = new BookRating({ userId: req.user._id, bookId: req.body.bookId });
    doc.review = req.body.review;
    let result = await doc.save().catch((err) => { throw invalidData; });
    res.send(result);
  }
  else {
    doc.review = req.body.review;
    await doc.save().catch(err => { throw internalServerError });
    res.send(doc);
  }




}




module.exports = {
  register,
  login,
  logout,
  getCurrentUser,
  getFavBooks,
  getRatedBooks,
  getReviewedBooks,
  getPostedBooks,
  postBook,
  putBook,
  deleteBook,
  putBookRating,
  putBookFavorite,
  putBookReview,
};