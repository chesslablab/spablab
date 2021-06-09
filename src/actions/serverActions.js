import serverActionTypes from '../constants/serverActionTypes';

export const analysis = () => ({
  type: serverActionTypes.ANALYSIS
});

export const connect = (host, port) => dispatch => {
  dispatch({
    type: serverActionTypes.CONNECTION_REQUESTED
  });
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`ws://${host}:${port}`);
    socket.onopen = () => {
      dispatch({
        type: serverActionTypes.CONNECTION_ESTABLISHED
      });
      resolve(socket);
    };
    socket.onerror = (err) => {
      dispatch({
        type: serverActionTypes.CONNECTION_ERROR
      });
      reject(err);
    };
  });
};

export const playAi = () => ({
  type: serverActionTypes.PLAY_AI
});

export const playFriend = () => ({
  type: serverActionTypes.PLAY_FRIEND
});
