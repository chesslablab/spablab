import boardActionTypes from '../constants/boardActionTypes';
import createInvitationDialogActionTypes from '../constants/createInvitationDialogActionTypes';
import Pgn from '../utils/Pgn';

export const serverListeners = (state, data) => dispatch => {
  dispatch(onPlayfen(state, data));
  dispatch(onPlayfriend(state, data));
};

export const onPlayfen = (state, data) => dispatch => {
  if (data['/playfen']) {
    if (data['/playfen'].legal === false) {
      dispatch({
        type: boardActionTypes.UNDO_MOVE
      });
    } else if (data['/playfen'].legal === Pgn.symbol.CASTLING_SHORT) {
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
          movetext: data['/playfen'].movetext
        }
      });
    }
  }
};

export const onPlayfriend = (state, data) => dispatch => {
  if (data['/start']) {
    dispatch({
      type: createInvitationDialogActionTypes.CREATE_CODE,
      payload: {
        color: data['/start'].color,
        time: 10, // TODO
        code: data['/start'].hash
      }
    });
  }
};
