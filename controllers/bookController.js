const Book = require("./../models/book");
const { CustomError, invalidDataError, notFoundError, internalServerError } = require('../models/customError');
const BookRating = require("../models/bookRating");
const mongoose = require("mongoose");


const getBooks = async (req, res, next) => {
  // console.log("getBooks" + req.body);
  // console.log(req.params);
  // res.send("getBooks")

  try {

    let books = await Book.find({}).catch((err) => { internalServerError.details("can't return any book internal error") });
    res.send(books);
  } catch (error) {
    next(error);
  }

};

// const getBook = async (req, res, next) => {
//   // console.log("getBook" + req.body);
//   // console.log(req.params);
//   // res.send("getBook");

//   try {

//     // let books = await Book.find({ _id: req.body.bookId });
//     let books = await Book.findOne({ _id: req.params.id });
//     res.send(books);
//   } catch (error) {
//     next(notFoundError.details("book" + _id + " not found"));
//   }
// };


const getBook = async (req, res, next) => {
  try {

    if (!req.body) throw invalidDataError.details("not valid request to get book");
    const { bookId } = req.body;
    if (!bookId) throw invalidDataError.details("not valid request to get book");

    // let books = await Book.find({ _id: req.body.bookId });
    let books = await Book.findOne({ _id: bookId })
      .catch((error) => { notFoundError.details("book" + _id + " not found"); });
    res.send(books);
  } catch (error) {
    next(error);
  }
};



const getBookFullDetails = async (req, res, next) => {
  try {
    if (!req.body) throw invalidDataError.details("not valid request to get reviews");
    const { bookId } = req.body;
    if (!bookId) throw invalidDataError.details("not valid request to get reviews");


    let mybook = await Book.findOne({ _id: bookId });

    let reviewsAndRatings = await BookRating.aggregate([
      { $match: { bookId: mongoose.Types.ObjectId(bookId) } },
      {
        $lookup:
        {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      { $project: { "user._id": 0, "user.password": 0, "user.createdAt": 0, "user.updatedAt": 0, "user.__v": 0, "__v": 0, "userId": 0, "bookId": 0 } }

    ]);

    console.log(reviewsAndRatings);

    // mybook.reviews = reviewsAndRatings;

    // console.log(bookId);

    // let books = await Book.aggregate([
    //   { $match: { _id: mongoose.Types.ObjectId(bookId) } },
    //   {
    //     $lookup:
    //     {
    //       from: "bookratings",
    //       localField: "_id",
    //       foreignField: "bookId",
    //       as: "details"
    //     }
    //   },
    //   {
    //     $lookup:
    //     {
    //       from: "user",
    //       localField: "details",
    //       foreignField: "bookId",
    //       as: "details"
    //     }
    //   }

    // ], (err) => { console.log("call back" + err); });


    console.log(mybook);
    res.send({ "Book": mybook, "ReviewsAndRatings": reviewsAndRatings });

  } catch (error) {
    next(error);
  }


};

module.exports = {
  getBook, getBooks, getBookFullDetails //, updateBook, addBook ,deleteBook 
}

