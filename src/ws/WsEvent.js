import infoAlertActionTypes from '../constants/alert/infoAlertActionTypes';
import drawAcceptDialogActionTypes from '../constants/dialog/drawAcceptDialogActionTypes';
import rematchAcceptDialogActionTypes from '../constants/dialog/rematchAcceptDialogActionTypes';
import heuristicsDialogActionTypes from '../constants/dialog/heuristicsDialogActionTypes';
import playOnlineDialogActionTypes from '../constants/dialog/playOnlineDialogActionTypes';
import takebackAcceptDialogActionTypes from '../constants/dialog/takebackAcceptDialogActionTypes';
import progressDialogActionTypes from '../constants/dialog/progressDialogActionTypes';
import chessOpeningAnalysisTableActionTypes from '../constants/table/chessOpeningAnalysisTableActionTypes';
import gameTableActionTypes from '../constants/table/gameTableActionTypes';
import boardActionTypes from '../constants/boardActionTypes';
import heuristicsBarActionTypes from '../constants/heuristicsBarActionTypes';
import historyActionTypes from '../constants/historyActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';
import jwt_decode from "jwt-decode";
import store from '../store';
import Opening from '../utils/Opening.js';
import Pgn from '../utils/Pgn';
import WsAction from '../ws/WsAction';

const reset = (dispatch) => {
  dispatch({ type: heuristicsBarActionTypes.RESET });
  dispatch({ type: chessOpeningAnalysisTableActionTypes.CLOSE });
  dispatch({ type: gameTableActionTypes.CLOSE });
  dispatch({ type: infoAlertActionTypes.CLOSE });
  dispatch({ type: historyActionTypes.GO_TO, payload: { back: 0 }});
  dispatch({ type: boardActionTypes.START });
  dispatch({ type: progressDialogActionTypes.CLOSE });
};


export default class WsEvent {
  static onStartAnalysis = (data) => dispatch => {
    reset(dispatch);
    dispatch({ type: modeActionTypes.SET_ANALYSIS });
  }

  static onStartGrandmaster = (data) => dispatch => {
    reset(dispatch);
    dispatch({
      type: modeActionTypes.SET_GRANDMASTER,
      payload: {
        color: data['/start'].color
      }
    });
    if (data['/start'].color === Pgn.symbol.BLACK) {
      dispatch({ type: boardActionTypes.FLIP });
    }
  }

  static onStartLoadfen = (data) => dispatch => {
    reset(dispatch);
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
    reset(dispatch);
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
    reset(dispatch);
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
    reset(dispatch);
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
    dispatch({ type: modeActionTypes.PLAY_ACCEPT });
    dispatch({ type: playOnlineDialogActionTypes.CLOSE });
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
      } else if (store.getState().mode.current === modeNames.GRANDMASTER) {
        dispatch({ type: progressDialogActionTypes.OPEN });
        WsAction.grandmaster(store.getState());
      }
      if (
        store.getState().mode.current === modeNames.ANALYSIS ||
        store.getState().mode.current === modeNames.LOADPGN ||
        store.getState().mode.current === modeNames.LOADFEN ||
        store.getState().mode.current === modeNames.GRANDMASTER
      ) {
        WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
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
    dispatch({ type: modeActionTypes.PLAY_TAKEBACK_ACCEPT });
  }

  static onDrawPropose = () => dispatch => {
    if (!store.getState().mode.play.draw) {
      dispatch({ type: drawAcceptDialogActionTypes.OPEN });
    }
  }

  static onDrawAccept = () => dispatch => {
    dispatch({ type: modeActionTypes.PLAY_DRAW_ACCEPT });
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Draw offer accepted.'
      }
    });
  }

  static onDrawDecline = () => dispatch => {
    dispatch({ type: modeActionTypes.PLAY_DRAW_DECLINE });
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Draw offer declined.'
      }
    });
  }

  static onUndo = (data) => dispatch => {
    dispatch({
      type: boardActionTypes.UNDO,
      payload: data['/undo']
    });
    if (data['/undo'].mode === modeNames.GRANDMASTER) {
      dispatch({ type: progressDialogActionTypes.OPEN });
      WsAction.grandmaster(store.getState());
      WsAction.grandmaster(store.getState());
    } else if (data['/undo'].mode === modeNames.PLAY) {
      dispatch({ type: modeActionTypes.PLAY_TAKEBACK_DECLINE });
    }
  }

  static onResignAccept = () => dispatch => {
    dispatch({ type: modeActionTypes.PLAY_RESIGN_ACCEPT });
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
    dispatch({ type: modeActionTypes.PLAY_REMATCH_ACCEPT });
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Rematch accepted.'
      }
    });
  }

  static onRematchDecline = () => dispatch => {
    dispatch({ type: modeActionTypes.PLAY_REMATCH_DECLINE });
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Rematch declined.'
      }
    });
  }

  static onLeaveAccept = () => dispatch => {
    dispatch({ type: modeActionTypes.PLAY_LEAVE_ACCEPT });
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

  static onGrandmaster = (data) => dispatch => {
    dispatch({ type: progressDialogActionTypes.CLOSE });
    if (data['/grandmaster']) {
      dispatch({
        type: gameTableActionTypes.DISPLAY,
        payload: {
          game: data['/grandmaster'].game
        }
      });
      dispatch({
        type: boardActionTypes.GRANDMASTER,
        payload: {
          turn: data['/grandmaster'].state.turn,
          isCheck: data['/grandmaster'].state.isCheck,
          isMate: data['/grandmaster'].state.isMate,
          movetext: data['/grandmaster'].state.movetext,
          fen: data['/grandmaster'].state.fen,
        }
      });
      dispatch({
        type: modeActionTypes.GRANDMASTER_MOVETEXT,
        payload: {
          movetext: data['/grandmaster'].state.movetext
        }
      });
      dispatch({ type: infoAlertActionTypes.CLOSE });
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch({ type: gameTableActionTypes.CLOSE });
      dispatch({
        type: modeActionTypes.GRANDMASTER_MOVETEXT,
        payload: {
          movetext: null
        }
      });
      dispatch({
        type: infoAlertActionTypes.DISPLAY,
        payload: {
          info: 'This move was not found in the database.'
        }
      });
    }
  }

  static onRandomGame = (data) => dispatch => {
    reset(dispatch);
    if (data['/random_game'].movetext) {
      dispatch({ type: modeActionTypes.SET_LOADPGN });
      dispatch({
        type: boardActionTypes.START_PGN,
        payload: {
          turn: data['/random_game'].turn,
          movetext: data['/random_game'].movetext,
          fen: data['/random_game'].fen,
          history: data['/random_game'].history
        }
      });
      dispatch({
        type: gameTableActionTypes.DISPLAY,
        payload: {
          game: data['/random_game'].game
        }
      });
      WsAction.heuristicsBar(store.getState(), store.getState().board.fen);
    } else {
      dispatch({
        type: infoAlertActionTypes.DISPLAY,
        payload: {
          info: 'A random game could not be loaded.'
        }
      });
    }
  }
}
