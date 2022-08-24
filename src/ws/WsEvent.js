import jwt_decode from "jwt-decode";
import store from '../app/store';
import Pgn from '../common/Pgn';
import Dispatcher from '../common/Dispatcher';
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
  refreshPlayOnlineDialog
} from '../features/dialog/playOnlineDialogSlice';
import {
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

import * as board from '../features/boardSlice';
import * as mode from '../features/modeSlice';

import {
  MODE_ANALYSIS,
  MODE_GM,
  MODE_PLAY,
  MODE_STOCKFISH
} from '../features/modeConstants';
import WsAction from './WsAction';

export default class WsEvent {
  static onStartAnalysis = () => dispatch => {
    dispatch(mode.startAnalysis({}));
  }

  static onStartGm = (data) => dispatch => {
    dispatch(mode.setGm({
      color: data['/start'].color,
      movetext: null
    }));
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
      WsAction.gm(store.getState());
    }
  }

  static onStartFen = (data) => dispatch => {
    if (data['/start'].fen) {
      dispatch(mode.startFen());
      dispatch(board.startFen({ fen: data['/start'].fen }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(mode.startUndefined());
      dispatch(showInfoAlert({ info: 'Invalid FEN, please try again with different data.' }));
    }
  }

  static onStartPgn = (data) => dispatch => {
    if (data['/start'].movetext) {
      dispatch(mode.startPgn());
      dispatch(board.startPgn({
        turn: data['/start'].turn,
        movetext: data['/start'].movetext,
        fen: data['/start'].fen,
        history: data['/start'].history
      }));
      Dispatcher.openingAnalysisBySameMovetext(dispatch, data['/start'].movetext);
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(mode.startUndefined());
      dispatch(showInfoAlert({ info: 'Invalid PGN movetext, please try again with different data.' }));
    }
  }

  static onStartPlay = (data) => dispatch => {
    Dispatcher.initGui(dispatch);
    const jwtDecoded = jwt_decode(data['/start'].jwt);
    dispatch(mode.setPlay({
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
      dispatch(board.flip());
    }
    dispatch(showInfoAlert({ info: 'Waiting for player to join...' }));
    dispatch(board.start());
  }

  static onStartStockfishByColor = (data) => dispatch => {
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
      WsAction.stockfish(store.getState());
    }
  }

  static onStartStockfishByFen = (data) => dispatch => {
    dispatch(board.startFen({ fen: data['/start'].fen }));
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
    }
    WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
  }

  static onAccept = (data) => dispatch => {
    Dispatcher.initGui(dispatch);
    if (data['/accept'].jwt) {
      if (!store.getState().mode.play) {
        const jwtDecoded = jwt_decode(data['/accept'].jwt);
        const color = jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
        dispatch(board.start());
        dispatch(mode.setPlay({
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
        dispatch(board.flip());
      }
      dispatch(mode.acceptPlay());
      dispatch(closePlayOnlineDialog());
    } else {
      dispatch(mode.startUndefined());
      dispatch(showInfoAlert({ info: 'Invalid invite code, please try again with different data.' }));
    }
  }

  static onOnlineGames = (data) => dispatch => {
    dispatch(refreshPlayOnlineDialog(data['/online_games']));
  }

  static onLegalSqs = (data) => dispatch => {
    dispatch(board.legalSqs({
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
        dispatch(board.castleLong(payload));
      } else if (data['/play_fen'].pgn === Pgn.symbol.CASTLING_SHORT) {
        dispatch(board.castleShort(payload));
      } else {
        dispatch(board.validMove(payload));
      }
      if (store.getState().mode.name === MODE_ANALYSIS) {
        Dispatcher.openingAnalysisByMovetext(dispatch, payload.movetext);
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
    dispatch(mode.acceptTakeback());
  }

  static onDrawPropose = () => dispatch => {
    if (!store.getState().mode.play.draw) {
      dispatch(openAcceptDrawDialog());
    }
  }

  static onDrawAccept = () => dispatch => {
    dispatch(mode.acceptDraw());
    dispatch(showInfoAlert({ info: 'Draw offer accepted.' }));
  }

  static onDrawDecline = () => dispatch => {
    dispatch(mode.declineDraw());
    dispatch(showInfoAlert({ info: 'Draw offer declined.' }));
  }

  static onUndo = (data) => dispatch => {
    dispatch(board.undo(data['/undo']));
    if (data['/undo'].mode === MODE_GM) {
      dispatch(openProgressDialog());
      WsAction.gm(store.getState());
      WsAction.gm(store.getState());
    } else if (data['/undo'].mode === MODE_PLAY) {
      dispatch(mode.declineTakeback());
    } else if (data['/undo'].mode === MODE_ANALYSIS) {
      Dispatcher.openingAnalysisByMovetext(dispatch, data['/undo'].movetext);
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    }
  }

  static onResignAccept = () => dispatch => {
    dispatch(mode.acceptResign());
    dispatch(showInfoAlert({ info: 'Chess game resigned.' }));
  }

  static onRematchPropose = () => dispatch => {
    if (!store.getState().mode.play.rematch) {
      dispatch(openRematchAcceptDialog());
    }
  }

  static onRematchAccept = () => dispatch => {
    dispatch(mode.acceptRematch());
    dispatch(showInfoAlert({ info: 'Rematch accepted.' }));
  }

  static onRematchDecline = () => dispatch => {
    dispatch(mode.declineRematch());
    dispatch(showInfoAlert({ info: 'Rematch declined.' }));
  }

  static onLeaveAccept = () => dispatch => {
    dispatch(mode.acceptLeave());
    dispatch(showInfoAlert({ info: 'Your opponent left the game.' }));
  }

  static onRestart = (data) => dispatch => {
    const jwtDecoded = jwt_decode(data['/restart'].jwt);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(jwtDecoded.min) * 60);
    dispatch(mode.setPlay({
      color: store.getState().mode.play.color,
      accepted: false
    }));
    dispatch(mode.setPlay({
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
    dispatch(board.start());
    if (store.getState().mode.play.color === Pgn.symbol.BLACK) {
      dispatch(board.flip());
    }
  }

  static onGm = (data) => dispatch => {
    if (data['/gm']) {
      dispatch(showGameTable({ game: data['/gm'].game }));
      dispatch(board.gm({
        turn: data['/gm'].state.turn,
        isCheck: data['/gm'].state.isCheck,
        isMate: data['/gm'].state.isMate,
        movetext: data['/gm'].state.movetext,
        fen: data['/gm'].state.fen
      }));
      dispatch(mode.gmMovetext({
        movetext: data['/gm'].state.movetext
      }));
      dispatch(closeInfoAlert());
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(closeGameTable());
      dispatch(mode.gmMovetext({ movetext: null }));
      dispatch(showInfoAlert({ info: 'This move was not found in the database.' }));
    }
  }

  static onRandomCheckmate = (data) => dispatch => {
    if (data['/random_checkmate'].fen) {
      dispatch(mode.setStockfish({
        color: data['/random_checkmate'].turn,
        options: {
          "Skill Level": 20
        },
        params: {
          "depth": 12
        }
      }));
      WsAction.startStockfishByFen(store.getState(), data['/random_checkmate'].fen);
    } else {
      dispatch(mode.startUndefined());
      dispatch(showInfoAlert({ info: 'Whoops! A random checkmate could not be loaded.' }));
    }
  }

  static onRandomGame = (data) => dispatch => {
    if (data['/random_game'].movetext) {
      dispatch(mode.startPgn());
      dispatch(board.startPgn({
        turn: data['/random_game'].turn,
        movetext: data['/random_game'].movetext,
        fen: data['/random_game'].fen,
        history: data['/random_game'].history
      }));
      dispatch(showGameTable({ game: data['/random_game'].game }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(mode.startUndefined());
      dispatch(showInfoAlert({ info: 'Whoops! A random game could not be loaded.' }));
    }
  }

  static onStockfish = (data) => dispatch => {
    if (data['/stockfish']) {
      dispatch(board.gm({
        turn: data['/stockfish'].state.turn,
        isCheck: data['/stockfish'].state.isCheck,
        isMate: data['/stockfish'].state.isMate,
        movetext: data['/stockfish'].state.movetext,
        fen: data['/stockfish'].state.fen
      }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
      Dispatcher.openingAnalysisByMovetext(dispatch, data['/stockfish'].state.movetext);
    }
  }

  static onValidate = (data) => dispatch => {
    Dispatcher.initGui(dispatch);
    if (data['validate']) {
      dispatch(mode.startUndefined());
      dispatch(showInfoAlert({
        info: 'Whoops! Something went wrong, please try again with different data.'
      }));
    }
  }
}
