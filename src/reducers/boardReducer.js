import boardActionTypes from "../constants/boardActionTypes";
import Ascii from "../utils/Ascii";
import Pgn from "../utils/Pgn";
import getAllCandidatesSquares from "../utils/CandidateSquares";

const initialState = {
  turn: Pgn.symbol.WHITE,
  picked: null,
  fen: null,
  history: [Ascii.board],
  movetext: null,
  flip: Pgn.symbol.WHITE,
  candidates: new Array(),
};

const reducer = (state = initialState, action) => {
  const newTurn =
    state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
  const newHistory = JSON.parse(JSON.stringify(state.history));
  const newAscii = JSON.parse(
    JSON.stringify(state.history[state.history.length - 1])
  );
  const position = newHistory[newHistory.length - 1];
  switch (action.type) {
    case boardActionTypes.START:
      return Object.assign({}, initialState);
    case boardActionTypes.PICK_PIECE:
      return {
        ...state,
        picked: {
          i: action.payload.i,
          j: action.payload.j,
          piece:
            state.history[state.history.length - 1][action.payload.i][
              action.payload.j
            ],
        },
        candidates: getAllCandidatesSquares(action, state),
      };
    case boardActionTypes.LEAVE_PIECE:
      newAscii[state.picked.i][state.picked.j] = " . ";
      newAscii[action.payload.i][action.payload.j] = state.picked.piece;
      newHistory.push(newAscii);
      return {
        ...state,
        turn: newTurn,
        picked: null,
        fen: Ascii.toFen(newHistory[newHistory.length - 1]) + ` ${newTurn}`,
        history: newHistory,
        candidates: [],
      };
    case boardActionTypes.UNDO_MOVE:
      newHistory.pop();
      return {
        ...state,
        turn: newTurn,
        picked: null,
        fen: null,
        history: newHistory,
      };
    case boardActionTypes.BROWSE_HISTORY:
      return {
        ...state,
        picked: null,
        fen: null,
      };
    case boardActionTypes.CASTLED_SHORT:
      if (action.payload.turn === Pgn.symbol.BLACK) {
        position[7][7] = " . ";
        position[7][5] = " R ";
        newHistory[newHistory.length - 1] = position;
      } else {
        position[0][7] = " . ";
        position[0][5] = " r ";
        newHistory[newHistory.length - 1] = position;
      }
      return {
        ...state,
        picked: null,
        fen: null,
        history: newHistory,
        movetext: action.payload.movetext,
      };
    case boardActionTypes.CASTLED_LONG:
      if (action.payload.turn === Pgn.symbol.BLACK) {
        position[7][0] = " . ";
        position[7][3] = " R ";
        newHistory[newHistory.length - 1] = position;
      } else {
        position[0][0] = " . ";
        position[0][3] = " r ";
        newHistory[newHistory.length - 1] = position;
      }
      return {
        ...state,
        picked: null,
        fen: null,
        history: newHistory,
        movetext: action.payload.movetext,
      };
    case boardActionTypes.VALID_MOVE:
      return {
        ...state,
        picked: null,
        fen: null,
        history: newHistory,
        movetext: action.payload.movetext,
      };
    case boardActionTypes.FLIP:
      const newFlip =
        state.flip === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      return {
        ...state,
        flip: newFlip,
      };
    default:
      return state;
  }
};

export default reducer;
