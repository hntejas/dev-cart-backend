const express = require("express");
const router = express.Router();

const Order = require("../models/order.model");
const Cart = require("../models/cart.model");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ uid: req.uid }).populate({
      path: 'products.product'
    });
    res.json({
      success: true,
      orders: orders
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  }
});

router.post("/", async (req, res) => {
  try {
    const cart = await Cart.findOne({ uid: req.uid });
    const populatedCart = await cart.populate({
      path: 'cartLines.product'
    }).execPopulate();
    const totalPrice = getTotalPrice(populatedCart);
    await Order.create({ uid: req.uid, products: cart.cartLines, totalPrice: totalPrice });
    cart.cartLines = [];
    await cart.save();

    res.json({
      success: true
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  }
});

function getTotalPrice(populatedCart) {
  let totalPrice = 0;
  populatedCart.cartLines.forEach(cartLine => {
    totalPrice += cartLine.product.price;
  })
  return totalPrice;
}

module.exports = router;