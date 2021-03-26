const Category = require("./../models/category");
const { CustomError } = require('../models/customError');


const getCategorys = (req, res) => {
  console.log("Category: ", req.body);
  console.log(req.params);
};

const getCategory = (req, res) => {
  console.log("Category: ", req.body);
  console.log(req.params);
};



const updateCategory = (req, res) => {
  console.log("Category: ", req.body);
  console.log(req.params);
};



const deleteCategory = (req, res) => {
  console.log("Category: ", req.body);
  console.log(req.params);
};



module.exports = {
  deleteCategory, getCategory, getCategorys, updateCategory
}