import { createSlice } from '@reduxjs/toolkit';

const jsonResult = localStorage.getItem('myCart');
const cartResult = JSON.parse(jsonResult);

const cartTotalQuantity = () => {
  let cartQuantity = 0;
  cartResult.forEach((item) => {
    cartQuantity += item.quantity;
  });
  return cartQuantity;
};

const cartTotalPrice = () => {
  let cartPrice = 0;
  cartResult.forEach((item) => {
    cartPrice += item.quantity * item.price;
  });
  return cartPrice;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: cartResult ? cartResult : [],
    totalQuantity: cartResult ? cartTotalQuantity() : 0,
    totalCartPrice: cartResult ? cartTotalPrice() : 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      state.totalQuantity += newItem.quantity;
      state.totalCartPrice += newItem.quantity * newItem.price;

      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.quantity * newItem.price,
        });
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.quantity * newItem.price;
      }
      localStorage.setItem('myCart', JSON.stringify(state.items));
    },
    removeItemFromCart(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      state.totalQuantity--;
      state.totalCartPrice -= existingItem.price;

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      localStorage.setItem('myCart', JSON.stringify(state.items));
    },
    resetCart(state) {
      localStorage.removeItem('myCart');
      state.items = [];
      state.totalQuantity = 0;
      state.totalCartPrice = 0;
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
