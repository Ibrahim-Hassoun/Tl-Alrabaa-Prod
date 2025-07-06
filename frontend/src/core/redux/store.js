import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice/AuthSlice';
import uiReducer from './UiSlice/UiSlice';
import cartReducer from './CartSlice/CartSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    cart: cartReducer
  },
});
