const mongoose = require("mongoose");

const {Schema} = mongoose;

const BrandSchema = new Schema({
  name: String,
  imgUrl: String
}, {timestamps: true});

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;