const initDatabase = require("./data/initDatabase.js");
const Book = require("./models/book.js");
const Author = require("./models/author");
const User = require("./models/user.js");
const Catergory = require('./models/category');
const BookRating = require('./models/bookRating');
const BookStatus = require("./models/bookStatus.js");
const Token = require("./models/token");
const Category = require("./models/category");
const mongoose = require("mongoose");

//init database connection
initDatabase();


async function test() {


  // const author = new Author({ name: "Author1", description: "the best author ever in 2020" });
  // author.save();
  // const author2 = new Author({ name: "Author2", description: "the best author ever in 2020" });
  // author2.save();

  // const cat1 = new Catergory({ title: "Nice Cat1", description: "this is the best cat1 forever." });
  // const cat2 = new Catergory({ title: "Nice Cat2", description: "this is the best cat2 forever." });
  // cat1.save();
  // cat2.save();


  // const user1 = new User({
  //   email: "user1@gmail.com", password: "password1", userName: "user1 user1", birthDate: Date.now()
  // });
  // user1.save();

  // const user2 = new User({
  //   email: "user2@gmail.com", password: "password2", userName: "user2 user2", birthDate: Date.now()
  // });
  // user2.save();



  // const fauthor1 = await Author.findOne({ name: "Author1" });
  // const fauthor2 = await Author.findOne({ name: "Author2" });


  // const fcat1 = await Category.findOne({ title: "Nice Cat1" });
  // const fcat2 = await Category.findOne({ title: "Nice Cat2" });

  // console.log("get Categories and authors.");
  // console.log(fauthor1);
  // console.log(fauthor2);
  // console.log(fcat1);
  // console.log(fcat2);


  // await Book.remove({});

  // const book1 = new Book({
  //   ISBN: 100, title: "Mybook1", description: "this is a good book1",
  //   publishDate: Date.now(), authors: [fauthor1._id, fauthor2._id], categories: [fcat1._id]
  // });
  // const book2 = new Book({
  //   ISBN: 101, title: "Mybook2", description: "this is a good book2",
  //   publishDate: Date.now(), authors: [fauthor1._id, fauthor2._id], categories: [fcat2._id]
  // });


  // const book3 = new Book({
  //   ISBN: 102, title: "Mybook3", description: "this is a good book3 ",
  //   publishDate: Date.now(), authors: [fauthor1._id], categories: [fcat1._id, fcat2._id]
  // });
  // const book4 = new Book({
  //   ISBN: 103, title: "Mybook4", description: "this is a good book4",
  //   publishDate: Date.now(), authors: [fauthor2._id], categories: [fcat1._id, fcat2._id]
  // });


  // book1.save();
  // book2.save();
  // book3.save();
  // book4.save();


  const session = await mongoose.startSession();
  const getbook = await (await Book.findOne({ title: "Mybook4" })).session(session);
  const user1 = await User.findOne({ userName: "user1 user1" }).session(session);
  const rating = new BookRating({ userId: user1._id, bookId: getbook._id, status: BookStatus.CurrentlyReading, rating: 4.5, review: "very good book i loved it so much :)" });
  rating.save();


  session.endSession();


}


test();

