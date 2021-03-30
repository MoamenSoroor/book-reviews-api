
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { CustomError, internalServerError, invalidDataError, notFoundError, unauthorizedError } = require('../models/customError');
const Token = require('../models/token');
const Book = require('../models/book');
const BookRating = require('../models/bookRating');
const mongoose = require('mongoose');

const msg = "bad request error";

// var ObjectID = require('mongodb').ObjectID;

const register = async (req, res, next) => {
  try {
    const registerData = req.body || {};
    if (!req.body) return invalidDataError.details("req has no body error");
    const { email, password, userName } = registerData;
    const existentUser = await User.findOne({ email })
      .catch(err => { throw internalServerError.details("not valid email or user address"); });
    if (existentUser) throw invalidDataError.details("user is already registerd please login");
    const user = new User({ email, userName });
    const salt = await bcrypt.genSalt(10).catch(err => { throw internalServerError.details("not valid user or password"); });
    const hash = await bcrypt.hash(password, salt).catch(err => { throw internalServerError.details("not valid email or user address"); })
    user.password = hash;
    const savedUser = await user.save().catch(err => { throw internalServerError.details("not valid user or password"); });
    if (!savedUser) throw internalServerError;

    const token = new Token({ userId: savedUser._id, ip: req.clientIp });
    const savedToken = await token.save().catch(err => { throw internalServerError.details("not valid user or password"); });

    res.cookie('session', savedToken._id);
    res.send({ firstName: user.userName, email: user.email, tokenId: savedToken._id, ip: req.clientIp });
  } catch (error) {
    next(error);
  }

};

// const login = (req, res, next) => {
//   const { email, password } = req.body;
//   User.findOne({ email }, async (err, user) => {
//     if (err || !user) return next(new CustomError(401, 'Unauthorized'));
//     else {
//       const isCorrect = await bcrypt.compare(password, user.password);
//       if (!isCorrect) return next(new CustomError(401, 'Unauthorized'));
//       const token = new Token({ userId: user._id });
//       token.save((err, doc) => {
//         if (!err) {
//           res.cookie('session', token._id);
//           res.send(doc);
//         }
//       });
//     }
//   })
// };


const login = async (req, res, next) => {
  try {
    if (!req.body) throw invalidDataError.details("bad request in login");
    console.log('req');
    const { email, password } = req.body;
    if (!email || !password) throw invalidDataError.details("bad request in login email and pass");

    const user = await User.findOne({ email }).catch((err) => { console.log(err); throw unauthorizedError.details("bad request in login"); })
    if (!user) throw notFoundError;

    console.log('user found');
    const isCorrect = await bcrypt.compare(password, user.password).catch((err) => { console.log(err); throw unauthorizedError.details("bad request in login"); })
    if (!isCorrect) throw unauthorizedError;

    // console.log('password hashed');
    // const existsToken = await Token.findOne({ userId: user._id, ip: req.clientIp })
    //   .catch((err) => { console.log(err); throw internalServerError.details("bad request in login token is found."); });
    // console.log('not exists token11');
    // if (existsToken != undefined && existsToken != null) throw invalidDataError.details("bad request in login");
    // console.log('not exists token');

    await Token.findOneAndDelete({ userId: user._id, ip: req.clientIp })
      .catch((error) => { throw internalServerError.details("internal server error during remove token") });


    const token = new Token({ userId: user._id, ip: req.clientIp });
    token.save((err, doc) => {
      if (!err) {
        console.log('token saved');
        res.cookie('session', token._id);
        res.send(doc);
      }
    });
  } catch (error) {
    next(error);
  }

}





const logout = async (req, res, next) => {
  try {
    await Token.findOneAndRemove({ userId: req.cookies.session, ip: req.clientIp });
    res.clearCookie('session');
    res.send("session ended for : " + req.user);
  } catch (error) {
    next(error);
  }

};



const logoutAllDevices = async (req, res, next) => {
  try {
    //await Token.findOneAndRemove({ userId: req.cookies.session, ip: req.clientIp});
    await Token.deleteMany({ userId: req.cookies.session });
    res.clearCookie('session');
    res.send();
  } catch (error) {
    next(error);
  }

};


const getCurrentUser = (req, res, next) => {
  // res.render('userPage', { firstName: req.user.firstName })
  try {
    res.send({ _id: req.user._id, userName: req.user.userName, email: req.user.email });
  } catch (error) {
    next(error);
  }
};


const getFavBooks = async (req, res, next) => {
  // let books = await BookRating.find({ userId: req.user._id, status: { $exists: true } }).populate("books").exec();
  // res.send(books);
  try {
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
      },
      { $unwind: "$book" },
      { $project: { "status": 1, "book": 1 } }
    ]);

    res.send(books);
  } catch (error) {
    next(error);
  }



}


const getRatedBooks = async (req, res, next) => {
  try {
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
      },
      { $unwind: "$book" },
      { $project: { "rating": 1, "book": 1 } }
    ]);

    res.send(books);

  } catch (error) {
    next(error);
  }


}
const getReviewedBooks = async (req, res, next) => {
  try {
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
      },
      { $unwind: "$book" },
      { $project: { "review": 1, "book": 1 } }
    ]);

    res.send(books);
  } catch (error) {
    next(error);
  }



}


