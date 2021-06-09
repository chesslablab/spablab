import serverActionTypes from '../constants/serverActionTypes';

export const analysis = (ws) => dispatch => {
  return new Promise((resolve, reject) => {
    ws.send('/start analysis');
    ws.onmessage = (res) => {
      resolve(res.data);
    };
  });
};

export const connect = (host, port) => dispatch => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://${host}:${port}`);
    ws.onopen = () => {
      dispatch({ type: serverActionTypes.CONNECTION_ESTABLISHED, payload: { ws: ws } });
      resolve(ws);
    };
    ws.onerror = (err) => {
      dispatch({ type: serverActionTypes.CONNECTION_ERROR });
      reject(err);
    };
  });
};
