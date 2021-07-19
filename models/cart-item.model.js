const mongoose = require("mongoose");

const {Schema} = mongoose;

const CartItemSchema = new Schema({
  uid: {type: Schema.Types.ObjectId, ref: "User", required: true},
  product: {type: Schema.Types.ObjectId, ref: "Product"},
  quantity: Number
}, {timestamps: true});

const CartItem = mongoose.model('CartItem', CartItemSchema);

module.exports = CartItem;