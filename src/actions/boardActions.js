import boardActionTypes from 'constants/boardActionTypes'

export const reset = () => ({
  type: boardActionTypes.RESET
});

export const click = (payload) => ({
  type: boardActionTypes.CLICK,
  payload: payload
});
