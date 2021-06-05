const mongoose = require("mongoose");

const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {type:String, required: true},
  email: {type:String, required: true},
  password: {type:String, required: true},
  cart: {type: Schema.Types.ObjectId, ref: "Cart"},
  wishlist: {type: Schema.Types.ObjectId, ref: "Wishlist"}
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;