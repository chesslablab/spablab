import boardActionTypes from 'constants/boardActionTypes'

export const analysis = () => ({
  type: boardActionTypes.ANALYSIS
});

export const click = (payload) => ({
  type: boardActionTypes.CLICK,
  payload: payload
});
