import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : '',
    isLoggedIn: localStorage.getItem('token') ? true : false,
  },
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = action.payload !== '' ? true : false;
      localStorage.setItem('token', action.payload);
    },
    logout(state) {
      state.token = '';
      state.isLoggedIn = false;
      localStorage.removeItem('token');
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
