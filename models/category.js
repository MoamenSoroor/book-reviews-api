const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  title: { type: String, require: true, minLength: 3, maxLength: 200, index: true, unique: true },
  description: { type: String, require: false, maxLength: 500, trim: true },
}, {});


const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;