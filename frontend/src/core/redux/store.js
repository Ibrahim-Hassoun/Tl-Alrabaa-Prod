import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice/AuthSlice';
import uiReducer from './UiSlice/UiSlice';
import cartReducer from './CartSlice/CartSlice'

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log('%c[Redux Action]', 'color: green;', action);
  const result = next(action);
  console.log('%c[Redux State]', 'color: blue;', storeAPI.getState());
  return result;
};


export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});
