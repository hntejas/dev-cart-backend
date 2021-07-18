const express = require("express");
const { transformCart } = require('../utils/transformer');
const router = express.Router();

const Cart = require("../models/cart.model");
const CartItem = require("../models/cart-item.model")

router.get("/", async (req, res) => {    
  const cart = await CartItem.find({uid: req.uid}).populate('product');

  res.json({
    success: true,
    cartLines: transformCart(cart)
  });
});

router.post("/", async (req, res) => {
  try{
    const {itemId} = req.body;
    const existingCartItem = await getCartAndProduct(req.uid, itemId);
    
    if(!existingCartItem){
      const cartItem = await addItem(req.uid, itemId);
      res.json({
        success: true,
        cartId: cartItem._id
      })
    }else{
      res.status(409).json({
        success: false,
        error: {
          message: "Item already in cart"
        }
      })
    } 
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});

router.put("/", async (req, res) => {
  try{
    const {cartId, quantity} = req.body;

    if(!cartId || !quantity || quantity < 1){
      throw "Cart ID not found"
    }
    
    const updatedCart = await updateItemQuantity(cartId, quantity);
    res.json({
      success: true
    });
   
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});

router.delete("/:cartId", async (req, res) => {
  try{
    const {cartId} = req.params;
    
    const success = await removeItem(cartId);
    if(success){
      res.json({
        success: true
      })
    }else{
      res.status(500).json({
        success: false,
        error: {
          message: e.message
        }
      })
    }   
  }catch(e){
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});

async function getCartAndProduct(uid, itemId){
  const cartItem = await CartItem.findOne({uid: uid, product: itemId});
  return cartItem;
}

async function addItem(uid, itemId){
  const cartItem = await CartItem.create({uid: uid, product: itemId, quantity: 1});
  return cartItem;
}

async function updateItemQuantity(cartId, quantity){
  const cart = await CartItem.findByIdAndUpdate(cartId, {quantity})
  return cart;
}

async function removeItem(cartId){
  await CartItem.deleteOne({ _id: cartId });
  return true;
}

module.exports = router;