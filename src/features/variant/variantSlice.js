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
    startCapablanca80: (state) => {
      state.name = variantConst.CAPABLANCA_80;
    },
    startChess960: (state, action) => {
      state.name = variantConst.CHESS_960;
      let startPos = action.payload.fen.split(' ');
      startPos = startPos[0].split('/');
      state.startPos = startPos[0].toUpperCase();
    }
  }
});

export const {
  startClassical,
  startCapablanca80,
  startChess960
} = variantSlice.actions;
export default variantSlice.reducer;
