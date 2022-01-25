import alertInfoActionTypes from '../constants/alert/alertInfoActionTypes';

const initialState = {
  info: null,
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case alertInfoActionTypes.DISPLAY_INFO_ALERT:
      return {
        info: action.payload.info,
        open: true
      };
    case alertInfoActionTypes.CLOSE_INFO_ALERT:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
