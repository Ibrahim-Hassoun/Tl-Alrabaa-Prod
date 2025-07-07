import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice/AuthSlice';
import uiReducer from './UiSlice/UiSlice';
import cartReducer from './CartSlice/CartSlice'
import adminStockReducer from './AdminStockSlice/AdminStockSlice';

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
    cart: cartReducer,
    adminStock: adminStockReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['adminStock/setImageFile'],
        ignoredPaths: ['adminStock.stock.imageFile'],
      },
    }).concat(loggerMiddleware),
});
