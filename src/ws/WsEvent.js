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
  boardStart,
  boardStartFen,
  boardStartPgn,
  boardFlip,
  boardLegalSqs,
  boardCastledLong,
  boardCastledShort,
  boardValidMove,
  boardUndo,
  boardGrandmaster
} from '../features/boardSlice';
import {
  heuristicsBarReset,
  heuristicsBarUpdate
} from '../features/heuristicsBarSlice';
import {
  historyGoTo
} from '../features/historySlice';
import {
  modeStartAnalysis,
  modeSetGrandmaster,
  modeStartLoadFen,
  modeStartLoadPgn,
  modeSetPlay,
  modeGrandmasterMovetext,
  modePlayAccept,
  modePlayTakebackAccept,
  modePlayDrawAccept,
  modePlayDrawDecline,
  modePlayTakebackDecline,
  modePlayResignAccept,
  modePlayRematchAccept,
  modePlayRematchDecline,
  modePlayLeaveAccept
} from '../features/modeSlice';
import { modeName } from '../features/modeConstant';
import WsAction from './WsAction';

const reset = (dispatch) => {
  dispatch(heuristicsBarReset());
  dispatch(openingAnalysisTableClose());
  dispatch(gameTableClose());
  dispatch(infoAlertClose());
  dispatch(historyGoTo({ back: 0 }));
  dispatch(boardStart());
  dispatch(progressDialogClose());
};


export default class WsEvent {
  static onStartAnalysis = (data) => dispatch => {
    reset(dispatch);
    dispatch(modeStartAnalysis({}));
  }

