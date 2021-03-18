const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  ISBN: { type: String, require: true, minLength: 10, maxLength: 20, index: true, unique: true },
  title: { type: String, require: true, minLength: 3, maxLength: 200, index: true, unique: true },
  description: { type: String, require: false, maxLength: 500, trim: true }
}, {});