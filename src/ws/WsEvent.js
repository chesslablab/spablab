import jwt_decode from "jwt-decode";
import store from '../app/store';
import Opening from '../common/Opening.js';
import Pgn from '../common/Pgn';
import {
  infoAlertClose,
  infoAlertDisplay
} from '../features/alert/infoAlertSlice';
import {
  drawAcceptDialogOpen
} from '../features/dialog/drawAcceptDialogSlice';
import {
  heuristicsDialogOpen
} from '../features/dialog/heuristicsDialogSlice';
import {
  playOnlineDialogClose,
  playOnlineDialogOpen
} from '../features/dialog/playOnlineDialogSlice';
import {
  progressDialogClose,
  progressDialogOpen
} from '../features/dialog/progressDialogSlice';
import {
  rematchAcceptDialogOpen
} from '../features/dialog/rematchAcceptDialogSlice';
import {
  takebackAcceptDialogOpen
} from '../features/dialog/takebackAcceptDialogSlice';
import {
  gameTableClose,
  gameTableDisplay
} from '../features/table/gameTableSlice';
import {
  openingAnalysisTableClose,
  openingAnalysisTableDisplay
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
  grandmaster
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
  setGrandmaster,
  startLoadFen,
  startLoadPgn,
  setPlay,
  grandmasterMovetext,
  acceptPlay,
  acceptTakeback,
  acceptDraw,
  declineDraw,
  declineTakeback,
  acceptResign,
  rematchAccept,
  declineRematch,
  acceptLeave
} from '../features/modeSlice';
import {
  MODE_ANALYSIS,
  MODE_GRANDMASTER,
  MODE_LOADFEN,
  MODE_LOADPGN,
  MODE_PLAY
} from '../features/modeConstants';
import WsAction from './WsAction';

const reset = (dispatch) => {
  dispatch(resetBar());
  dispatch(openingAnalysisTableClose());
  dispatch(gameTableClose());
  dispatch(infoAlertClose());
  dispatch(goTo({ back: 0 }));
  dispatch(start());
  dispatch(progressDialogClose());
};


export default class WsEvent {
  static onStartAnalysis = (data) => dispatch => {
    reset(dispatch);
    dispatch(startAnalysis({}));
  }

