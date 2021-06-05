const mongoose = require("mongoose");

const {Schema} = mongoose;

const BrandSchema = new Schema({
  name: {type:String, required: true},
  imgUrl: {type:String, required: true}
}, {timestamps: true});

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;