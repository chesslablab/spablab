import boardActionTypes from '../constants/boardActionTypes';
import Ascii from '../utils/Ascii';
import Pgn from '../utils/Pgn';

const initialState = {
  turn: Pgn.symbol.WHITE,
  check: false,
  mate: false,
  picked: null,
  fen: null,
  history: [ Ascii.board ],
  movetext: null,
  flip: Pgn.symbol.WHITE
};

const reducer = (state = initialState, action) => {
  const newTurn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
  const newHistory = JSON.parse(JSON.stringify(state.history));
  const newAscii = JSON.parse(JSON.stringify(state.history[state.history.length - 1]));
  switch (action.type) {
    case boardActionTypes.START:
      return initialState;
    case boardActionTypes.START_FEN:
      const fenSplit = action.payload.fen.split(' ');
      return {
        ...state,
        turn: fenSplit[1],
        history: [Ascii.toAscii(fenSplit[0])]
      }
    case boardActionTypes.START_PGN:
      return {
        ...state,
        turn: action.payload.turn,
        history: action.payload.history,
        movetext: action.payload.movetext
      }
    case boardActionTypes.PICK_PIECE:
      return {
        ...state,
        picked: {
          i: action.payload.i,
          j: action.payload.j,
          algebraic: action.payload.algebraic,
          piece: state.history[state.history.length - 1][action.payload.i][action.payload.j]
        }
      };
    case boardActionTypes.LEAVE_PIECE:
      if (state.picked.piece === ' . ') {
        return {
          ...state,
          picked: null
        };
      } else if (state.picked.legal_moves.includes(action.payload.algebraic)) {
        newAscii[state.picked.i][state.picked.j] = ' . ';
        newAscii[action.payload.i][action.payload.j] = state.picked.piece;
        if (state.picked.en_passant) {
          if (action.payload.algebraic.charAt(0) === state.picked.en_passant.charAt(0)) {
            const index = Ascii.fromAlgebraicToIndex(state.picked.en_passant);
            newAscii[index[0]][index[1]] = ' . ';
          }
        }
        newHistory.push(newAscii);
        return {
          ...state,
          turn: newTurn,
          check: false,
          mate: false,
          picked: null,
          fen: Ascii.toFen(newHistory[newHistory.length - 1]) + ` ${newTurn}`,
          history: newHistory
        };
      }
      return state;
    case boardActionTypes.BROWSE_HISTORY:
      return {
        ...state,
        picked: null,
        fen: null
      };
    case boardActionTypes.CASTLED_SHORT:
      newHistory[newHistory.length - 1] = Ascii.toAscii(action.payload.fen.split(' ')[0]);
      return {
        ...state,
        check: action.payload.check,
        mate: action.payload.mate,
        picked: null,
        fen: null,
        history: newHistory,
        movetext: action.payload.movetext
      }
    case boardActionTypes.CASTLED_LONG:
      newHistory[newHistory.length - 1] = Ascii.toAscii(action.payload.fen.split(' ')[0]);
      return {
        ...state,
        check: action.payload.check,
        mate: action.payload.mate,
        picked: null,
        fen: null,
        history: newHistory,
        movetext: action.payload.movetext
      }
    case boardActionTypes.FLIP:
      const newFlip = state.flip === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      return {
        ...state,
        flip: newFlip
      }
    case boardActionTypes.LEGAL_MOVES:
      return {
        ...state,
        picked: {
          ...state.picked,
          legal_moves: action.payload.moves,
          en_passant: action.payload.en_passant
        }
      }
    case boardActionTypes.UNDO_MOVE:
      newHistory.splice(-1);
      return {
        ...state,
        turn: action.payload.turn,
        check: action.payload.isCheck,
        mate: action.payload.isMate,
        picked: null,
        fen: null,
        history: newHistory,
        movetext: action.payload.movetext
      }
    case boardActionTypes.VALID_MOVE:
      newHistory[newHistory.length - 1] = Ascii.toAscii(action.payload.fen.split(' ')[0]);
      return {
        ...state,
        check: action.payload.check,
        mate: action.payload.mate,
        picked: null,
        fen: null,
        history: newHistory,
        movetext: action.payload.movetext
      }
    case boardActionTypes.PLAYFRIEND_MOVE:
      newHistory.push(Ascii.toAscii(action.payload.fen.split(' ')[0]));
      return {
        ...state,
        turn: newTurn,
        history: newHistory
      }
    case boardActionTypes.RESPONSE:
      // TODO
      console.log(action);
      return state;
    default:
      return state;
  }
};

export default reducer;
