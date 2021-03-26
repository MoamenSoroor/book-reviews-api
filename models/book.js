const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  ISBN: { type: String, require: true, minLength: 3, maxLength: 50, index: true, unique: true },
  title: { type: String, require: true, minLength: 3, maxLength: 200, index: true, unique: true },
  description: { type: String, require: false, maxLength: 500, trim: true },
  publishDate: { type: String, require: false, maxLength: 500, trim: true },

  ratings: { type: Number, default: 0, index: true },
  avgRating: { type: Number, default: 0, index: true },

  authors: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
  ],
  categories: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  ],
}, {});


const Book = mongoose.model('Book', BookSchema);
module.exports = Book;