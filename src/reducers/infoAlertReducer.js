import infoAlertActionTypes from '../constants/alert/infoAlertActionTypes';

const initialState = {
  info: null,
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case infoAlertActionTypes.DISPLAY:
      return {
        info: action.payload.info,
        open: true
      };
    case infoAlertActionTypes.CLOSE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
