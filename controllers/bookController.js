const Book = require("./../models/book");
const { CustomError, invalidDataError, notFoundError, internalServerError } = require('../models/customError');
const BookRating = require("../models/bookRating");


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

    // let books = await BookRating.aggregate([
    //   { $match: { bookId: bookId } },
    //   {
    //     $lookup:
    //     {
    //       from: "books",
    //       localField: "bookId",
    //       foreignField: "_id",
    //       as: "book"
    //     }
    //   },
    //   { $unwind: "$book" }

    // ]);
    // res.send(books);

    let books = await Book.aggregate([
      { $match: { _id: bookId } },
      {
        $lookup:
        {
          from: BookRating.collection.name,
          localField: "_id",
          foreignField: "bookId",
          as: "details"
        }
      },

    ]);
    console.log(books);
    res.send(books);


  } catch (error) {
    next(error);
  }


};

// const addBook = (req, res) => {
//   console.log("addBook" + req.body);
//   console.log(req.params);
//   res.send("book added");
// };



// const updateBook = (req, res) => {
//   console.log("updateBook" + req.body);
//   console.log(req.params);
//   res.send("update book");
// };



// const deleteBook = (req, res) => {
//   console.log("deleteBook" + req.body);
//   console.log(req.params);
// };



module.exports = {
  getBook, getBooks, getBookFullDetails //, updateBook, addBook ,deleteBook 
}

