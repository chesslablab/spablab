import boardActionTypes from '../constants/boardActionTypes';
import Ascii from '../utils/Ascii';
import Pgn from '../utils/Pgn';

const initialState = {
  turn: Pgn.symbol.WHITE,
  picked: null,
  fen: null,
  history: [ Ascii.board ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case boardActionTypes.CLICK:
      if (state.picked) {
        const newTurn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
        const newAscii = JSON.parse(JSON.stringify(state.history[state.history.length - 1]));
        const newHistory = JSON.parse(JSON.stringify(state.history));
        newAscii[state.picked.i][state.picked.j] = ' . ';
        newAscii[action.payload.i][action.payload.j] = state.picked.piece;
        newHistory.push(newAscii);
        return {
          ...state,
          turn: newTurn,
          picked: null,
          fen: Ascii.toFen(newHistory[newHistory.length - 1]) + ` ${newTurn}`,
          history: newHistory
        };
      } else {
        return {
          ...state,
          picked: {
            i: action.payload.i,
            j: action.payload.j,
            piece: state.history[state.history.length - 1][action.payload.i][action.payload.j]
          },
          fen: null
        };
      }
    case boardActionTypes.START:
      return Object.assign({}, initialState);
    case boardActionTypes.UNDO:
      const newTurn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      const newHistory = JSON.parse(JSON.stringify(state.history));
      newHistory.pop();
      return {
        turn: newTurn,
        picked: null,
        fen: null,
        history: newHistory
      };
    default:
      return state;
  }
};

export default reducer;
