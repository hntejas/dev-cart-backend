const mongoose = require("mongoose");

const {Schema} = mongoose;

const AddressSchema = new Schema({
  uid: {type: Schema.Types.ObjectId, ref: "User"},
  addressLine1: {type:String, required: true},
  addressLine2: String,
  city: {type:String, required: true},
  state: {type:String, required: true},
  zip: {type:String, required: true},
  phone: {type: String, required: true}
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;