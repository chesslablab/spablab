import boardActionTypes from '../constants/boardActionTypes';
import historyActionTypes from '../constants/historyActionTypes';
import { playfen } from '../actions/serverActions';

export const start = (payload) => dispatch => {
  dispatch({
    type: historyActionTypes.GO_TO_BEGINNING,
    payload: payload
  });
  dispatch({
    type: historyActionTypes.GO_TO_END
  });
  dispatch({
    type: boardActionTypes.START
  });
};

export const pick = (payload) => dispatch => {
  dispatch({
    type: boardActionTypes.PICK_PIECE,
    payload: payload
  });
};

export const leave = (payload) => dispatch => {
  dispatch({
    type: boardActionTypes.LEAVE_PIECE,
    payload: payload
  });
};

export const undo = () => ({
  type: boardActionTypes.UNDO
});

export const browseHistory = () => ({
  type: boardActionTypes.BROWSE_HISTORY
});

export const validateMove = (state) => dispatch => {
  if (!state.board.picked && state.board.fen) {
    dispatch({
      type: boardActionTypes.VALIDATE_MOVE
    });
    return new Promise((resolve, reject) => {
      dispatch(playfen(state.server.ws, state.board.fen)).then((data) => {
        const playfen = JSON.parse(data).playfen;
        if (!playfen.legal) {
          dispatch({
            type: boardActionTypes.UNDO
          });
        }
        resolve(true);
      }).catch(err => {
        dispatch({ type: serverActionTypes.CONNECTION_ERROR });
        reject(err);
      });
    });
  }
};
