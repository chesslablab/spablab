import serverActionTypes from '../constants/serverActionTypes';

export const analysis = (ws) => dispatch => {
  return new Promise((resolve, reject) => {
    ws.send('/start analysis');
    ws.onmessage = (res) => resolve(res.data);
    ws.onerror = (err) => {
      dispatch({ type: serverActionTypes.CONNECTION_ERROR });
      reject(err);
    };
  });
};

export const castling = (ws) => dispatch => {
  return new Promise((resolve, reject) => {
    ws.send('/castling');
    ws.onmessage = (res) => resolve(res.data);
    ws.onerror = (err) => {
      dispatch({ type: serverActionTypes.CONNECTION_ERROR });
      reject(err);
    };
  });
};

export const playfen = (ws, fen) => dispatch => {
  return new Promise((resolve, reject) => {
    ws.send(`/playfen "${fen}"`);
    ws.onmessage = (res) => resolve(res.data);
    ws.onerror = (err) => {
      dispatch({ type: serverActionTypes.CONNECTION_ERROR });
      reject(err);
    };
  });
};

export const quit = (ws) => dispatch => {
  return new Promise((resolve, reject) => {
    ws.send('/quit');
    ws.onmessage = (res) => resolve(res.data);
    ws.onerror = (err) => {
      dispatch({ type: serverActionTypes.CONNECTION_ERROR });
      reject(err);
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

export const playfriend = (ws, color, time) => dispatch => {
  return new Promise((resolve, reject) => {
    //  TODO: time
    ws.send(`/start playfriend ${color}`);
    ws.onmessage = (res) => resolve(res.data);
    ws.onerror = (err) => {
      dispatch({ type: serverActionTypes.CONNECTION_ERROR });
      reject(err);
    };
  });
};
