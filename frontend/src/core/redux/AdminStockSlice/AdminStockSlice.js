import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTab: 'stock', // or 'orders'
  stock: {
    operation: null, // 'add' | 'edit' | 'delete'
    category: 'tobacco',
    productData: {},
    imagePreview: null,
    imageFile: null,
    productIsChosen: false,
  },
};

const adminStockSlice = createSlice({
  name: 'adminStock',
  initialState,
  reducers: {
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    setStockOperation: (state, action) => {
      state.stock.operation = action.payload;
    },
    setStockCategory: (state, action) => {
      state.stock.category = action.payload;
    },
    setProductData: (state, action) => {
      state.stock.productData = action.payload;
    },
    resetProductData: (state) => {
      state.stock.productData = {};
    },
    setImagePreview: (state, action) => {
      state.stock.imagePreview = action.payload;
    },
    setImageFile: (state, action) => {
      state.stock.imageFile = action.payload;
    },
    setProductIsChosen: (state, action) => {
      state.stock.productIsChosen = action.payload;
    },
  },
});

export const {
  setSelectedTab,
  setStockOperation,
  setStockCategory,
  setProductData,
  resetProductData,
  setImagePreview,
  setImageFile,
  setProductIsChosen,
} = adminStockSlice.actions;

export default adminStockSlice.reducer;
