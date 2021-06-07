import historyActionTypes from '../constants/historyActionTypes'

export const goToBeginning = (payload) => ({
  type: historyActionTypes.GO_TO_BEGINNING,
  payload: payload
});

export const goBack = () => ({
  type: historyActionTypes.GO_BACK
});

export const goForward = () => ({
  type: historyActionTypes.GO_FORWARD
});

export const goToEnd = () => ({
  type: historyActionTypes.GO_TO_END
});
