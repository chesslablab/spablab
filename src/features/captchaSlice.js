import { createSlice } from '@reduxjs/toolkit';

const generate = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }

  return result;
};

const initialState = {
  text: ''
};

const captchaSlice = createSlice({
  name: 'captcha',
  initialState,
  reducers: {
    reset: () => initialState,
    init(state) {
      state.text = generate(8);
    }
  }
});

export const {
  reset,
  init
} = captchaSlice.actions;
export default captchaSlice.reducer;
