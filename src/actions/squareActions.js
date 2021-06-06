import squareActionTypes from 'constants/squareActionTypes'

export const click = (payload) => ({
  type: squareActionTypes.CLICK,
  payload: payload
});
