const mongoose = require('mongoose');

const User = new mongoose.Schema({
  firstName: { type: String, required: true, max: 100 },
  lastName: { type: String, required: true, max: 100 },
  username: { type: String, required: true, min: 3, max: 20 },
  password: { type: String, required: true, min: 8, max: 15 },
  age: { type: Number }
});



const UserModel = mongoose.model('User', User);
module.exports = UserModel;

// test static and instance methods
UserModel.MyStaticMethod();

const user = UserModel();
user.doSomething();
