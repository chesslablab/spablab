import serverActionTypes from '../constants/serverActionTypes';

export const analysis = (ws) => dispatch => {
  return new Promise((resolve, reject) => {
    ws.send('/start analysis');
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
    const ws = new WebSocket(`ws://${host}:${port}`);
    return new Promise((resolve, reject) => {
      ws.onopen = () => {
        dispatch({ type: serverActionTypes.CONNECTION_ESTABLISHED, payload: { ws: ws } });
        resolve(ws);
      };
      ws.onerror = (err) => {
        dispatch({ type: serverActionTypes.CONNECTION_ERROR });
        reject(err);
      };
    });
  } else {
    ws.close();
    return new Promise((resolve, reject) => {
      ws.onclose = () => {
        dispatch({ type: serverActionTypes.CONNECTION_CLOSED });
        resolve(ws);
      };
      ws.onerror = (err) => {
        dispatch({ type: serverActionTypes.CONNECTION_ERROR });
        reject(err);
      };
    });
  }
};
