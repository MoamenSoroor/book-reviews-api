const express = require('express');
const bookRouter = require('./bookRouter');
const categoryRouter = require('./categoryRouter');
const authorRouter = require('./authorRouter');

const apiRouter = express.Router();


apiRouter.use("/categorys", categoryRouter);
apiRouter.use("/books", bookRouter);
apiRouter.use("/authors", authorRouter);


module.exports = apiRouter;