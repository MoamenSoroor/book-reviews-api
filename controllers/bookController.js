const Book = require("./../models/book");
const { CustomError } = require('../models/customError');


const getBooks = async (req, res) => {
  // console.log("getBooks" + req.body);
  // console.log(req.params);
  // res.send("getBooks")

  try {

    let books = await Book.find({});
    res.send(books);
  } catch (error) {
    res.status(404);
    res.send({ error: "Not found books or internal error." });
  }

};

const getBook = async (req, res) => {
  // console.log("getBook" + req.body);
  // console.log(req.params);
  // res.send("getBook");

  try {

    // let books = await Book.find({ _id: req.body.bookId });
    let books = await Book.findOne({ _id: req.params.id });
    res.send(books);
  } catch (error) {
    res.status(404);
    res.send({ error: "Not found books or internal error." });
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
  getBook, getBooks //, updateBook, addBook ,deleteBook 
}

