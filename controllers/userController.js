
const bcrypt = require('bcrypt');
const User = require("../models/user");
const { CustomError, internalServerError } = require('../models/customError');
const Token = require('../models/token');

const register = async (req, res, next) => {
  const registerData = req.body || {};
  if (!req.body) return next(new CustomError(400, 'invalid registration data'))
  // TODO: Validate incoming data before querying the DB.
  const { email, password, userName } = registerData;

  const existentUser = await User.findOne({ email }).catch(err => { throw internalServerError });
  if (existentUser) return next(new CustomError(400, 'email already exists'));
  const user = new User({ email, userName });
  const salt = await bcrypt.genSalt(10).catch(err => { throw internalServerError });
  const hash = await bcrypt.hash(password, salt).catch(err => { throw internalServerError })
  user.password = hash;
  const savedUser = await user.save().catch(err => { throw internalServerError });
  if (!savedUser) throw internalServerError;

  const token = new Token({ userId: savedUser._id });
  const savedToken = await token.save().catch(err => { throw internalServerError; });

  res.cookie('session', savedToken._id);
  res.send(user.toJSON());
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }, async (err, user) => {
    if (err || !user) return next(new CustomError(401, 'Unauthorized'));
    else {
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) return next(new CustomError(401, 'Unauthorized'));
      const token = new Token({ userId: user._id });
      token.save((err) => {
        if (!err) {
          res.cookie('session', token._id);
          res.send(user);
        }
      })
    }
  })
};

const logout = async (req, res, next) => {
  await Token.findOneAndRemove({ userId: req.cookies.session });
  res.clearCookie('session');
  res.send();
};

const getCurrentUser = (req, res, next) => {
  // res.render('userPage', { firstName: req.user.firstName })
  res.send(req.user);
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
};