import { wsMssgResponse } from '../actions/serverActions';
import chessOpeningAnalysisAjaxLoaderActionTypes from '../constants/ajaxLoader/chessOpeningAnalysisAjaxLoaderActionTypes';
import chessOpeningAnalysisAlertActionTypes from '../constants/alert/chessOpeningAnalysisAlertActionTypes';
import infoAlertActionTypes from '../constants/alert/infoAlertActionTypes';
import boardActionTypes from '../constants/boardActionTypes';
import drawAcceptDialogActionTypes from '../constants/dialog/drawAcceptDialogActionTypes';
import rematchAcceptDialogActionTypes from '../constants/dialog/rematchAcceptDialogActionTypes';
import heuristicPictureDialogActionTypes from '../constants/dialog/heuristicPictureDialogActionTypes';
import takebackAcceptDialogActionTypes from '../constants/dialog/takebackAcceptDialogActionTypes';
import fenDialogActionTypes from '../constants/dialog/fenDialogActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';
import jwt_decode from "jwt-decode";
import store from '../store';
import Pgn from '../utils/Pgn';
import Wording from '../utils/Wording.js';

export const wsMssgListener = (props, data) => dispatch => {
  const cmd = Object.keys(data)[0];
  switch (true) {
    case '/takeback' === cmd:
      if (data['/takeback'] === Wording.verb.PROPOSE.toLowerCase()) {
        dispatch(onTakebackPropose());
      } else if (data['/takeback'] ===  Wording.verb.ACCEPT.toLowerCase()) {
        dispatch(onTakebackAccept());
      }
      break;
    case '/draw' === cmd:
      if (data['/draw'] === Wording.verb.PROPOSE.toLowerCase()) {
        dispatch(onDrawPropose());
      } else if (data['/draw'] === Wording.verb.ACCEPT.toLowerCase()) {
        dispatch(onDrawAccept());
      } else if (data['/draw'] === Wording.verb.DECLINE.toLowerCase()) {
        dispatch(onDrawDecline());
      }
      break;
    case '/start' === cmd:
      if (data['/start'].mode === modeNames.ANALYSIS) {
        dispatch(onStartAnalysis(data));
      } else if (data['/start'].mode === modeNames.GRANDMASTER) {
        dispatch(onStartGrandmaster(data));
      } else if (data['/start'].mode === modeNames.LOADFEN) {
        dispatch(onStartLoadfen(data));
      } else if (data['/start'].mode === modeNames.LOADPGN) {
        dispatch(onStartLoadpgn(data));
      } else if (data['/start'].mode === modeNames.PLAYFRIEND) {
        dispatch(onStartPlayfriend(data));
      }
      break;
    case '/accept' === cmd:
      if (data['/accept'].jwt) {
        dispatch(onAccept(data));
      } else {
        dispatch({
          type: infoAlertActionTypes.DISPLAY,
          payload: {
            info: 'Invalid invite code.'
          }
        });
      }
      break;
    case '/play_fen' === cmd:
      if (store.getState().mode.current === modeNames.PLAYFRIEND) {
        if (store.getState().mode.playfriend.color !== data['/play_fen'].turn) {
          dispatch({
            type: boardActionTypes.PLAYFRIEND_MOVE,
            payload: {
              fen: data['/play_fen'].fen
            }
          });
        }
      }
      dispatch(onPlayfen(props, data));
      if (store.getState().mode.current === modeNames.GRANDMASTER) {
        wsMssgResponse(store.getState());
      }
      break;
    case '/piece' === cmd:
      if (data['/piece']) {
        dispatch(onPiece(data));
      }
      break;
    case '/heuristic_picture' === cmd:
      dispatch(onHeuristicPicture(data));
      break;
    case '/fen' === cmd:
      dispatch(onFen(data));
      break;
    case '/undo_move' === cmd:
      dispatch(onUndoMove(data));
      break;
    case '/resign' === cmd:
      if (data['/resign'] === Wording.verb.ACCEPT.toLowerCase()) {
        dispatch(onResignAccept());
      }
      break;
    case '/rematch' === cmd:
      if (data['/rematch'] === Wording.verb.PROPOSE.toLowerCase()) {
        dispatch(onRematchPropose());
      } else if (data['/rematch'] === Wording.verb.ACCEPT.toLowerCase()) {
        dispatch(onRematchAccept());
      } else if (data['/rematch'] === Wording.verb.DECLINE.toLowerCase()) {
        dispatch(onRematchDecline());
      }
      break;
    case '/restart' === cmd:
      dispatch(onRestart(data));
      break;
    case '/response' === cmd:
      dispatch(onResponse(data));
      break;
    default:
      break;
  }
};

