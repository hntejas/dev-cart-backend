const express = require("express");
const router = express.Router();

const Category = require("../models/category.model")

router.get("/", async (req, res) => {
  const categories = await Category.find();
  res.json({
    success: true,
    categories: categories
  })
});

router.post("/", async (req, res) => {
  let categories = [];
  categories = await Category.insertMany(req.body.categories);
  res.json({
    success: true,
    data: {
      message: "Categories created",
      categories: categories,
      count: categories && categories.length
    }
  });
});

module.exports = router;