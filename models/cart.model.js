const mongoose = require("mongoose");

const {Schema} = mongoose;

const CartSchema = new Schema({
  uid: {type: Schema.Types.ObjectId, ref: "User"},
  cartLines: [
    {
      product: {type: Schema.Types.ObjectId, ref: "Product"},
      quantity: Number
    }
  ]
}, {timestamps: true});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;