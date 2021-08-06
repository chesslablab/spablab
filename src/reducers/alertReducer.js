import alertActionTypes from '../constants/alertActionTypes';

const initialState = {
  info: null,
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case alertActionTypes.INFO_DISPLAY:
      return {
        info: action.payload.info,
        open: true
      };
    case alertActionTypes.INFO_CLOSE:
      return state;
    default:
      return state;
  }
};

export default reducer;
