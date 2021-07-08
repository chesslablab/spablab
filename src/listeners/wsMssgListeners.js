import boardActionTypes from '../constants/boardActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import modeNames from '../constants/modeNames';
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
      if (store.getState().mode.name === 'playfriend' && store.getState().mode.color !== data['/playfen'].turn
      ) {
        dispatch({ type: boardActionTypes.TOGGLE_TURN });
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
  dispatch({
    type: modeActionTypes.SET,
    payload: {
      current: modeNames.PLAYFRIEND,
      playfriend: {
        jwt: data['/start'].jwt,
        hash: data['/start'].hash,
        created_code: true
      }
    }
  });
};

export const onAccept = (data) => dispatch => {
  if (!store.getState().mode.playfriend.created_code) {
    dispatch({
      type: modeActionTypes.SET,
      payload: {
        current: modeNames.PLAYFRIEND,
        playfriend: {
          jwt: data['/accept'].jwt,
          hash: data['/accept'].hash,
          created_code: false
        }
      }
    });
  }
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
  if (data['/playfen'].legal === Pgn.symbol.CASTLING_SHORT) {
    dispatch({
      type: boardActionTypes.CASTLED_SHORT,
      payload: {
        movetext: data['/playfen'].movetext,
        fen: data['/playfen'].fen
      }
    });
  } else if (data['/playfen'].legal === Pgn.symbol.CASTLING_LONG) {
    dispatch({
      type: boardActionTypes.CASTLED_LONG,
      payload: {
        movetext: data['/playfen'].movetext,
        fen: data['/playfen'].fen
      }
    });
  } else if (data['/playfen'].legal === true) {
    dispatch({
      type: boardActionTypes.VALID_MOVE,
      payload: {
        movetext: data['/playfen'].movetext,
        fen: data['/playfen'].fen
      }
    });
  }
};
