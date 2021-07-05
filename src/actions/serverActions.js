import serverActionTypes from '../constants/serverActionTypes';;
import { serverListeners } from '../listeners/serverListeners';

export const connect = (state, props) => dispatch => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://${props.server.host}:${props.server.port}`);
    ws.onmessage = (res) => {
      console.log(res.data);
      dispatch(serverListeners(state, JSON.parse(res.data)));
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
