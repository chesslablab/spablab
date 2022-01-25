import chessOpeningAnalysisAlertActionTypes from '../constants/alert/chessOpeningAnalysisAlertActionTypes';

const initialState = {
  info: null,
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningAnalysisAlertActionTypes.DISPLAY:
      return {
        info: action.payload.info,
        open: true
      };
    case chessOpeningAnalysisAlertActionTypes.CLOSE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
