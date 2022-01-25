import chessOpeningAlertActionTypes from '../constants/alert/chessOpeningAlertActionTypes';

const initialState = {
  info: null,
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningAlertActionTypes.DISPLAY:
      return {
        info: action.payload.info,
        open: true
      };
    case chessOpeningAlertActionTypes.CLOSE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
