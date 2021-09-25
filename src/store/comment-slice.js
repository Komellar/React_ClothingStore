import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    value: '',
    isTouched: false,
    // hasError: false,
    // error: [],
  },
  reducers: {
    changeValue(state, action) {
      state.value = action.payload;
    },
    inputBlur(state) {
      state.isTouched = true;
    },
    resetInput(state) {
      state.value = '';
      state.isTouched = false;
    },
  },
});

export const commentActions = commentSlice.actions;

export default commentSlice;

// const validSymbols = /^(?!\s)[A-Za-z_][A-Za-z0-9_():^.?,!\s]+$/;

// state.hasError = false;
// state.error = null;
// if (state.isTouched && state.value.trim().length === 0) {
//     state.error = "Value can't be empty!";
//     state.hasError = true;
// } else if (state.isTouched && !validSymbols.test(state.value)) {
//     state.error = {'Use only valid symbols!'};
//     state.hasError = true;
// }

// if (state.hasError) {
//     console.log(state.error);
// }
