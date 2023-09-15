import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dialog:{
    open: false,
  }
};

const ImageUploadSlice = createSlice({
  name: 'imgUploadMode',
  initialState,
  reducers: {
    reset: () => initialState,
    set(state, action) {
      state.open =  action.payload.open;
    },
    loadImgDialog(state, action) {
      state.dialog = action.payload;
    },
  }
});

export const {
  reset,
  set,
  loadImgDialog
} = ImageUploadSlice.actions;
export default ImageUploadSlice.reducer;
