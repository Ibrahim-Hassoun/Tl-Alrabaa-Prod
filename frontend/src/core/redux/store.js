import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice/AuthSlice';
import uiReducer from './UiSlice/UiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});