const getPostedBooks = async (req, res, next) => {
  try {
    let books = await Book.find({ postedBy: req.user._id })
      .catch((err) => { console.log(err); internalServerError.details("internal server error"); });
    res.send(books);
  } catch (error) {
    next(error);
  }

}


const postBook = async (req, res, next) => {

  try {
    const { ISBN, title, description, publishDate, authors, categories } = req.body;
    const book = new Book({ ISBN, title, description, publishDate, authors, categories, postedBy: req.user._id });

    const savedBook = await book.save()
      .catch(err => { console.log("invalid book data."); throw invalidDataError.details("internal server error in saving your book"); });
    if (!savedBook) throw internalServerError.details("internal server error in saving your book");
    res.send(savedBook);
  } catch (error) {
    next(error);
  }


}

const putBook = async (req, res, next) => {
  try {
    if (!req.body) throw invalidDataError.details("not valid data to update book");
    const { bookId, ISBN, title, description, publishDate, authors, categories } = req.body;
    if (!bookId || !ISBN || !title) throw invalidDataError.details("not valid data to update book");
    // const doc = await Book.findOne({ _id: req.body.bookId, postedBy: req.user._id });

    await Book.updateOne({ _id: bookId, postedBy: req.user._id },
      { $set: { ISBN, title, description, publishDate, authors, categories } })
      .catch((err) => {
        console.log("invalid put book " + err);
        throw invalidDataError.details("not valid data to update book");
      });

    const book = await Book.findOne({ _id: bookId }).catch((err) => {
      console.log("internal server error " + err);
      throw internalServerError.details("can't find book after update it's data");
    })
    res.send(book);
    // if (doc == undefined || doc == null) return next(new CustomError(404, 'Not found book'));
    // doc.ISBN = ISBN;
    // doc.title = title;
    // doc.description = description;
    // await doc.save().catch(err => { throw internalServerError });
    //res.send(doc);
  } catch (error) {
    next(error);
  }

}


const deleteBook = async (req, res, next) => {

  try {
    const doc = await Book.findOne({ _id: req.body.bookId, postedBy: req.user._id })
      .catch((err) => {
        console.log("book not found " + err);
        throw notFoundError.details("not found book to delete");
      });
    if (!doc) throw invalidDataError.details("not found book to delete");
    await Book.deleteOne({ _id: doc._id }).catch((err) => {
      console.log("book not found " + err);
      throw internalServerError.details("not found book to delete");
    });
    await BookRating.deleteMany({ bookId: doc._id })
      .catch((err) => {
        console.log("book not found " + err);
        throw internalServerError.details("not found book to delete");
      });
    console.log("book deleted.");
    res.send(doc);
  } catch (error) {
    next(error);
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

  try {

    if (!req.body) throw invalidDataError.details("bad request to put book rating ");
    if (!([0, 0.5, 1, 1.5, 2.5, 3, 3.5, 4, 4.5, 5].some(value => value == req.body.rating)))
      throw invalidDataError.details("bad request to put book rating ");
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

    res.send(await Book.findOne({ _id: doc.bookId })
      .catch((err) => {
        throw internalServerError.details("book not found after update it rating ");
      }));
  } catch (error) {
    next(error);
  }



}


const putBookFavorite = async (req, res, next) => {

  try {
    if (!([1, 2, 3].some(value => value == req.body.status)))
      throw invalidDataError.details("bad request to put book fav status ");

    let doc = await BookRating.findOne({ userId: req.user._id, bookId: req.body.bookId })
      .catch((err) => { throw notFoundError.details("bad request to put book fav status "); });

    if (!doc) {
      doc = new BookRating({ userId: req.user._id, bookId: req.body.bookId, status: req.body.status });
      let result = await doc.save()
        .catch((err) => { throw internalServerError.details("bad request to put book fav status "); });
      return res.send(result);
    }
    doc.status = req.body.status;
    await doc.save().catch(err => { throw internalServerError.details("bad request to put book fav status "); });
    res.send(doc);
  } catch (error) {
    next(error);
  }
}



//{bookId:ObjectId("212312"), review:"lablablaaaaa..."} 
const putBookReview = async (req, res, next) => {

  try {
    if (!req.body || !req.body.review) throw invalidDataError.details("bad request to put book review ");

    let doc = await BookRating.findOne({ userId: req.user._id, bookId: req.body.bookId })
      .catch((err) => { throw notFoundError.details("bad request to put book review "); });

    if (!doc) {
      doc = new BookRating({ userId: req.user._id, bookId: req.body.bookId });
      doc.review = req.body.review;
      let result = await doc.save().catch((err) => { throw invalidDataError.details("bad request to put book review "); });
      res.send(result);
    }
    else {
      doc.review = req.body.review;
      await doc.save().catch(err => { throw internalServerError.details("bad request to put book review "); });
      res.send(doc);
    }
  } catch (error) {
    next(error);
  }
}




module.exports = {
  register,
  login,
  logout,
  logoutAllDevices,
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