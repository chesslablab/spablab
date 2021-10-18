import alertActionTypes from '../constants/alertActionTypes';
import boardActionTypes from '../constants/boardActionTypes';
import drawAcceptDialogActionTypes from '../constants/drawAcceptDialogActionTypes';
import heuristicPictureDialogActionTypes from '../constants/heuristicPictureDialogActionTypes';
import takebackAcceptDialogActionTypes from '../constants/takebackAcceptDialogActionTypes';
import fenDialogActionTypes from '../constants/fenDialogActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';
import jwt_decode from "jwt-decode";
import store from '../store';
import Pgn from '../utils/Pgn';

export const wsMssgListener = (data) => dispatch => {
  const cmd = Object.keys(data)[0];
  switch (true) {
    case '/takeback' === cmd:
      if (data['/takeback'] === 'propose') {
        dispatch(onTakebackPropose());
      } else if (data['/takeback'] === 'accept') {
        dispatch(onTakebackAccept());
      }
      break;
    case '/draw' === cmd:
      // TODO: Use constant names for draw actions
      if (data['/draw'] === 'propose') {
        dispatch(onDrawPropose());
      } else if (data['/draw'] === 'accept') {
        dispatch(onDrawAccept());
      }
      break;
    case '/start' === cmd:
      if (data['/start'].mode === modeNames.ANALYSIS) {
        dispatch(onStartAnalysis(data));
      } else if (data['/start'].mode === modeNames.LOADFEN) {
        dispatch(onStartLoadfen(data));
      } else if (data['/start'].mode === modeNames.PLAYFRIEND) {
        dispatch(onStartPlayfriend(data));
      }
      break;
    case '/accept' === cmd:
      if (data['/accept'].jwt) {
        dispatch(onAccept(data));
      } else {
        dispatch({
          type: alertActionTypes.INFO_DISPLAY,
          payload: {
            info: 'Invalid invite code.'
          }
        });
      }
      break;
    case '/playfen' === cmd:
      if (store.getState().mode.current === modeNames.PLAYFRIEND) {
        if (store.getState().mode.playfriend.color !== data['/playfen'].turn) {
          dispatch({
            type: boardActionTypes.PLAYFRIEND_MOVE,
            payload: {
              fen: data['/playfen'].fen
            }
          });
        }
      }
      dispatch(onPlayfen(data));
      break;
    case '/piece' === cmd:
      if (data['/piece']) {
        dispatch(onPiece(data));
      }
      break;
    case '/heuristicpicture' === cmd:
      dispatch(onHeuristicPicture(data));
      break;
    case '/fen' === cmd:
      dispatch(onFen(data));
      break;
    case '/undomove' === cmd:
      dispatch(onUndoMove(data));
      break;
    default:
      break;
  }
};

export const onStartAnalysis = (data) => dispatch => {
  dispatch({ type: alertActionTypes.INFO_CLOSE });
  dispatch({ type: modeActionTypes.SET_ANALYSIS });
  dispatch({ type: boardActionTypes.START });
};

export const onStartLoadfen = (data) => dispatch => {
  if (data['/start'].fen) {
    dispatch({ type: alertActionTypes.INFO_CLOSE });
    dispatch({ type: modeActionTypes.SET_LOADFEN });
    dispatch({
      type: boardActionTypes.START_FEN,
      payload: {
        fen: data['/start'].fen
      }
    });
  } else {
    dispatch({
      type: alertActionTypes.INFO_DISPLAY,
      payload: {
        info: 'Invalid FEN.'
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
        color: jwtDecoded.color,
        accepted: false
      }
    }
  });
  if (jwtDecoded.color === Pgn.symbol.BLACK) {
    dispatch({ type: boardActionTypes.FLIP });
  }
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
    if (color === Pgn.symbol.BLACK) {
      dispatch({ type: boardActionTypes.FLIP });
    }
  }
  dispatch({ type: modeActionTypes.ACCEPT_PLAYFRIEND });
  dispatch({ type: alertActionTypes.INFO_CLOSE });
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

export const onPlayfen = (data) => dispatch => {
  const payload = {
    check: data['/playfen'].check,
    mate: data['/playfen'].mate,
    movetext: data['/playfen'].movetext,
    fen: data['/playfen'].fen
  };
  if (data['/playfen'].legal === Pgn.symbol.CASTLING_SHORT) {
    dispatch({
      type: boardActionTypes.CASTLED_SHORT,
      payload: payload
    });
  } else if (data['/playfen'].legal === Pgn.symbol.CASTLING_LONG) {
    dispatch({
      type: boardActionTypes.CASTLED_LONG,
      payload: payload
    });
  } else if (data['/playfen'].legal === true) {
    dispatch({
      type: boardActionTypes.VALID_MOVE,
      payload: payload
    });
  }
  if (data['/playfen'].mate) {
    dispatch({
      type: modeActionTypes.CHECKMATE
    });
  }
};

export const onHeuristicPicture = (data) => dispatch => {
  const payload = {
    dimensions: data['/heuristicpicture'].dimensions,
    balance: data['/heuristicpicture'].balance
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
    type: alertActionTypes.INFO_DISPLAY,
    payload: {
      info: 'Draw offer accepted.'
    }
  });
};

export const onUndoMove = (data) => dispatch => {
  dispatch({
    type: boardActionTypes.UNDO_MOVE,
    payload: data['/undomove']
  });
  dispatch({ type: modeActionTypes.TAKEBACK_DECLINE });
};
