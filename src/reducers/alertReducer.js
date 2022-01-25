import alertInfoActionTypes from '../constants/alert/alertInfoActionTypes';

const initialState = {
  info: null,
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case alertInfoActionTypes.INFO_DISPLAY:
      return {
        info: action.payload.info,
        open: true
      };
    case alertInfoActionTypes.INFO_CLOSE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
