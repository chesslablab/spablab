import boardActionTypes from 'constants/boardActionTypes';
import Piece from 'utils/Piece';

const initialState = {
  picked: null,
  ascii: Piece.ascii.map((arr) => arr.slice())
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case boardActionTypes.ANALYSIS:
      return {
        picked: null,
        ascii: Piece.ascii.map((arr) => arr.slice())
      };
    case boardActionTypes.CLICK:
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
          piece: Piece.ascii[action.payload.i][action.payload.j]
        }
      }
      return {
        ...state,
        picked: picked,
        ascii: newAscii
      };
    case boardActionTypes.RESET:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
