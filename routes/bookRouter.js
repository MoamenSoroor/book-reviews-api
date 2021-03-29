const express = require('express');
const { getBook, getBooks, getBookFullDetails } = require('../controllers/bookController');



const bookRouter = express.Router();

bookRouter.get("/", getBooks);
bookRouter.get("/allbooks", getBooks);
bookRouter.get("/book", getBook);
bookRouter.get("/details", getBookFullDetails);

// bookRouter.put("/:id", updateBook);
// bookRouter.post("/", addBook);
// bookRouter.delete("/", deleteBook);



module.exports = bookRouter;

