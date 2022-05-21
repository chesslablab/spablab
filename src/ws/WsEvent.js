import infoAlertActionTypes from '../constants/alert/infoAlertActionTypes';
import drawAcceptDialogActionTypes from '../constants/dialog/drawAcceptDialogActionTypes';
import rematchAcceptDialogActionTypes from '../constants/dialog/rematchAcceptDialogActionTypes';
import heuristicsDialogActionTypes from '../constants/dialog/heuristicsDialogActionTypes';
import playOnlineDialogActionTypes from '../constants/dialog/playOnlineDialogActionTypes';
import takebackAcceptDialogActionTypes from '../constants/dialog/takebackAcceptDialogActionTypes';
import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';
import chessOpeningAnalysisTableActionTypes from '../constants/table/chessOpeningAnalysisTableActionTypes';
import boardActionTypes from '../constants/boardActionTypes';
import heuristicsBarActionTypes from '../constants/heuristicsBarActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';
import jwt_decode from "jwt-decode";
import store from '../store';
import Opening from '../utils/Opening.js';
import Pgn from '../utils/Pgn';
import WsAction from '../ws/WsAction';

export default class WsEvent {
  static onStartAnalysis = (data) => dispatch => {
    dispatch({ type: modeActionTypes.SET_ANALYSIS });
    dispatch({ type: boardActionTypes.START });
  }

