import { createSlice } from '@reduxjs/toolkit';
import Ascii from 'common/Ascii';
import Pgn from 'common/Pgn';

const initialState = {
  turn: Pgn.symbol.WHITE,
  isCheck: false,
  isMate: false,
  fen: ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -'],
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
    playLan(state, action) {
      state.turn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      state.left = action.payload.left;
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
      if (state.picked) {
        if (state.picked.piece === ' . ') {
          delete state.picked;
        } else if (Object.keys(state.picked.fen).includes(action.payload.sq)) {
          const newFen = JSON.parse(JSON.stringify(state.fen));
          newFen.push(state.picked.fen[action.payload.sq]);
          state.lan += action.payload.sq;
          state.fen = newFen;
          state.turn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
          state.left = action.payload.left;
          delete state.picked;
        }
      }
    },
    browseHistory(state) {
      delete state.lan;
      delete state.picked;
    },
    legal(state, action) {
      state.picked.fen = action.payload?.fen;
    },
    undo(state, action) {
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newFen.splice(-1);
      state.fen = newFen;
      state.turn = action.payload.turn;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.movetext = action.payload.movetext;
      delete state.lan;
      delete state.picked;
      delete state.left;
    },
    validMove(state, action) {
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.movetext = action.payload.movetext;
      if (state.turn === action.payload.turn) {
        const newFen = JSON.parse(JSON.stringify(state.fen));
        newFen.push(action.payload.fen);
        state.fen = newFen;
      }
      delete state.lan;
      delete state.picked;
    },
    stockfish(state, action) {
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newFen.push(action.payload.fen);
      state.fen = newFen;
      state.turn = action.payload.turn;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.left = action.payload.left;
      state.movetext = action.payload.movetext;
      delete state.lan;
      delete state.picked;
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
  playLan,
  pickPiece,
  leavePiece,
  browseHistory,
  legal,
  undo,
  validMove,
  stockfish
} = boardSlice.actions;
export default boardSlice.reducer;
