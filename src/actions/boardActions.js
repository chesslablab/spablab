import boardActionTypes from 'constants/boardActionTypes'

export const analysis = () => ({
  type: boardActionTypes.START
});

export const click = (payload) => ({
  type: boardActionTypes.CLICK,
  payload: payload
});
