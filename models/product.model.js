const mongoose = require("mongoose");

const {Schema} = mongoose;

const ProductSchema = new Schema({
  imgUrl: String,
  title: String,
  brand: String,
  category: String,
  availability: {
    type: String,
    enumValues: ["IN_STOCK","OUT_OF_STOCK"]
  },
  price: { type: Number, min: 1 },
  basePrice: { type: Number, min: 1},
  rating: { type: Number, min: 1, max: 5 },
}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;