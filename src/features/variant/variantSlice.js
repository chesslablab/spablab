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
    startCapablanca100: (state) => {
      state.name = variantConst.CAPABLANCA_100;
    },
    startChess960: (state) => {
      state.name = variantConst.CHESS_960;
    }
  }
});

export const {
  startClassical,
  startCapablanca100,
  startChess960
} = variantSlice.actions;
export default variantSlice.reducer;
