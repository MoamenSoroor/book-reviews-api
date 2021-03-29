const Author = require('../models/author');
const { CustomError } = require('../models/customError');


const getAuthors = (req, res) => {
  // const authors = await Author.find({}).catch(err => new CustomError(404, "Error in requesting authors"));
  // res.send(authors);
  console.log("get authors", req.body);
  console.log(req.params);
};


const getAuthor = (req, res) => {

  // const { id } = re.body || {};
  // if (!req.body) return next(new CustomError(400, 'invalid registration data'))
  // const authors = await Author.find({ id }).catch(err => new CustomError(404, "Error in requesting authors"));
  // res.send(authors);

  console.log("get author", req.body);
  console.log(req.params);
};


const postAuthor = (req, res) => {
  // const author = new Author(req.body);
  // await user.save();


  console.log("post author", req.body);
  console.log(req.params);

}

const updateAuthor = (req, res) => {

  console.log("put author", req.body);
  console.log(req.params);

}


const deleteAuthor = (req, res) => {
  console.log("delete Author", req.body);
  console.log(req.params);

}


module.exports = {
  getAuthors, getAuthor, postAuthor, updateAuthor, deleteAuthor
}