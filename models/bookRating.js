const mongoose = require('mongoose');
const bookStatus = require('./bookStatus');

const BookRatingSchema = new mongoose.Schema({
  bookId: { type: mongoose.SchemaTypes.ObjectId, ref: "Book", require: true },
  userId: { type: mongoose.SchemaTypes.ObjectId, ref: "User", require: true },
  status: { type: Number, enum: [1, 2, 3], require: true },
  rating: { type: Number, enum: [0, 0.5, 1, 1.5, 2.5, 3, 3.5, 4, 4.5, 5] },
  review: { type: String, maxLength: 500 },

}, {});
BookRatingSchema.index({ bookId: 1, userId: 1 }, { unique: true });


const BookRating = mongoose.model('BookRating', BookRatingSchema);
module.exports = BookRating;


// const BookStatus = {
//   WantToRead: 1,
//   CurrentlyReading: 2,
//   Read: 3
// };