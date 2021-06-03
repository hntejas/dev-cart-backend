const express = require("express");
const router = express.Router();

const Product = require("../models/product.model")

router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json({
    success: true,
    products: products
  })
});

router.post("/", async (req, res) => {
  let products = [];
  products = await Product.insertMany(req.body.products);
  res.json({
    success: true,
    data: {
      message: "Products created",
      products: products,
      count: products && products.length
    }
  });
});

module.exports = router;