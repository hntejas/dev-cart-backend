const mongoose = require("mongoose");

const {Schema} = mongoose;

const CartSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User"},
  cartLines: [
    {
      id: {type: Schema.Types.ObjectId, ref: "Product"},
      quantity: Number
    }
  ],
  quantity: {
    type: Number,
    default: 0
  },
  amount: {
    type: Number,
    default: 0
  },
  totalBaseAmount: {
    type: Number,
    default: 0
  },
}, {timestamps: true});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;