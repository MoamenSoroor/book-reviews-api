const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  ISBN: { type: String, require: true, minLength: 3, maxLength: 50, index: true, unique: true },
  title: { type: String, require: true, minLength: 3, maxLength: 200, index: true, unique: true },
  description: { type: String, require: false, maxLength: 500, trim: true },
  //publishDate: { type: Date, require: false, default: Date.now },

  ratings: { type: Number, default: 0, index: true },
  avgRating: { type: Number, default: 0, index: true },
  postedBy: { type: mongoose.SchemaTypes.ObjectId, index: true }

  // authors: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
  // ],
  // categories: [
  //   { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  // ],
}, {});


BookSchema.statics.isValidBook = function (book) {

}


const Book = mongoose.model('Book', BookSchema);
module.exports = Book;