  static onStartGrandmaster = (data) => dispatch => {
    reset(dispatch);
    dispatch(modeSetGrandmaster({
      color: data['/start'].color,
      movetext: null
    }));
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch(boardFlip());
    }
  }

  static onStartLoadfen = (data) => dispatch => {
    reset(dispatch);
    if (data['/start'].fen) {
      dispatch(modeStartLoadFen());
      dispatch(boardStartFen({ fen: data['/start'].fen }));
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(infoAlertDisplay({ info: 'Invalid FEN.' }));
    }
  }

  static onStartLoadpgn = (data) => dispatch => {
    reset(dispatch);
    if (data['/start'].movetext) {
      dispatch(modeStartLoadPgn());
      dispatch(boardStartPgn({
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
    dispatch(modeSetPlay({
      play: {
        jwt: data['/start'].jwt,
        jwt_decoded: jwtDecoded,
        hash: data['/start'].hash,
        color: jwtDecoded.color
      }
    }));
    */
    dispatch(modeSetPlay({
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
      dispatch(boardFlip());
    }
    dispatch(infoAlertDisplay({ info: 'Waiting for player to join...' }));
    dispatch(boardStart());
  }

  static onAccept = (data) => dispatch => {
    reset(dispatch);
    if (!store.getState().mode.play) {
      const jwtDecoded = jwt_decode(data['/accept'].jwt);
      const color = jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      dispatch(boardStart());
      dispatch(modeSetPlay({
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
      dispatch(boardFlip());
    }
    dispatch(modePlayAccept());
    dispatch(playOnlineDialogClose());
  }

  static onOnlineGames = (data) => dispatch => {
    dispatch(progressDialogClose());
    dispatch(playOnlineDialogOpen(data['/online_games']));
  }

  static onLegalSqs = (data) => dispatch => {
    dispatch(boardLegalSqs({
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
        dispatch(boardCastledLong(payload));
      } else if (data['/play_fen'].pgn === Pgn.symbol.CASTLING_SHORT) {
        dispatch(boardCastledShort(payload));
      } else {
        dispatch(boardValidMove(payload));
      }
      if (store.getState().mode.name === modeName.ANALYSIS) {
        dispatch(openingAnalysisTableClose());
        let rows = Opening.analysis(payload.movetext);
        if (rows) {
          dispatch(openingAnalysisTableDisplay({ rows: rows }));
        } else {
          dispatch(openingAnalysisTableClose());
        }
      } else if (store.getState().mode.name === modeName.GRANDMASTER) {
        dispatch(progressDialogOpen());
        WsAction.grandmaster(store.getState());
      }
      if (
        store.getState().mode.name === modeName.ANALYSIS ||
        store.getState().mode.name === modeName.LOADPGN ||
        store.getState().mode.name === modeName.LOADFEN ||
        store.getState().mode.name === modeName.GRANDMASTER
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
    dispatch(heuristicsBarUpdate({
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
    dispatch(modePlayTakebackAccept());
  }

  static onDrawPropose = () => dispatch => {
    if (!store.getState().mode.play.draw) {
      dispatch(drawAcceptDialogOpen());
    }
  }

  static onDrawAccept = () => dispatch => {
    dispatch(modePlayDrawAccept());
    dispatch(infoAlertDisplay({ info: 'Draw offer accepted.' }));
  }

  static onDrawDecline = () => dispatch => {
    dispatch(modePlayDrawDecline());
    dispatch(infoAlertDisplay({ info: 'Draw offer declined.' }));
  }

  static onUndo = (data) => dispatch => {
    dispatch(boardUndo(data['/undo']));
    if (data['/undo'].mode === modeName.GRANDMASTER) {
      dispatch(progressDialogOpen());
      WsAction.grandmaster(store.getState());
      WsAction.grandmaster(store.getState());
    } else if (data['/undo'].mode === modeName.PLAY) {
      dispatch(modePlayTakebackDecline());
    }
  }

  static onResignAccept = () => dispatch => {
    dispatch(modePlayResignAccept());
    dispatch(infoAlertDisplay({ info: 'Chess game resigned.' }));
  }

  static onRematchPropose = () => dispatch => {
    if (!store.getState().mode.play.rematch) {
      dispatch(rematchAcceptDialogOpen());
    }
  }

  static onRematchAccept = () => dispatch => {
    dispatch(modePlayRematchAccept());
    dispatch(infoAlertDisplay({ info: 'Rematch accepted.' }));
  }

  static onRematchDecline = () => dispatch => {
    dispatch(modePlayRematchDecline());
    dispatch(infoAlertDisplay({ info: 'Rematch declined.' }));
  }

  static onLeaveAccept = () => dispatch => {
    dispatch(modePlayLeaveAccept());
    dispatch(infoAlertDisplay({ info: 'Your opponent left the game.' }));
  }

  static onRestart = (data) => dispatch => {
    const jwtDecoded = jwt_decode(data['/restart'].jwt);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(jwtDecoded.min) * 60);
    dispatch(modeSetPlay({
      color: store.getState().mode.play.color,
      accepted: false
    }));
    dispatch(modeSetPlay({
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
    dispatch(boardStart());
    if (store.getState().mode.play.color === Pgn.symbol.BLACK) {
      dispatch(boardFlip());
    }
  }

  static onGrandmaster = (data) => dispatch => {
    dispatch(progressDialogClose());
    if (data['/grandmaster']) {
      dispatch(gameTableDisplay({ game: data['/grandmaster'].game }));
      dispatch(boardGrandmaster({
        turn: data['/grandmaster'].state.turn,
        isCheck: data['/grandmaster'].state.isCheck,
        isMate: data['/grandmaster'].state.isMate,
        movetext: data['/grandmaster'].state.movetext,
        fen: data['/grandmaster'].state.fen
      }));
      dispatch(modeGrandmasterMovetext({
        movetext: data['/grandmaster'].state.movetext
      }));
      dispatch(infoAlertClose());
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch(gameTableClose());
      dispatch(modeGrandmasterMovetext({ movetext: null }));
      dispatch(infoAlertDisplay({ info: 'This move was not found in the database.' }));
    }
  }

  static onRandomGame = (data) => dispatch => {
    reset(dispatch);
    if (data['/random_game'].movetext) {
      dispatch(modeStartLoadPgn());
      dispatch(boardStartPgn({
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
