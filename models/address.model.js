const mongoose = require("mongoose");

const {Schema} = mongoose;

const AddressSchema = new Schema({
  uid: {type: Schema.Types.ObjectId, ref: "User"},
  addressLine1: String,
  addressLine2: String,
  city: String,
  state: String,
  zip: String,
  phone: String
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;