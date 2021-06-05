const express = require("express");
const router = express.Router();
const { transformWishlist } = require("../utils/transformer")

const Wishlist = require("../models/wishlist.model");

router.get("/", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ uid: req.uid }).populate({
      path: 'products'
    });
    res.json({
      success: true,
      wishlist: transformWishlist(wishlist)
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
    const { itemId } = req.body;
    const { wishlist, existingProduct } = await getWishlistAndProduct(req.uid, itemId);

    if (!existingProduct) {
      const updatedWishlist = await addItem(wishlist, itemId);
      res.json({
        success: true,
        wishlist: transformWishlist(updatedWishlist)
      })
    } else {
      res.status(409).json({
        success: false,
        error: {
          message: "Item already in wishlist"
        }
      })
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  }
});

router.delete("/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    const { wishlist, existingProduct } = await getWishlistAndProduct(req.uid, itemId);

    if (existingProduct) {
      const updatedWishlist = await removeItem(wishlist, itemId);
      res.json({
        success: true,
        wishlist: transformWishlist(updatedWishlist)
      })
    } else {
      res.status(404).json({
        success: false,
        error: {
          message: "Item not in wishlist"
        }
      })
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  }
});

async function getWishlistAndProduct(uid, itemId) {
  const wishlist = await Wishlist.findOne({ uid: uid });
  const existingProduct = wishlist && wishlist.products.find(product => {
    return product.toString() === itemId
  });
  return { wishlist, existingProduct }
}

async function addItem(wishlist, itemId) {
  wishlist.products.push(itemId)

  const savedWishlist = await wishlist.save();

  const populatedWishlist = await savedWishlist.populate({
    path: 'products'
  }).execPopulate();

  return populatedWishlist;
}

async function removeItem(wishlist, itemId) {
  wishlist.products = wishlist.products.filter(product => {
    return product.toString() !== itemId;
  });
  const savedWishlist = await wishlist.save();
  const populatedWishlist = await savedWishlist.populate({
    path: 'products'
  }).execPopulate();

  return populatedWishlist;
}

module.exports = router;