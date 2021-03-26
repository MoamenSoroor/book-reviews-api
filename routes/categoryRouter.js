const express = require('express');

const { deleteCategory, getCategory, getCategorys, updateCategory } = require("./../controllers/categoryController");




const categoryRouter = express.Router();

categoryRouter.get("/", getCategorys);
categoryRouter.get("/categorys", getCategorys);
categoryRouter.get("/:id", getCategory); //access id with req.params.id
categoryRouter.put("/:id", updateCategory);
categoryRouter.post("/", deleteCategory);


module.exports = categoryRouter;










