import boardActionTypes from '../constants/boardActionTypes';
import createInvitationDialogActionTypes from '../constants/createInvitationDialogActionTypes';
import modeActionTypes from '../constants/modeActionTypes';
import store from '../store';
import Pgn from '../utils/Pgn';

export const wsMssgListeners = (data) => dispatch => {
  switch (Object.keys(data)[0]) {
    case '/accept':
      dispatch(onAccept(data));
      break;
    case '/playfen':
      if (store.getState().mode.name === 'playfriend' && store.getState().mode.color !== data['/playfen'].turn
      ) {
        dispatch({ type: boardActionTypes.TOGGLE_TURN });
      }
      dispatch(onPlayfen(data));
      break;
    case '/piece':
      dispatch(onPiece(data));
      break;
    case '/start':
      dispatch(onPlayfriend(data));
      break;
    default:
      break;
  }
};

export const onAccept = (data) => dispatch => {
  if (!store.getState().mode.created_code) {
    dispatch({
      type: modeActionTypes.SET,
      payload: {
        name: 'playfriend',
        color: data['/accept'].color,
        time: 10, // TODO: data['/accept'].time
        created_code: false
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
  }
};

export const onPlayfriend = (data) => dispatch => {
  dispatch({
    type: createInvitationDialogActionTypes.CREATE_CODE,
    payload: {
      color: data['/start'].color,
      time: 10, // TODO
      code: data['/start'].hash
    }
  });
};
