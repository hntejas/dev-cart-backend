const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const { transformCart } = require('../utils/transformer');
const shortid = require("shortid");

const Order = require("../models/order.model");
const CartItem = require("../models/cart-item.model");

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

router.get("/paymentinit", async (req, res) => {
  try {
    const cart = await CartItem.find({ uid: req.uid }).populate('product');    
    const order = await createRazorpayOrder(cart);
   
    res.json({
      success: true,
      paymentOrder: {
        id: order.id,
        amount: order.amount,
        currency: order.currency
      }
    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  }
})

router.post("/", async (req, res) => {
  try {
    const cart = await CartItem.find({ uid: req.uid }).populate('product');
    const cartArray = transformCart(cart);
    const totalPrice = getTotalPrice(cartArray);
    await Order.create({uid: req.uid, products: cartArray, totalPrice});
    await CartItem.deleteMany({uid: req.uid});

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

function getTotalPrice(cartLines) {
  let totalPrice = 0;
  cartLines.forEach(cartLine => {
    totalPrice += cartLine.product.price;
  });
  return totalPrice;
}

async function createRazorpayOrder(cart){
  const cartArray = transformCart(cart);
  const totalPrice = getTotalPrice(cartArray);

  const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
  });

  const options = {
      amount: totalPrice * 100,
      currency: "INR",
      receipt: shortid.generate(),
      payment_capture: 1,
  };

  const order = await instance.orders.create(options);
  return order;
}

module.exports = router;