const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true, unique: true, maxLenght: 100 },
  description: { type: String, require: false, maxLength: 500, trim: true },
  books: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
  ]
});



const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;