import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('access_token');
const user = localStorage.getItem('user');

const initialState = {
  loggedIn: !token? false : true,
  token: token || null,
  user: user ? JSON.parse(user) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      state.loggedIn = true;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loggedIn = false;
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.loggedIn = true;
      state.token = action.payload.access_token
      localStorage.setItem('access_token', action.payload.access_token);
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
