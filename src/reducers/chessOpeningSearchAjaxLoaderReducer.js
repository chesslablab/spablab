import chessOpeningSearchAjaxLoaderActionTypes from '../constants/ajaxLoader/chessOpeningSearchAjaxLoaderActionTypes';

const initialState = {
  show: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningSearchAjaxLoaderActionTypes.SHOW:
      return {
        show: true
      };
    case chessOpeningSearchAjaxLoaderActionTypes.HIDE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
