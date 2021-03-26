const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  userId: { type: String },
  createdAt: { type: Date },
  device: { type: String }
});

const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;
