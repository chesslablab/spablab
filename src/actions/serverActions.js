import serverActionTypes from '../constants/serverActionTypes';

export const analysis = (ws) => dispatch => {
  return new Promise((resolve, reject) => {
    ws.send('/start analysis');
    ws.onmessage = (res) => {
      resolve(res.data);
    };
  });
};

export const playfen = (ws, fen) => dispatch => {
  return new Promise((resolve, reject) => {
    ws.send(`/playfen ${fen}`);
    ws.onmessage = (res) => {
      resolve(res.data);
    };
  });
};

export const quit = (ws) => dispatch => {
  return new Promise((resolve, reject) => {
    ws.send('/quit');
    ws.onmessage = (res) => {
      resolve(res.data);
    };
  });
};

export const connect = (ws, host, port) => dispatch => {
  if (!ws) {
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(`ws://${host}:${port}`);
      ws.onerror = (err) => {
        dispatch({ type: serverActionTypes.CONNECTION_ERROR });
        reject(err);
      };
      ws.onopen = () => {
        dispatch({ type: serverActionTypes.CONNECTION_ESTABLISHED, payload: { ws: ws } });
        resolve(ws);
      };
    });
  } else {
    return new Promise((resolve, reject) => {
      ws.close();
      ws.onclose = () => {
        dispatch({ type: serverActionTypes.CONNECTION_CLOSED });
        resolve(ws);
      };
    });
  }
};
