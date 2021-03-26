const express = require('express');
const { getAuthors, getAuthor, postAuthor, updateAuthor, deleteAuthor }
  = require('../controllers/AuthorController');



const authorRouter = express.Router();

authorRouter.get("/", getAuthors);
authorRouter.get("/authors", getAuthors);
authorRouter.get("/:id", getAuthor); //access with req.params.id
authorRouter.put("/:id", updateAuthor);
authorRouter.post("/", deleteAuthor);


module.exports = authorRouter;