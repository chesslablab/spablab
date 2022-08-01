import jwt_decode from "jwt-decode";
import store from '../app/store';
import Opening from '../common/Opening.js';
import Pgn from '../common/Pgn';
import {
  closeInfoAlert,
  showInfoAlert
} from '../features/alert/infoAlertSlice';
import {
  openAcceptDrawDialog
} from '../features/dialog/acceptDrawDialogSlice';
import {
  openHeuristicsDialog
} from '../features/dialog/heuristicsDialogSlice';
import {
  closePlayOnlineDialog,
  openPlayOnlineDialog
} from '../features/dialog/playOnlineDialogSlice';
import {
  closeProgressDialog,
  openProgressDialog
} from '../features/dialog/progressDialogSlice';
import {
  openRematchAcceptDialog
} from '../features/dialog/acceptRematchDialogSlice';
import {
  openAcceptTakebackDialog
} from '../features/dialog/acceptTakebackDialogSlice';
import {
  closeGameTable,
  showGameTable
} from '../features/table/gameTableSlice';
import {
  closeOpeningAnalysisTable,
  showOpeningAnalysisTable
} from '../features/table/openingAnalysisTableSlice';
import {
  start,
  startFen,
  startPgn,
  flip,
  legalSqs,
  castleLong,
  castleShort,
  validMove,
  undo,
  gm
} from '../features/boardSlice';
import {
  resetBar,
  updateBar
} from '../features/heuristicsBarSlice';
import {
  goTo
} from '../features/historySlice';
import {
  startAnalysis,
  startFen as startFenMode,
  startPgn as startPgnMode,
  startUndefined as startUndefinedMode,
  setGm,
  setPlay,
  setStockfish,
  gmMovetext,
  acceptPlay,
  acceptTakeback,
  acceptDraw,
  declineDraw,
  declineTakeback,
  acceptResign,
  acceptRematch,
  declineRematch,
  acceptLeave
} from '../features/modeSlice';
import {
  MODE_ANALYSIS,
  MODE_GM,
  MODE_PLAY,
  MODE_STOCKFISH
} from '../features/modeConstants';
import WsAction from './WsAction';

const reset = (dispatch) => {
  dispatch(resetBar());
  dispatch(closeOpeningAnalysisTable());
  dispatch(closeGameTable());
  dispatch(closeInfoAlert());
  dispatch(goTo({ back: 0 }));
  dispatch(start());
  dispatch(closeProgressDialog());
};


export default class WsEvent {
  static onStartAnalysis = () => dispatch => {
    reset(dispatch);
    dispatch(startAnalysis({}));
  }

