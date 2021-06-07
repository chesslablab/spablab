import boardActionTypes from 'constants/boardActionTypes';
import Ascii from 'utils/Ascii';

const initialState = {
  picked: null,
  ascii: Ascii.board,
  history: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case boardActionTypes.CLICK:
      let picked = null;
      let newAscii = state.ascii.map((arr) => arr.slice());
      let newHistory = state.history.map((arr) => arr.slice());
      if (state.picked) {
        newAscii[state.picked.i][state.picked.j] = ' . ';
        newAscii[action.payload.i][action.payload.j] = state.picked.piece;
        picked = null;
      } else {
        picked = {
          i: action.payload.i,
          j: action.payload.j,
          piece: state.ascii[action.payload.i][action.payload.j]
        }
        newHistory.push(state.ascii);
      }
      return {
        ...state,
        picked: picked,
        ascii: newAscii,
        history: newHistory
      };
    case boardActionTypes.START:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
