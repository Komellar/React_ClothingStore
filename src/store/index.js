import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cart-slice';
import commentSlice from './comment-slice';

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    comment: commentSlice.reducer,
  },
});

export default store;
