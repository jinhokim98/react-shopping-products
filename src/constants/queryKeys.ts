const QUERY_KEYS = {
  getProducts: 'getProducts',
  getCartItems: 'getCartItems',
  postCartItem: 'postCartItems',
  deleteCartItem: 'deleteCartItems',
  patchCartItemQuantity: 'patchCartItemQuantity',
} as const;

export default QUERY_KEYS;
