import { createSlice } from '@reduxjs/toolkit';
import Ascii from '../../common/Ascii';
import Pgn from '../../common/Pgn';

const initialState = {
  lan: '',
  turn: Pgn.symbol.WHITE,
  isCheck: false,
  isMate: false,
  picked: null,
  history: [Ascii.toAscii('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR')],
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
      const fenSplit = action.payload.fen.split(' ');
      state.fen = [action.payload.fen];
      state.turn = fenSplit[1];
      state.history = [Ascii.toAscii(fenSplit[0])];
      state.size = {
        files: 10,
        ranks: 8
      }
    },
    startChess960(state, action) {
      const fenSplit = action.payload.fen.split(' ');
      state.fen = [action.payload.fen];
      state.turn = fenSplit[1];
      state.history = [Ascii.toAscii(fenSplit[0])];
    },
    startFen(state, action) {
      const fenSplit = action.payload.fen.split(' ');
      state.fen = [action.payload.fen];
      state.turn = fenSplit[1];
      state.history = [Ascii.toAscii(fenSplit[0])];
    },
    startPgn(state, action) {
      state.fen = action.payload.fen;
      state.turn = action.payload.turn;
      state.history = action.payload.history;
      state.movetext = action.payload.movetext;
    },
    pickPiece(state, action) {
      state.lan = action.payload.sq;
      state.picked = {
        i: action.payload.i,
        j: action.payload.j,
        sq: action.payload.sq,
        piece: state.history[state.history.length - 1][action.payload.i][action.payload.j]
      };
    },
    leavePiece(state, action) {
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
            const index = Ascii.fromAlgebraicToIndex(state.picked.en_passant, state.size);
            newAscii[index[0]][index[1]] = ' . ';
          }
        }
        newHistory.push(newAscii);
        state.lan += action.payload.sq;
        state.turn = newTurn;
        state.isCheck = false;
        state.isMate = false;
        state.picked = null;
        state.history = newHistory;
      }
    },
    browseHistory(state) {
      state.picked = null;
      state.lan = '';
    },
    castleShort(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newHistory[newHistory.length - 1] = Ascii.toAscii(action.payload.fen.split(' ')[0]);
      newFen.push(action.payload.fen);
      state.lan = '';
      state.fen = newFen;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.history = newHistory;
      state.movetext = action.payload.movetext;
    },
    castleLong(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newHistory[newHistory.length - 1] = Ascii.toAscii(action.payload.fen.split(' ')[0]);
      newFen.push(action.payload.fen);
      state.lan = '';
      state.fen = newFen;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.history = newHistory;
      state.movetext = action.payload.movetext;
    },
    flip(state) {
      state.flip = state.flip === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
    },
    legalSqs(state, action) {
      state.picked.legal_sqs = action.payload.sqs;
      state.picked.en_passant = action.payload.en_passant;
    },
    undo(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newHistory.splice(-1);
      newFen.splice(-1);
      state.lan = '';
      state.fen = newFen;
      state.turn = action.payload.turn;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.history = newHistory;
      state.movetext = action.payload.movetext;
    },
    validMove(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newHistory[newHistory.length - 1] = Ascii.toAscii(action.payload.fen.split(' ')[0]);
      newFen.push(action.payload.fen);
      state.lan = '';
      state.fen = newFen;
      state.isCheck = action.payload.isCheck;
      state.isMate = action.payload.isMate;
      state.picked = null;
      state.history = newHistory;
      state.movetext = action.payload.movetext;
    },
    playMove(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      newHistory.push(Ascii.toAscii(action.payload.fen.split(' ')[0]));
      state.turn = state.turn === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      state.history = newHistory;
    },
    gm(state, action) {
      const newHistory = JSON.parse(JSON.stringify(state.history));
      const newFen = JSON.parse(JSON.stringify(state.fen));
      newHistory.push(Ascii.toAscii(action.payload.fen.split(' ')[0]));
      newFen.push(action.payload.fen);
      state.lan = '';
      state.fen = newFen;
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
  start,
  startCapablanca80,
  startChess960,
  startFen,
  startPgn,
  pickPiece,
  leavePiece,
  browseHistory,
  castleShort,
  castleLong,
  flip,
  legalSqs,
  undo,
  validMove,
  playMove,
  gm
} = boardSlice.actions;
export default boardSlice.reducer;
