import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // each item = { productId, quantity }
  productCache: {}, // { [productId]: full product info }
  loadedFromDB: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.loadedFromDB = true;
    },
    addToCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const existing = state.items.find((item) => item.productId === productId);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ productId, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      delete state.productCache[productId];
    },
    clearCart: (state) => {
      state.items = [];
      state.productCache = {};
      state.loadedFromDB = false;
    },
    cacheProductDetails: (state, action) => {
      const product = action.payload;
      state.productCache[product.id] = product;
    },
    decrementItemQuantity: (state, action) => {
      const productId = action.payload;
      const existing = state.items.find(item => item.productId === productId);

      if (existing) {
        if (existing.quantity > 1) {
          existing.quantity -= 1;
        } else {
          // quantity is 1, remove the item completely
          state.items = state.items.filter(item => item.productId !== productId);
          delete state.productCache[productId];
        }
      }
    }

  },
});

export const {
  setCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  cacheProductDetails,
  decrementItemQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
