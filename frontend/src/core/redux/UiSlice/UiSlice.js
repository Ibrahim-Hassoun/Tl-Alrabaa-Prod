import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showPopup: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setShowPopup: (state, action) => {
      state.showPopup = action.payload;
    },
  },
});

export const { setShowPopup } = uiSlice.actions;
export default uiSlice.reducer;
