import chessOpeningAnalysisAjaxLoaderActionTypes from '../constants/ajaxLoader/chessOpeningAnalysisAjaxLoaderActionTypes';

const initialState = {
  show: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningAnalysisAjaxLoaderActionTypes.SHOW:
      return {
        show: true
      };
    case chessOpeningAnalysisAjaxLoaderActionTypes.HIDE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