  static onStartGm = (data) => dispatch => {
    reset(dispatch);
    dispatch(setGm({
      color: data['/start'].color,
      movetext: null
    }));
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(flip());
      WsAction.gm(store.getState());
    }
  }

  static onStartFen = (data) => dispatch => {
    reset(dispatch);
    if (data['/start'].fen) {
      dispatch(startFenMode());
      dispatch(startFen({ fen: data['/start'].fen }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(startUndefinedMode());
      dispatch(showInfoAlert({ info: 'Invalid FEN, please try again with different data.' }));
    }
  }

  static onStartPgn = (data) => dispatch => {
    reset(dispatch);
    if (data['/start'].movetext) {
      dispatch(startPgnMode());
      dispatch(startPgn({
        turn: data['/start'].turn,
        movetext: data['/start'].movetext,
        fen: data['/start'].fen,
        history: data['/start'].history
      }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(startUndefinedMode());
      dispatch(showInfoAlert({ info: 'Invalid PGN movetext, please try again with different data.' }));
    }
  }

  static onStartPlay = (data) => dispatch => {
    reset(dispatch);
    const jwtDecoded = jwt_decode(data['/start'].jwt);
    dispatch(setPlay({
      jwt: data['/start'].jwt,
      jwt_decoded: jwtDecoded,
      hash: data['/start'].hash,
      color: jwtDecoded.color,
      takeback: null,
      draw: null,
      resign: null,
      rematch: null,
      leave: null,
      accepted: false,
      timer: {
        expiry_timestamp: null,
        over: null
      }
    }));
    if (jwtDecoded.color === Pgn.symbol.BLACK) {
      dispatch(flip());
    }
    dispatch(showInfoAlert({ info: 'Waiting for player to join...' }));
    dispatch(start());
  }

  static onStartStockfish = (data) => dispatch => {
    reset(dispatch);
    dispatch(setStockfish({
      color: data['/start'].color,
      options: store.getState().mode.computer.options,
      params: store.getState().mode.computer.params
    }));
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(flip());
      WsAction.stockfish(store.getState());
    }
  }

  static onAccept = (data) => dispatch => {
    reset(dispatch);
    if (!store.getState().mode.play) {
      const jwtDecoded = jwt_decode(data['/accept'].jwt);
      const color = jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      dispatch(start());
      dispatch(setPlay({
        jwt: data['/accept'].jwt,
        jwt_decoded: jwt_decode(data['/accept'].jwt),
        hash: data['/accept'].hash,
        color: color,
        takeback: null,
        draw: null,
        resign: null,
        rematch: null,
        leave: null,
        accepted: false,
        timer: {
          expiry_timestamp: null,
          over: null
        }
      }));
    }
    if (store.getState().mode.play.color === Pgn.symbol.BLACK) {
      dispatch(flip());
    }
    dispatch(acceptPlay());
    dispatch(closePlayOnlineDialog());
  }

  static onOnlineGames = (data) => dispatch => {
    dispatch(closeProgressDialog());
    dispatch(openPlayOnlineDialog(data['/online_games']));
  }

  static onLegalSqs = (data) => dispatch => {
    dispatch(legalSqs({
      piece: data['/legal_sqs'].identity,
      position: data['/legal_sqs'].position,
      sqs: data['/legal_sqs'].sqs,
      en_passant: data['/legal_sqs'].enPassant ? data['/legal_sqs'].enPassant : ''
    }));
  }

  static onPlayfen = (props, data) => dispatch => {
    const payload = {
      isCheck: data['/play_fen'].isCheck,
      isMate: data['/play_fen'].isMate,
      movetext: data['/play_fen'].movetext,
      fen: data['/play_fen'].fen
    };
    if (data['/play_fen'].isLegal) {
      if (data['/play_fen'].pgn === Pgn.symbol.CASTLING_LONG) {
        dispatch(castleLong(payload));
      } else if (data['/play_fen'].pgn === Pgn.symbol.CASTLING_SHORT) {
        dispatch(castleShort(payload));
      } else {
        dispatch(validMove(payload));
      }
      if (store.getState().mode.name === MODE_ANALYSIS) {
        dispatch(closeOpeningAnalysisTable());
        let rows = Opening.analysis(payload.movetext);
        if (rows) {
          dispatch(showOpeningAnalysisTable({ rows: rows }));
        } else {
          dispatch(closeOpeningAnalysisTable());
        }
      } else if (store.getState().mode.name === MODE_GM) {
        dispatch(openProgressDialog());
        WsAction.gm(store.getState());
      } else if (store.getState().mode.name === MODE_STOCKFISH) {
        dispatch(openProgressDialog());
        WsAction.stockfish(store.getState());
      }
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    }
  }

  static onHeuristics = (data) => dispatch => {
    dispatch(closeProgressDialog());
    dispatch(openHeuristicsDialog({
      dimensions: data['/heuristics'].dimensions,
      balance: data['/heuristics'].balance
    }));
  }

  static onHeuristicsBar = (data) => dispatch => {
    dispatch(updateBar({
      dimensions: data['/heuristics_bar'].dimensions,
      balance: data['/heuristics_bar'].balance
    }));
  }

  static onTakebackPropose = () => dispatch => {
    if (!store.getState().mode.play.takeback) {
      dispatch(openAcceptTakebackDialog());
    }
  }

  static onTakebackAccept = () => dispatch => {
    dispatch(acceptTakeback());
  }

  static onDrawPropose = () => dispatch => {
    if (!store.getState().mode.play.draw) {
      dispatch(openAcceptDrawDialog());
    }
  }

  static onDrawAccept = () => dispatch => {
    dispatch(acceptDraw());
    dispatch(showInfoAlert({ info: 'Draw offer accepted.' }));
  }

  static onDrawDecline = () => dispatch => {
    dispatch(declineDraw());
    dispatch(showInfoAlert({ info: 'Draw offer declined.' }));
  }

  static onUndo = (data) => dispatch => {
    dispatch(undo(data['/undo']));
    if (data['/undo'].mode === MODE_GM) {
      dispatch(openProgressDialog());
      WsAction.gm(store.getState());
      WsAction.gm(store.getState());
    } else if (data['/undo'].mode === MODE_PLAY) {
      dispatch(declineTakeback());
    }
  }

  static onResignAccept = () => dispatch => {
    dispatch(acceptResign());
    dispatch(showInfoAlert({ info: 'Chess game resigned.' }));
  }

  static onRematchPropose = () => dispatch => {
    if (!store.getState().mode.play.rematch) {
      dispatch(openRematchAcceptDialog());
    }
  }

  static onRematchAccept = () => dispatch => {
    dispatch(acceptRematch());
    dispatch(showInfoAlert({ info: 'Rematch accepted.' }));
  }

  static onRematchDecline = () => dispatch => {
    dispatch(declineRematch());
    dispatch(showInfoAlert({ info: 'Rematch declined.' }));
  }

  static onLeaveAccept = () => dispatch => {
    dispatch(acceptLeave());
    dispatch(showInfoAlert({ info: 'Your opponent left the game.' }));
  }

  static onRestart = (data) => dispatch => {
    const jwtDecoded = jwt_decode(data['/restart'].jwt);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(jwtDecoded.min) * 60);
    dispatch(setPlay({
      color: store.getState().mode.play.color,
      accepted: false
    }));
    dispatch(setPlay({
      jwt: data['/restart'].jwt,
      jwt_decoded: jwtDecoded,
      hash: data['/restart'].hash,
      color: store.getState().mode.play.color,
      takeback: null,
      draw: null,
      resign: null,
      rematch: null,
      accepted: true,
      timer: {
        expiry_timestamp: expiryTimestamp,
        over: null
      }
    }));
    dispatch(start());
    if (store.getState().mode.play.color === Pgn.symbol.BLACK) {
      dispatch(flip());
    }
  }

  static onGm = (data) => dispatch => {
    dispatch(closeProgressDialog());
    if (data['/gm']) {
      dispatch(showGameTable({ game: data['/gm'].game }));
      dispatch(gm({
        turn: data['/gm'].state.turn,
        isCheck: data['/gm'].state.isCheck,
        isMate: data['/gm'].state.isMate,
        movetext: data['/gm'].state.movetext,
        fen: data['/gm'].state.fen
      }));
      dispatch(gmMovetext({
        movetext: data['/gm'].state.movetext
      }));
      dispatch(closeInfoAlert());
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(closeGameTable());
      dispatch(gmMovetext({ movetext: null }));
      dispatch(showInfoAlert({ info: 'This move was not found in the database.' }));
    }
  }

  static onRandomCheckmate = (data) => dispatch => {
    reset(dispatch);
    if (data['/random_checkmate'].fen) {
      dispatch(setStockfish({
        color: data['/random_checkmate'].turn,
        options: {
          "Skill Level": 20
        },
        params: {
          "depth": 12
        }
      }));
      WsAction.startFen(store.getState(), data['/random_checkmate'].fen);
    } else {
      dispatch(startUndefinedMode());
      dispatch(showInfoAlert({ info: 'Whoops! A random checkmate could not be loaded.' }));
    }
  }

  static onRandomGame = (data) => dispatch => {
    reset(dispatch);
    if (data['/random_game'].movetext) {
      dispatch(startPgnMode());
      dispatch(startPgn({
        turn: data['/random_game'].turn,
        movetext: data['/random_game'].movetext,
        fen: data['/random_game'].fen,
        history: data['/random_game'].history
      }));
      dispatch(showGameTable({ game: data['/random_game'].game }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(startUndefinedMode());
      dispatch(showInfoAlert({ info: 'Whoops! A random game could not be loaded.' }));
    }
  }

  static onStockfish = (data) => dispatch => {
    dispatch(closeProgressDialog());
    if (data['/stockfish']) {
      dispatch(gm({
        turn: data['/stockfish'].state.turn,
        isCheck: data['/stockfish'].state.isCheck,
        isMate: data['/stockfish'].state.isMate,
        movetext: data['/stockfish'].state.movetext,
        fen: data['/stockfish'].state.fen
      }));
    }
  }

  static onValidate = (data) => dispatch => {
    reset(dispatch);
    if (data['validate']) {
      dispatch(startUndefinedMode());
      dispatch(showInfoAlert({
        info: 'Whoops! Something went wrong, please try again with different data.'
      }));
    }
  }
}
