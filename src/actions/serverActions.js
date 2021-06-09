import serverActionTypes from '../constants/serverActionTypes'

export const analysis = () => ({
  type: serverActionTypes.ANALYSIS
});

export const connect = () => ({
  type: serverActionTypes.CONNECT
});

export const playAi = () => ({
  type: serverActionTypes.PLAY_AI
});

export const playFriend = () => ({
  type: serverActionTypes.PLAY_FRIEND
});
