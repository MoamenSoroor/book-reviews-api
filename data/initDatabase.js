// mongoose connection
const mongoose = require('mongoose');
const config = require('./../config.json');


module.exports = () => {
  mongoose.connect(config.dbSettings.url, { useNewUrlParser: true, useUnifiedTopology: true })
};

const db = mongoose.connection;

db.on("open", () => {
  console.log("database connected successfully.");
});


db.on("error", (error) => {
  console.log("database connected successfully.");
  console.log("=".repeat(40));
  console.log(error);
});


