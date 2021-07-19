const mongoose = require("mongoose");

const {Schema} = mongoose;

const WishlistSchema = new Schema({
  uid: {type: Schema.Types.ObjectId, ref: "User", required: true},
  products: [    
      {type: Schema.Types.ObjectId, ref: "Product"},     
  ]
}, {timestamps: true});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = Wishlist;