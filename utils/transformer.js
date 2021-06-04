const maskIds = (dataObj) => {
  dataObj._id = undefined;
  dataObj.uid = undefined;
  dataObj.__v = undefined;
  return dataObj
}

const transformCart = (cart) => {
  const cartObj = cart.toObject();

  cartObj.cartLines = cartObj.cartLines.map(cartLine => ({
    ...cartLine,
    _id: undefined,
    product: { ...cartLine.product, id: cartLine.product._id, _id: undefined }
  }));
  cartObj = maskIds(cartObj);

  return cartObj
}

const transformWishlist = (wishlist) => {
  const wishlistObj = wishlist.toObject();

  wishlistObj.products = wishlistObj.products.map(product => ({
    ...product, id: product._id, _id: undefined
  }));
  wishlistObj = maskIds(wishlistObj);

  return wishlistObj;
}

module.exports.transformCart = transformCart;
module.exports.transformWishlist = transformWishlist;