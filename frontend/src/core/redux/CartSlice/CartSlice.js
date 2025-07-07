import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // each item = { productId, quantity }
  products: [], // { [productId]: full product info }
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
      delete state.products[productId];
    },
    clearCart: (state) => {
      state.items = [];
      state.products = {};
      state.loadedFromDB = false;
    },
    cacheProductDetails: (state, action) => {
      const product = action.payload;
      state.products[product.id] = product;
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
          delete state.products[productId];
        }
      }
    },
    addProduct: (state, action) => {
    const product = action.payload
    const exists = state.products.find(p => p.id === product.id)
    if (!exists) {
      state.products.push(product)
    }
    },
    setCart: (state, action) => {
      state.items = action.payload; // payload is an array of cart items
    }


  },
});

export const {
  setCartItems,
  addToCart,
  removeFromCart,
  clearCart,
  cacheProductDetails,
  decrementItemQuantity,
  addProduct ,
  setCart
} = cartSlice.actions;

export default cartSlice.reducer;
