import boardActionTypes from '../constants/boardActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';
import jwt_decode from "jwt-decode";
import store from '../store';
import Pgn from '../utils/Pgn';

export const wsMssgListeners = (data) => dispatch => {
  const cmd = Object.keys(data)[0];
  switch (true) {
    case '/start' === cmd && modeNames.PLAYFRIEND === data['/start'].mode:
      dispatch(onStartPlayfriend(data));
      break;
    case '/accept' === cmd:
      dispatch(onAccept(data));
      break;
    case '/playfen' === cmd:
      if (modeNames.PLAYFRIEND === store.getState().mode.current) {
        if (store.getState().mode.playfriend.color !== data['/playfen'].turn) {
          dispatch({ type: boardActionTypes.TOGGLE_TURN });
        }
      }
      dispatch(onPlayfen(data));
      break;
    case '/piece' === cmd:
      dispatch(onPiece(data));
      break;
    default:
      break;
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
};

export const onAccept = (data) => dispatch => {
  if (!store.getState().mode.playfriend.color) {
    const jwtDecoded = jwt_decode(data['/accept'].jwt);
    const color = jwtDecoded.color === Pgn.symbol.WHITE ? Pgn.symbol.BLACK : Pgn.symbol.WHITE;
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
};

export const onPiece = (data) => dispatch => {
  dispatch({
    type: boardActionTypes.LEGAL_MOVES,
    payload: {
      piece: data['/piece'].identity,
      position: data['/piece'].position,
      moves: data['/piece'].moves
    }
  });
};

export const onPlayfen = (data) => dispatch => {
  const payload = {
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
  const isLegal = data['/playfen'].legal === Pgn.symbol.CASTLING_SHORT ||
    data['/playfen'].legal === Pgn.symbol.CASTLING_LONG ||
    data['/playfen'].legal === true;
  if (isLegal) {
    if (store.getState().mode.playfriend.color !== data['/playfen'].turn) {
      dispatch({
        type: boardActionTypes.PLAYFRIEND_MOVE,
        payload: payload
      });
    }
  }
};
