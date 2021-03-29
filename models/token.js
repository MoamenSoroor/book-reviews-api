const mongoose = require('mongoose');
const ms = require('ms');

const TokenSchema = new mongoose.Schema({
  userId: { type: String },
  ip: { type: String },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: 600 },
    // i make it 10 minutes for testing purpose, in production we can set it with any valid period
    // note if you changed expires you need to drop index first to be able to change the expiartion of the field.
  }
}, { timestamps: true });

const Token = mongoose.model('Token', TokenSchema);
module.exports = Token;
