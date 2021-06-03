const express = require("express");
const router = express.Router();

const Brand = require("../models/brand.model")

router.get("/", async (req, res) => {
  const brands = await Brand.find();
  res.json({
    success: true,
    brands: brands
  })
});

router.post("/", async (req, res) => {
  let brands = [];
  brands = await Brand.insertMany(req.body.brands);
  res.json({
    success: true,
    data: {
      message: "Brands created",
      brands: brands,
      count: brands && brands.length
    }
  });
});

module.exports = router;