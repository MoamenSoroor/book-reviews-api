const Book = require("./../models/book");
const { CustomError } = require('../models/customError');


const getBooks = (req, res) => {
  console.log("getBooks" + req.body);
  console.log(req.params);
};

const getBook = (req, res) => {
  console.log("getBook" + req.body);
  console.log(req.params);
};


const addBook = (req, res) => {
  console.log("addBook" + req.body);
  console.log(req.params);
};



const updateBook = (req, res) => {
  console.log("updateBook" + req.body);
  console.log(req.params);
};



const deleteBook = (req, res) => {
  console.log("deleteBook" + req.body);
  console.log(req.params);
};



module.exports = {
  deleteBook, getBook, getBooks, updateBook, addBook
}

