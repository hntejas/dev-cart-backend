const express = require("express");
const { transformCart } = require('../transformer');
const router = express.Router();

const Cart = require("../models/cart.model");

router.get("/", async (req, res) => {    
  const cart = await Cart.findOne({uid: req.uid}).populate({
    path: 'cartLines.product'
  });
  res.json({
    success: true,
    cart: transformCart(cart)
  });
});

router.post("/", async (req, res) => {
  try{
    const {itemId} = req.body;
    const {cart, existingProduct} = await getCartAndProduct(req.uid, itemId);
    if(!existingProduct){
      const updatedCart = await addItem(cart, itemId);
      res.json({
        success: true,
        cart: transformCart(updatedCart)
      })
    }else{
      res.status(409).json({
        error: {
          message: "Item already in cart"
        }
      })
    } 
  }catch(e){
    res.status(500).json({
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});

router.put("/", async (req, res) => {
  try{
    console.log("start", Date.now());
    const {itemId, quantity} = req.body;
    const {cart, existingProduct} = await getCartAndProduct(req.uid, itemId);

    if(existingProduct){
      const updatedCart = await updateItemQuantity(cart, itemId, quantity);
      res.json({
        success: true,
        cart: transformCart(updatedCart)
      })
      console.log("end", Date.now());
    }else{
      res.status(404).json({
        error: {
          message: "Item not in cart"
        }
      })
    }
  }catch(e){
    res.status(500).json({
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});

router.delete("/:itemId", async (req, res) => {
  try{
    const {itemId} = req.params;
    const {cart, existingProduct} = await getCartAndProduct(req.uid, itemId);
    
    if(existingProduct){
      const updatedCart = await removeItem(cart, itemId);
      res.json({
        success: true,
        cart: transformCart(updatedCart)
      })
    }else{
      res.status(404).json({
        error: {
          message: "Item not in cart"
        }
      })
    }
  }catch(e){
    res.status(500).json({
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});

async function getCartAndProduct(uid, itemId){
  const cart = await Cart.findOne({uid: uid});
  const existingProduct = cart.cartLines.find(cartline => {
    return cartline.product.toString() === itemId
  });
  return {cart, existingProduct}
}

async function addItem(cart, itemId){
  cart.cartLines.push({
    product: itemId,
    quantity: 1
  })

  const savedCart = await cart.save();
  
  const populatedCart = await savedCart.populate({
    path: 'cartLines.product'
  }).execPopulate();

  return populatedCart;
}

async function updateItemQuantity(cart, itemId, quantity){
  cart.cartLines = cart.cartLines.map(cartLine => {
    if(cartLine.product._id.toString() === itemId){
      cartLine.quantity = quantity
    }
    return cartLine;
  });
  const savedCart = await cart.save();
  const populatedCart = await savedCart.populate({
    path: 'cartLines.product'
  }).execPopulate();

  return populatedCart;
}

async function removeItem(cart, itemId){
  cart.cartLines = cart.cartLines.filter(cartLine => {
    return cartLine.product.toString() !== itemId;
  });
  const savedCart = await cart.save();
  const populatedCart = await savedCart.populate({
    path: 'cartLines.product'
  }).execPopulate();

  return populatedCart;
}

module.exports = router;