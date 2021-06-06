import squareActionTypes from 'constants/squareActionTypes';
import { ascii } from 'utils/Pieces';

const initialState = {
  picked: null,
  ascii: ascii
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case squareActionTypes.CLICK:
      let picked = null;
      let newAscii = state.ascii;
      if (state.picked) {
        newAscii[state.picked.i][state.picked.j] = ' . ';
        newAscii[action.payload.i][action.payload.j] = state.picked.piece;
        picked = null;
      } else {
        picked = {
          i: action.payload.i,
          j: action.payload.j,
          piece: ascii[action.payload.i][action.payload.j]
        }
      }
      return {
        ...state,
        picked: picked,
        ascii: newAscii
      };
    default:
      return state;
  }
};

export default reducer;