  static onStartGrandmaster = (data) => dispatch => {
    dispatch({
      type: modeActionTypes.SET_GRANDMASTER,
      payload: {
        color: data['/start'].color
      }
    });
    dispatch({ type: boardActionTypes.START });
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch({ type: boardActionTypes.FLIP });
    }
  }

  static onStartLoadfen = (data) => dispatch => {
    dispatch({ type: progressDialogActionTypes.CLOSE });
    if (data['/start'].fen) {
      dispatch({ type: modeActionTypes.SET_LOADFEN });
      dispatch({
        type: boardActionTypes.START_FEN,
        payload: {
          fen: data['/start'].fen
        }
      });
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch({
        type: infoAlertActionTypes.DISPLAY,
        payload: {
          info: 'Invalid FEN.'
        }
      });
    }
  }

  static onStartLoadpgn = (data) => dispatch => {
    dispatch({ type: progressDialogActionTypes.CLOSE });
    if (data['/start'].movetext) {
      dispatch({ type: modeActionTypes.SET_LOADPGN });
      dispatch({
        type: boardActionTypes.START_PGN,
        payload: {
          turn: data['/start'].turn,
          movetext: data['/start'].movetext,
          fen: data['/start'].fen,
          history: data['/start'].history
        }
      });
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch({
        type: infoAlertActionTypes.DISPLAY,
        payload: {
          info: 'Invalid PGN movetext.'
        }
      });
    }
  }

  static onStartPlay = (data) => dispatch => {
    const jwtDecoded = jwt_decode(data['/start'].jwt);
    dispatch({
      type: modeActionTypes.SET_PLAY,
      payload: {
        current: modeNames.PLAY,
        play: {
          jwt: data['/start'].jwt,
          jwt_decoded: jwtDecoded,
          hash: data['/start'].hash,
          color: jwtDecoded.color
        }
      }
    });
    if (jwtDecoded.color === Pgn.symbol.BLACK) {
      dispatch({ type: boardActionTypes.FLIP });
    }
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Waiting for player to join...'
      }
    });
    dispatch({ type: boardActionTypes.START });
  }

  static onAccept = (data) => dispatch => {
    if (!store.getState().mode.play.color) {
      const jwtDecoded = jwt_decode(data['/accept'].jwt);
      const color = jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
      dispatch({ type: boardActionTypes.START });
      dispatch({
        type: modeActionTypes.SET_PLAY,
        payload: {
          current: modeNames.PLAY,
          play: {
            jwt: data['/accept'].jwt,
            jwt_decoded: jwt_decode(data['/accept'].jwt),
            hash: data['/accept'].hash,
            color: color
          }
        }
      });
    }
    if (store.getState().mode.play.color === Pgn.symbol.BLACK) {
      dispatch({ type: boardActionTypes.FLIP });
    }
    dispatch({ type: modeActionTypes.ACCEPT_PLAY });
    dispatch({ type: infoAlertActionTypes.CLOSE });
  }

  static onOnlineGames = (data) => dispatch => {
    dispatch({ type: progressDialogActionTypes.CLOSE });
    dispatch({
      type: playOnlineDialogActionTypes.OPEN,
      payload: data['/online_games']
    });
  }

  static onLegalSqs = (data) => dispatch => {
    dispatch({
      type: boardActionTypes.LEGAL_SQS,
      payload: {
        piece: data['/legal_sqs'].identity,
        position: data['/legal_sqs'].position,
        sqs: data['/legal_sqs'].sqs,
        en_passant: data['/legal_sqs'].enPassant ? data['/legal_sqs'].enPassant : ''
      }
    });
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
        dispatch({
          type: boardActionTypes.CASTLED_LONG,
          payload: payload
        });
      } else if (data['/play_fen'].pgn === Pgn.symbol.CASTLING_SHORT) {
        dispatch({
          type: boardActionTypes.CASTLED_SHORT,
          payload: payload
        });
      } else {
        dispatch({
          type: boardActionTypes.VALID_MOVE,
          payload: payload
        });
      }
      if (store.getState().mode.current === modeNames.ANALYSIS ||
        store.getState().mode.current === modeNames.LOADPGN
      ) {
        WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
      }
      if (store.getState().mode.current === modeNames.LOADFEN) {
        WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
      }
      if (store.getState().mode.current === modeNames.ANALYSIS) {
        dispatch({ type: chessOpeningAnalysisTableActionTypes.CLOSE });
        let rows = Opening.analysis(payload.movetext);
        if (rows) {
          dispatch({
            type: chessOpeningAnalysisTableActionTypes.DISPLAY,
            payload: {
              rows: rows
            }
          });
        } else {
          dispatch({ type: chessOpeningAnalysisTableActionTypes.CLOSE });
        }
      }
    }
  }

  static onHeuristics = (data) => dispatch => {
    dispatch({ type: progressDialogActionTypes.CLOSE });
    dispatch({
      type: heuristicsDialogActionTypes.OPEN,
      payload: {
        dimensions: data['/heuristics'].dimensions,
        balance: data['/heuristics'].balance
      }
    });
  }

  static onHeuristicsBar = (data) => dispatch => {
    dispatch({
      type: heuristicsBarActionTypes.UPDATE,
      payload: {
        dimensions: data['/heuristics_bar'].dimensions,
        balance: data['/heuristics_bar'].balance
      }
    });
  }

  static onTakebackPropose = () => dispatch => {
    if (!store.getState().mode.play.takeback) {
      dispatch({ type: takebackAcceptDialogActionTypes.OPEN });
    }
  }

  static onTakebackAccept = () => dispatch => {
    dispatch({ type: modeActionTypes.TAKEBACK_ACCEPT });
  }

  static onDrawPropose = () => dispatch => {
    if (!store.getState().mode.play.draw) {
      dispatch({ type: drawAcceptDialogActionTypes.OPEN });
    }
  }

  static onDrawAccept = () => dispatch => {
    dispatch({ type: modeActionTypes.DRAW_ACCEPT });
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Draw offer accepted.'
      }
    });
  }

  static onDrawDecline = () => dispatch => {
    dispatch({ type: modeActionTypes.DRAW_DECLINE });
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Draw offer declined.'
      }
    });
  }

  static onUndoMove = (data) => dispatch => {
    dispatch({
      type: boardActionTypes.UNDO_MOVE,
      payload: data['/undo_move']
    });
    dispatch({ type: modeActionTypes.TAKEBACK_DECLINE });
  }

  static onResignAccept = () => dispatch => {
    dispatch({ type: modeActionTypes.RESIGN_ACCEPT });
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Chess game resigned.'
      }
    });
  }

  static onRematchPropose = () => dispatch => {
    if (!store.getState().mode.play.rematch) {
      dispatch({ type: rematchAcceptDialogActionTypes.OPEN });
    }
  }

  static onRematchAccept = () => dispatch => {
    dispatch({ type: modeActionTypes.REMATCH_ACCEPT });
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Rematch accepted.'
      }
    });
  }

  static onRematchDecline = () => dispatch => {
    dispatch({ type: modeActionTypes.REMATCH_DECLINE });
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Rematch declined.'
      }
    });
  }

  static onLeaveAccept = () => dispatch => {
    dispatch({ type: modeActionTypes.LEAVE_ACCEPT });
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Your opponent left the game.'
      }
    });
  }

  static onRestart = (data) => dispatch => {
    const jwtDecoded = jwt_decode(data['/restart'].jwt);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(jwtDecoded.min) * 60);
    dispatch({
      type: modeActionTypes.SET_PLAY,
      payload: {
        current: modeNames.PLAY,
        play: {
          jwt: data['/restart'].jwt,
          jwt_decoded: jwtDecoded,
          hash: data['/restart'].hash,
          color: store.getState().mode.play.color,
          takeback: null,
          draw: null,
          resign: null,
          rematch: null,
          timer: {
            expiry_timestamp: expiryTimestamp,
            over: null
          }
        }
      }
    });
    dispatch({ type: boardActionTypes.START });
    if (store.getState().mode.play.color === Pgn.symbol.BLACK) {
      dispatch({ type: boardActionTypes.FLIP });
    }
  }

  static onResponse = (data) => dispatch => {
    if (data['/response']) {
      dispatch({
        type: infoAlertActionTypes.DISPLAY,
        payload: {
          info: 'Awesome! This is a good move.'
        }
      });
      dispatch({
        type: boardActionTypes.RESPONSE,
        payload: {
          turn: data['/response'].turn,
          isCheck: data['/response'].isCheck,
          isMate: data['/response'].isMate,
          movetext: data['/response'].movetext,
          fen: data['/response'].fen,
        }
      });
    } else {
      dispatch({
        type: infoAlertActionTypes.DISPLAY,
        payload: {
          info: 'Hmm. This line was not found in the database.'
        }
      });
    }
  }
}
