import boardActionTypes from '../constants/boardActionTypes';
import Ascii from '../utils/Ascii';

const initialState = {
  picked: null,
  history: [ Ascii.board ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case boardActionTypes.CLICK:
      let picked = null;
      let newAscii = state.history[state.history.length - 1].map((arr) => arr.slice());
      let newHistory = state.history.map((arr) => arr.slice());
      if (state.picked) {
        newAscii[state.picked.i][state.picked.j] = ' . ';
        newAscii[action.payload.i][action.payload.j] = state.picked.piece;
        picked = null;
        newHistory.push(newAscii);
      } else {
        picked = {
          i: action.payload.i,
          j: action.payload.j,
          piece: state.history[state.history.length - 1][action.payload.i][action.payload.j]
        }
      }
      return {
        ...state,
        picked: picked,
        history: newHistory
      };
    case boardActionTypes.START:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
