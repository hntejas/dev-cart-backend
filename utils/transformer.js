const maskIds = (dataObj) => {
  dataObj._id = undefined;
  dataObj.uid = undefined;
  dataObj.__v = undefined;
  return dataObj
}

const transformCart = (cartArr) => {
  cartArr = cartArr.map(cartLine => {
    const line = cartLine.toObject();
    return {
      ...line,
      id: line._id,
      _id: undefined,
      uid: undefined,
      product: { ...line.product, id: line.product._id, _id: undefined }
    }
  });

  return cartArr;
}

const transformWishlist = (wishlist) => {
  let wishlistObj = wishlist.toObject();

  wishlistObj.products = wishlistObj.products.map(product => ({
    ...product, id: product._id, _id: undefined
  }));
  wishlistObj = maskIds(wishlistObj);

  return wishlistObj;
}

module.exports.transformCart = transformCart;
module.exports.transformWishlist = transformWishlist;