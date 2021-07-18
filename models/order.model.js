const mongoose = require("mongoose");

const {Schema} = mongoose;

const OrderSchema = new Schema({
  uid: {type: Schema.Types.ObjectId, ref: "User", required: true},
  products: [
    {
      product: {},
      quantity: Number
    }
  ],
  totalPrice: Number
}, {timestamps: true});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;