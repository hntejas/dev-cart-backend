const mongoose = require("mongoose");

const {Schema} = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  cart: {type: Schema.Types.ObjectId, ref: "Cart"},
  wishlist: {type: Schema.Types.ObjectId, ref: "Wishlist"}
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;