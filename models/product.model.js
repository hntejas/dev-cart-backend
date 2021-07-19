const mongoose = require("mongoose");

const {Schema} = mongoose;

const ProductSchema = new Schema({
  imgUrl: {type:String, required: true},
  title: {type:String, required: true},
  brand: {type:String, required: true},
  category: {type:String, required: true},
  availability: {
    type: {type:String, required: true},
    enumValues: ["IN_STOCK","OUT_OF_STOCK"]
  },
  price: { type: Number, min: 1 },
  basePrice: { type: Number, min: 1},
  rating: { type: Number, min: 1, max: 5 },
}, {timestamps: true});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;