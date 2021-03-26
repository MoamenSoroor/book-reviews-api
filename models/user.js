const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, index: true, unique: true, minLength: 3, maxLenght: 100 },
  password: { type: String, required: true, index: true, minLength: 8, maxLenght: 15 },
  userName: { type: String, required: true, index: true, unique: true, maxLenght: 100 },
  birthDate: { type: Date }
});



const User = mongoose.model('User', UserSchema);
module.exports = User;
