const transformCart = (cart) => {
  const cartObj = cart.toObject();

  cartObj.cartLines = cartObj.cartLines.map(cartLine => ({
    ...cartLine,
    _id: undefined,
    product: {...cartLine.product, id: cartLine.product._id, _id: undefined}
  }));
  cartObj._id = undefined;
  cartObj.uid = undefined;
  cartObj.__v = undefined;

  return cartObj
}

const transformOrders = (orders) => {
  const cartObj = cart.toObject();

  cartObj.cartLines = cartObj.cartLines.map(cartLine => ({
    ...cartLine,
    _id: undefined,
    product: {...cartLine.product, id: cartLine.product._id, _id: undefined}
  }));
  cartObj._id = undefined;
  cartObj.uid = undefined;
  cartObj.__v = undefined;

  return cartObj
}

const transformWishlist = (wishlist) => {
  const wishlistObj = wishlist.toObject();

  wishlistObj.products = wishlistObj.products.map(product => ({
    ...product, id: product._id, _id: undefined
  }));
  wishlistObj._id = undefined;
  wishlistObj.uid = undefined;
  wishlistObj.__v = undefined;

  return wishlistObj;
}

module.exports.transformCart = transformCart;
module.exports.transformWishlist = transformWishlist;