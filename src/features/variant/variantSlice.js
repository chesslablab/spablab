import { createSlice } from '@reduxjs/toolkit';
import * as variantConst from '../../features/variant/variantConst';

const initialState = {
  name: variantConst.CLASSICAL
};

const variantSlice = createSlice({
  name: 'variant',
  initialState,
  reducers: {
    startClassical: () => initialState,
    startChess960: (state) => {
      state.name = variantConst.CHESS_960;
    }
  }
});

export const {
  startClassical,
  startChess960
} = variantSlice.actions;
export default variantSlice.reducer;
