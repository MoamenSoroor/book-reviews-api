const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const apiRouter = require('./routes/apiRouter');
const userRouter = require('./routers/userRouter');
const initMongoose = require('./initMongoose');
const config = require("./config.json");
//init database connection
initDatabase();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

app.use('/api', apiRouter);
app.use('/user', userRouter);

app.use((err, req, res, next) => {
  res.statusCode = err.statusCode;
  res.send(err);
});

app.listen(config.port, () => {
  console.log('listening on port:', port);
});