  static onStartGrandmaster = (data) => dispatch => {
    reset(dispatch);
    dispatch(setGrandmaster({
      color: data['/start'].color,
      movetext: null
    }));
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(flip());
    }
  }

  static onStartLoadfen = (data) => dispatch => {
    reset(dispatch);
    if (data['/start'].fen) {
      dispatch(startLoadFen());
      dispatch(startFen({ fen: data['/start'].fen }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(infoAlertDisplay({ info: 'Invalid FEN.' }));
    }
  }

  static onStartLoadpgn = (data) => dispatch => {
    reset(dispatch);
    if (data['/start'].movetext) {
      dispatch(startLoadPgn());
      dispatch(startPgn({
        turn: data['/start'].turn,
        movetext: data['/start'].movetext,
        fen: data['/start'].fen,
        history: data['/start'].history
      }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(infoAlertDisplay({ info: 'Invalid PGN movetext.' }));
    }
  }

  static onStartPlay = (data) => dispatch => {
    reset(dispatch);
    const jwtDecoded = jwt_decode(data['/start'].jwt);
    /*
    dispatch(setPlay({
      play: {
        jwt: data['/start'].jwt,
        jwt_decoded: jwtDecoded,
        hash: data['/start'].hash,
        color: jwtDecoded.color
      }
    }));
    */
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
    dispatch(infoAlertDisplay({ info: 'Waiting for player to join...' }));
    dispatch(start());
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
    dispatch(playOnlineDialogClose());
  }

  static onOnlineGames = (data) => dispatch => {
    dispatch(progressDialogClose());
    dispatch(playOnlineDialogOpen(data['/online_games']));
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
        dispatch(openingAnalysisTableClose());
        let rows = Opening.analysis(payload.movetext);
        if (rows) {
          dispatch(openingAnalysisTableDisplay({ rows: rows }));
        } else {
          dispatch(openingAnalysisTableClose());
        }
      } else if (store.getState().mode.name === MODE_GRANDMASTER) {
        dispatch(progressDialogOpen());
        WsAction.grandmaster(store.getState());
      }
      if (
        store.getState().mode.name === MODE_ANALYSIS ||
        store.getState().mode.name === MODE_LOADPGN ||
        store.getState().mode.name === MODE_LOADFEN ||
        store.getState().mode.name === MODE_GRANDMASTER
      ) {
        WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
      }
    }
  }

  static onHeuristics = (data) => dispatch => {
    dispatch(progressDialogClose());
    dispatch(heuristicsDialogOpen({
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
      dispatch(takebackAcceptDialogOpen());
    }
  }

  static onTakebackAccept = () => dispatch => {
    dispatch(acceptTakeback());
  }

  static onDrawPropose = () => dispatch => {
    if (!store.getState().mode.play.draw) {
      dispatch(drawAcceptDialogOpen());
    }
  }

  static onDrawAccept = () => dispatch => {
    dispatch(acceptDraw());
    dispatch(infoAlertDisplay({ info: 'Draw offer accepted.' }));
  }

  static onDrawDecline = () => dispatch => {
    dispatch(declineDraw());
    dispatch(infoAlertDisplay({ info: 'Draw offer declined.' }));
  }

  static onUndo = (data) => dispatch => {
    dispatch(undo(data['/undo']));
    if (data['/undo'].mode === MODE_GRANDMASTER) {
      dispatch(progressDialogOpen());
      WsAction.grandmaster(store.getState());
      WsAction.grandmaster(store.getState());
    } else if (data['/undo'].mode === MODE_PLAY) {
      dispatch(declineTakeback());
    }
  }

  static onResignAccept = () => dispatch => {
    dispatch(acceptResign());
    dispatch(infoAlertDisplay({ info: 'Chess game resigned.' }));
  }

  static onRematchPropose = () => dispatch => {
    if (!store.getState().mode.play.rematch) {
      dispatch(rematchAcceptDialogOpen());
    }
  }

  static onRematchAccept = () => dispatch => {
    dispatch(rematchAccept());
    dispatch(infoAlertDisplay({ info: 'Rematch accepted.' }));
  }

  static onRematchDecline = () => dispatch => {
    dispatch(declineRematch());
    dispatch(infoAlertDisplay({ info: 'Rematch declined.' }));
  }

  static onLeaveAccept = () => dispatch => {
    dispatch(acceptLeave());
    dispatch(infoAlertDisplay({ info: 'Your opponent left the game.' }));
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

  static onGrandmaster = (data) => dispatch => {
    dispatch(progressDialogClose());
    if (data['/grandmaster']) {
      dispatch(gameTableDisplay({ game: data['/grandmaster'].game }));
      dispatch(grandmaster({
        turn: data['/grandmaster'].state.turn,
        isCheck: data['/grandmaster'].state.isCheck,
        isMate: data['/grandmaster'].state.isMate,
        movetext: data['/grandmaster'].state.movetext,
        fen: data['/grandmaster'].state.fen
      }));
      dispatch(grandmasterMovetext({
        movetext: data['/grandmaster'].state.movetext
      }));
      dispatch(infoAlertClose());
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(gameTableClose());
      dispatch(grandmasterMovetext({ movetext: null }));
      dispatch(infoAlertDisplay({ info: 'This move was not found in the database.' }));
    }
  }

  static onRandomGame = (data) => dispatch => {
    reset(dispatch);
    if (data['/random_game'].movetext) {
      dispatch(startLoadPgn());
      dispatch(startPgn({
        turn: data['/random_game'].turn,
        movetext: data['/random_game'].movetext,
        fen: data['/random_game'].fen,
        history: data['/random_game'].history
      }));
      dispatch(gameTableDisplay({ game: data['/random_game'].game }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(infoAlertDisplay({ info: 'A random game could not be loaded.' }));
    }
  }
}
