import { createSlice } from '@reduxjs/toolkit';
import Ascii from 'common/Ascii';
import Pgn from 'common/Pgn';

const initialState = {
  lan: '',
  turn: Pgn.symbol.WHITE,
  isCheck: false,
  isMate: false,
  picked: null,
  fen: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -'],
  movetext: '',
  flip: Pgn.symbol.WHITE,
  size: {
    files: 8,
    ranks: 8
  }
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    start: () => initialState,
    startCapablanca80(state, action) {
      const fen = action.payload.fen.split(' ');
      state.fen = [action.payload.fen];
      state.turn = fen[1];
      state.size = {
        files: 10,
        ranks: 8
      }
    },
    startChess960(state, action) {
      const fen = action.payload.fen.split(' ');
      state.fen = [action.payload.fen];
      state.turn = fen[1];
    },
    startFen(state, action) {
      const fen = action.payload.fen.split(' ');
      state.fen = [action.payload.fen];
      state.turn = fen[1];
    },
    startPgn(state, action) {
      state.fen = action.payload.fen;
      state.turn = action.payload.turn;
      state.movetext = action.payload.movetext;
    },
    flip(state) {
      state.flip = state.flip === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
    },
    turn(state) {
      state.turn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
    },
    pickPiece(state, action) {
      const fen = state.fen[state.fen.length - 1].split(' ');
      const ascii = Ascii.toAscii(fen[0]);
      state.lan = action.payload.sq;
      state.picked = {
        i: action.payload.i,
        j: action.payload.j,
        sq: action.payload.sq,
        piece: ascii[action.payload.i][action.payload.j]
      };
    },
    leavePiece(state, action) {
      if (state.picked.piece === ' . ') {
        state.picked = null;
      } else if (Object.keys(state.picked.fen).includes(action.payload.sq)) {
        const newFen = JSON.parse(JSON.stringify(state.fen));
        newFen.push(state.picked.fen[action.payload.sq]);
        state.lan += action.payload.sq;
        state.fen = newFen;
        state.turn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
        state.picked = null;
      }
    },
    browseHistory(state) {
      state.picked = null;
      state.lan = '';
    },
    legal(state, action) {
      state.picked.fen = action.payload.fen;
      state.picked.en_passant = action.payload.en_passant;
    },
    undo(state, action) {
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newFen.splice(-1);
      state.lan = '';
      state.fen = newFen;
      state.turn = action.payload.turn;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.movetext = action.payload.movetext;
    },
    validMove(state, action) {
      state.lan = '';
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.movetext = action.payload.movetext;
      if (state.turn === action.payload.turn) {
        const newFen = JSON.parse(JSON.stringify(state.fen));
        newFen.push(action.payload.fen);
        state.fen = newFen;
      }
    },
    gm(state, action) {
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newFen.push(action.payload.fen);
      state.lan = '';
      state.fen = newFen;
      state.turn = action.payload.turn;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.movetext = action.payload.movetext;
    },
  }
});

export const {
  start,
  startCapablanca80,
  startChess960,
  startFen,
  startPgn,
  flip,
  turn,
  pickPiece,
  leavePiece,
  browseHistory,
  legal,
  undo,
  validMove,
  gm
} = boardSlice.actions;
export default boardSlice.reducer;
