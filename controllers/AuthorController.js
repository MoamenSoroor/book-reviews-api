const Author = require('../models/author');
const { CustomError } = require('../models/customError');


const getAuthors = (req, res) => {
  const authors = await Author.find({}).catch(err => new CustomError(404, "Error in requesting authors"));
  res.send(authors);
};

const getAuthor = (req, res) => {

  const { id } = re.body || {};
  if (!req.body) return next(new CustomError(400, 'invalid registration data'))
  const authors = await Author.find({ id }).catch(err => new CustomError(404, "Error in requesting authors"));
  res.send(authors);
};

const PostAuthor = (req, res) => {
  const author = new Author(req.body);
  await user.save();

}