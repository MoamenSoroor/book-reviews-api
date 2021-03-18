const mongoose = require('mongoose');

const Token = new mongoose.Schema({
  userId: { type: String },
  createdAt: { type: Date },
  device: { type: String }
});

const TokenModel = mongoose.model('Token', Token);
module.exports = TokenModel;
