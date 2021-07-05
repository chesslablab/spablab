import boardActionTypes from '../constants/boardActionTypes';
import serverActionTypes from '../constants/serverActionTypes';
import { createCode } from "../actions/createInvitationDialogActions";
import Pgn from '../utils/Pgn';

export const connect = (state, props) => dispatch => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://${props.server.host}:${props.server.port}`);
    ws.onmessage = (res) => {
      // TODO
      // Sync White with Black in playfriend mode
      // console.log(res.data);
      const data = JSON.parse(res.data);
      dispatch(onPlayfen(state, data));
      dispatch(onPlayfriend(state, data));
      resolve(res.data);
    };
    ws.onerror = (err) => {
      dispatch({ type: serverActionTypes.CONNECTION_ERROR });
      reject(err);
    };
    ws.onopen = () => {
      dispatch({ type: serverActionTypes.CONNECTION_ESTABLISHED, payload: { ws: ws } });
      resolve(ws);
    };
  });
};

export const analysis = async (ws) => {
  return await ws.send('/start analysis');
};

export const castling = async (state) => {
  return await state.server.ws.send('/castling');
};

export const playfen = async (state) => {
  return await state.server.ws.send(`/playfen "${state.board.fen}"`);
};

export const quit = async (state) => {
  return await state.server.ws.send('/quit');
};

export const playfriend = async (state, color, time) => {
  return await state.server.ws.send(`/start playfriend ${color}`);
};

export const accept = async (state, id) => {
  return await state.server.ws.send(`/accept "${id}"`);
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
  console.log(data);
  // TODO
  /*
  if (data.id) {
    dispatch(createCode({
      color: 'w',
      time: event.target.elements.time.value,
      code: 'b'
    }));
  }
  */
};
