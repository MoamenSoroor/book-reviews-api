const express = require('express');
const { getBook, getBooks } = require('../controllers/bookController');



const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.get("/books", getBooks);
bookRouter.get("/:id", getBook); //access with req.params.id
// bookRouter.put("/:id", updateBook);
// bookRouter.post("/", addBook);
// bookRouter.delete("/", deleteBook);



module.exports = bookRouter;

