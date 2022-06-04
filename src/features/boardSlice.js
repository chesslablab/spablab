import { createSlice } from '@reduxjs/toolkit';
import Ascii from '../utils/Ascii';
import Pgn from '../utils/Pgn';

const initialState = {
  short_fen: null,
  fen: null,
  turn: Pgn.symbol.WHITE,
  isCheck: false,
  isMate: false,
  picked: null,
  history: [ Ascii.board ],
  movetext: null,
  flip: Pgn.symbol.WHITE
};

const boardSlice = createSlice({
  name: 'board',
  initialState: initialState,
  reducers: {
    boardStart(state) {
      state = initialState;
    },
    boardStartFen(state, action) {
      const fenSplit = action.payload.fen.split(' ');
      state.fen = action.payload.fen;
      state.turn = fenSplit[1];
      state.history = [Ascii.toAscii(fenSplit[0])];
    },
    boardStartPgn(state, action) {
      state.fen = action.payload.fen;
      state.turn = action.payload.turn;
      state.history = action.payload.history;
      state.movetext = action.payload.movetext;
    },
    boardPickPiece(state, action) {
      state.picked = {
        i: action.payload.i,
        j: action.payload.j,
        sq: action.payload.sq,
        piece: state.history[state.history.length - 1][action.payload.i][action.payload.j]
      };
    },
    boardLeavePiece(state, action) {
      const newTurn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      const newAscii = JSON.parse(JSON.stringify(state.history[state.history.length - 1]));
      const newHistory = JSON.parse(JSON.stringify(state.history));
      if (state.picked.piece === ' . ') {
        state.picked = null;
      } else if (state.picked.legal_sqs.includes(action.payload.sq)) {
        newAscii[state.picked.i][state.picked.j] = ' . ';
        newAscii[action.payload.i][action.payload.j] = state.picked.piece;
        if (state.picked.en_passant) {
          if (action.payload.sq.charAt(0) === state.picked.en_passant.charAt(0)) {
            const index = Ascii.fromAlgebraicToIndex(state.picked.en_passant);
            newAscii[index[0]][index[1]] = ' . ';
          }
        }
        newHistory.push(newAscii);
        state.short_fen = Ascii.toFen(newHistory[newHistory.length - 1]) + ` ${newTurn}`;
        state.turn = newTurn;
        state.isCheck = false;
        state.isMate = false;
        state.picked = null;
        state.history = newHistory;
      }
    },
    boardBrowseHistory(state) {
      state.picked = null;
      state.short_fen = null;
    },
    boardCastledShort(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      newHistory[newHistory.length - 1] = Ascii.toAscii(action.payload.fen.split(' ')[0]);
      state.short_fen = null;
      state.fen = action.payload.fen;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.history = newHistory;
      state.movetext = action.payload.movetext;
    },
    boardCastledLong(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      newHistory[newHistory.length - 1] = Ascii.toAscii(action.payload.fen.split(' ')[0]);
      state.short_fen = null;
      state.fen = action.payload.fen;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.history = newHistory;
      state.movetext = action.payload.movetext;
    },
    boardFlip(state) {
      state.flip = state.flip === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
    },
    boardLegalSqs(state, action) {
      state.picked.legal_sqs = action.payload.sqs;
      state.picked.en_passant = action.payload.en_passant;
    },
    boardUndo(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      newHistory.splice(-1);
      state.short_fen = null;
      state.fen = action.payload.fen;
      state.turn = action.payload.turn;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.history = newHistory;
      state.movetext = action.payload.movetext;
    },
    boardValidMove(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      newHistory[newHistory.length - 1] = Ascii.toAscii(action.payload.fen.split(' ')[0]);
      state.short_fen = null;
      state.fen = action.payload.fen;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.history = newHistory;
      state.movetext = action.payload.movetext;
    },
    boardPlayMove(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      newHistory.push(Ascii.toAscii(action.payload.fen.split(' ')[0]));
      state.turn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      state.history = newHistory;
    },
    boardGrandmaster(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      newHistory.push(Ascii.toAscii(action.payload.fen.split(' ')[0]));
      state.short_fen = null;
      state.fen = action.payload.fen;
      state.turn = action.payload.turn;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.history = newHistory;
      state.movetext = action.payload.movetext;
    },
  }
});

export const {
  boardStart,
  boardStartFen,
  boardStartPgn,
  boardPickPiece,
  boardLeavePiece,
  boardBrowseHistory,
  boardCastledShort,
  boardCastledLong,
  boardFlip,
  boardLegalSqs,
  boardUndo,
  boardValidMove,
  boardPlayMove,
  boardGrandmaster
} = boardSlice.actions;
export default boardSlice.reducer;
