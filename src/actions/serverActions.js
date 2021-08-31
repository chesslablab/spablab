import serverActionTypes from '../constants/serverActionTypes';
import { wsMssgListeners } from '../listeners/wsMssgListeners';

export const wsConnect = (state, props) => dispatch => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`${props.server.prot}://${props.server.host}:${props.server.port}`);
    ws.onmessage = (res) => {
      dispatch(wsMssgListeners(JSON.parse(res.data)));
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

export const wsMssgStartAnalysis = async (ws) => {
  return await ws.send('/start analysis');
};

export const wsMssgStartLoadFen = async (state, string) => {
  return await state.server.ws.send(`/start fen ${string}`);
};

export const wsMssgStartPlayfriend = async (state, color, time) => {
  return await state.server.ws.send(`/start playfriend ${color} ${time}`);
};

export const wsMssgPlayfen = async (state) => {
  return await state.server.ws.send(`/playfen "${state.board.fen}"`);
};

export const wsMssgQuit = async (state) => {
  return await state.server.ws.send('/quit');
};

export const wsMssgAccept = async (state, hash) => {
  return await state.server.ws.send(`/accept ${hash}`);
};

export const wsMssgPiece = async (state, algebraic) => {
  return await state.server.ws.send(`/piece ${algebraic}`);
};

export const wsMssgHeuristicpicture = async (state) => {
  return await state.server.ws.send(`/heuristicpicture`);
};