export const onStartAnalysis = (data) => dispatch => {
  dispatch({ type: modeActionTypes.SET_ANALYSIS });
  dispatch({ type: boardActionTypes.START });
};

export const onStartGrandmaster = (data) => dispatch => {
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
};

export const onStartLoadfen = (data) => dispatch => {
  if (data['/start'].fen) {
    dispatch({ type: modeActionTypes.SET_LOADFEN });
    dispatch({
      type: boardActionTypes.START_FEN,
      payload: {
        fen: data['/start'].fen
      }
    });
  } else {
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Invalid FEN.'
      }
    });
  }
};

export const onStartLoadpgn = (data) => dispatch => {
  if (data['/start'].movetext) {
    dispatch({ type: modeActionTypes.SET_LOADPGN });
    dispatch({
      type: boardActionTypes.START_PGN,
      payload: {
        turn: data['/start'].turn,
        movetext: data['/start'].movetext,
        history: data['/start'].history
      }
    });
  } else {
    dispatch({
      type: infoAlertActionTypes.DISPLAY,
      payload: {
        info: 'Invalid PGN movetext.'
      }
    });
  }
};

export const onStartPlayfriend = (data) => dispatch => {
  const jwtDecoded = jwt_decode(data['/start'].jwt);
  dispatch({
    type: modeActionTypes.SET_PLAYFRIEND,
    payload: {
      current: modeNames.PLAYFRIEND,
      playfriend: {
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
      info: 'Waiting for friend to accept invitation...'
    }
  });
  dispatch({ type: boardActionTypes.START });
};

export const onAccept = (data) => dispatch => {
  if (!store.getState().mode.playfriend.color) {
    const jwtDecoded = jwt_decode(data['/accept'].jwt);
    const color = jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
    dispatch({ type: boardActionTypes.START });
    dispatch({
      type: modeActionTypes.SET_PLAYFRIEND,
      payload: {
        current: modeNames.PLAYFRIEND,
        playfriend: {
          jwt: data['/accept'].jwt,
          jwt_decoded: jwt_decode(data['/accept'].jwt),
          hash: data['/accept'].hash,
          color: color
        }
      }
    });
  }
  if (store.getState().mode.playfriend.color === Pgn.symbol.BLACK) {
    dispatch({ type: boardActionTypes.FLIP });
  }
  dispatch({ type: modeActionTypes.ACCEPT_PLAYFRIEND });
  dispatch({ type: infoAlertActionTypes.CLOSE });
};

export const onPiece = (data) => dispatch => {
  const payload = {
    piece: data['/piece'].identity,
    position: data['/piece'].position,
    moves: data['/piece'].moves
  };
  if (data['/piece'].enPassant) {
    payload.en_passant = data['/piece'].enPassant;
  }
  dispatch({
    type: boardActionTypes.LEGAL_MOVES,
    payload: payload
  });
};

export const onPlayfen = (props, data) => dispatch => {
  const payload = {
    check: data['/play_fen'].check,
    mate: data['/play_fen'].mate,
    movetext: data['/play_fen'].movetext,
    fen: data['/play_fen'].fen
  };
  if (
    data['/play_fen'].legal === Pgn.symbol.CASTLING_SHORT ||
    data['/play_fen'].legal === Pgn.symbol.CASTLING_LONG ||
    data['/play_fen'].legal === true
  ) {
    if (data['/play_fen'].legal === Pgn.symbol.CASTLING_SHORT) {
      dispatch({
        type: boardActionTypes.CASTLED_SHORT,
        payload: payload
      });
    } else if (data['/play_fen'].legal === Pgn.symbol.CASTLING_LONG) {
      dispatch({
        type: boardActionTypes.CASTLED_LONG,
        payload: payload
      });
    } else {
      dispatch({
        type: boardActionTypes.VALID_MOVE,
        payload: payload
      });
    }
    if (store.getState().mode.current === modeNames.ANALYSIS) {
      dispatch({ type: chessOpeningAnalysisAlertActionTypes.CLOSE });
      dispatch({ type: chessOpeningAnalysisAjaxLoaderActionTypes.SHOW });
      fetch(`${props.api.prot}://${props.api.host}:${props.api.port}/api/opening`, {
        method: 'POST',
        body: JSON.stringify({ movetext: payload.movetext })
      })
      .then(res => res.json())
      .then(res => {
        let info = '';
        res.forEach(item => info += `${item.eco}, ${item.name}` + '\n');
        if (info) {
          dispatch({
            type: chessOpeningAnalysisAlertActionTypes.DISPLAY,
            payload: {
              info: info
            }
          });
        } else {
          dispatch({ type: chessOpeningAnalysisAlertActionTypes.CLOSE });
        }
      })
      .finally(() => {
        dispatch({ type: chessOpeningAnalysisAjaxLoaderActionTypes.HIDE });
      });
    }
  }
};

export const onHeuristicPicture = (data) => dispatch => {
  const payload = {
    dimensions: data['/heuristic_picture'].dimensions,
    balance: data['/heuristic_picture'].balance
  };
  dispatch({
    type: heuristicPictureDialogActionTypes.OPEN,
    payload: payload
  });
};

export const onFen = (data) => dispatch => {
  const payload = {
    fen: data['/fen']
  };
  dispatch({
    type: fenDialogActionTypes.SET,
    payload: payload
  });
};

export const onTakebackPropose = () => dispatch => {
  if (!store.getState().mode.playfriend.takeback) {
    dispatch({ type: takebackAcceptDialogActionTypes.OPEN });
  }
};

export const onTakebackAccept = () => dispatch => {
  dispatch({ type: modeActionTypes.TAKEBACK_ACCEPT });
};

export const onDrawPropose = () => dispatch => {
  if (!store.getState().mode.playfriend.draw) {
    dispatch({ type: drawAcceptDialogActionTypes.OPEN });
  }
};

export const onDrawAccept = () => dispatch => {
  dispatch({ type: modeActionTypes.DRAW_ACCEPT });
  dispatch({
    type: infoAlertActionTypes.DISPLAY,
    payload: {
      info: 'Draw offer accepted.'
    }
  });
};

export const onDrawDecline = () => dispatch => {
  dispatch({ type: modeActionTypes.DRAW_DECLINE });
  dispatch({
    type: infoAlertActionTypes.DISPLAY,
    payload: {
      info: 'Draw offer declined.'
    }
  });
};

export const onUndoMove = (data) => dispatch => {
  dispatch({
    type: boardActionTypes.UNDO_MOVE,
    payload: data['/undo_move']
  });
  dispatch({ type: modeActionTypes.TAKEBACK_DECLINE });
};

export const onResignAccept = () => dispatch => {
  dispatch({ type: modeActionTypes.RESIGN_ACCEPT });
  dispatch({
    type: infoAlertActionTypes.DISPLAY,
    payload: {
      info: 'Chess game resigned.'
    }
  });
};

export const onRematchPropose = () => dispatch => {
  if (!store.getState().mode.playfriend.rematch) {
    dispatch({ type: rematchAcceptDialogActionTypes.OPEN });
  }
};

export const onRematchAccept = () => dispatch => {
  dispatch({ type: modeActionTypes.REMATCH_ACCEPT });
  dispatch({
    type: infoAlertActionTypes.DISPLAY,
    payload: {
      info: 'Rematch accepted.'
    }
  });
};

export const onRematchDecline = () => dispatch => {
  dispatch({ type: modeActionTypes.REMATCH_DECLINE });
  dispatch({
    type: infoAlertActionTypes.DISPLAY,
    payload: {
      info: 'Rematch declined.'
    }
  });
};

export const onRestart = (data) => dispatch => {
  const jwtDecoded = jwt_decode(data['/restart'].jwt);
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + parseInt(jwtDecoded.min) * 60);
  dispatch({
    type: modeActionTypes.SET_PLAYFRIEND,
    payload: {
      current: modeNames.PLAYFRIEND,
      playfriend: {
        jwt: data['/restart'].jwt,
        jwt_decoded: jwtDecoded,
        hash: data['/restart'].hash,
        color: store.getState().mode.playfriend.color,
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
  if (store.getState().mode.playfriend.color === Pgn.symbol.BLACK) {
    dispatch({ type: boardActionTypes.FLIP });
  }
};

export const onResponse = (data) => dispatch => {
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
        check: data['/response'].check,
        mate: data['/response'].mate,
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
};
