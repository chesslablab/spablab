import chessOpeningAnalysisTableActionTypes from '../constants/table/chessOpeningAnalysisTableActionTypes';

const initialState = {
  rows: [],
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningAnalysisTableActionTypes.DISPLAY:
      return {
        rows: action.payload.rows,
        open: true
      };
    case chessOpeningAnalysisTableActionTypes.CLOSE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
