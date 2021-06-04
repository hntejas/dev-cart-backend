const express = require("express");
const router = express.Router();

const Address = require("../models/address.model");

router.get("/", async (req, res) => {
  try{
    const addresses = await Address.find({uid: req.uid});
    res.json({
      success: true,
      addresses: addresses
    });
  }catch(e){
    res.status(500).json({
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  }
  
});

router.post("/", async (req, res) => {
  try{
    const {address} = req.body;
    const newAddress = await Address.create({ uid: req.uid, ...address });
    res.json({
      success: true,
      addressId: newAddress._id
    })
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
    const {address} = req.body;
    const updatedAddress = await Address.findOneAndUpdate({ uid: req.uid, _id: address._id }, {...address, uid: req.uid});
    res.json({
      success: true,
      addressId: updatedAddress._id
    })
  }catch(e){
    res.status(500).json({
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});

router.delete("/:addressId", async (req, res) => {
  try{
    const {addressId} = req.params;
    await Address.deleteOne({uid: req.uid, _id: addressId})
    res.json({
      success: true
    })
  }catch(e){
    res.status(500).json({
      error: {
        message: "Mongoose error: " + e.message
      }
    })
  } 
});

module.exports = router;