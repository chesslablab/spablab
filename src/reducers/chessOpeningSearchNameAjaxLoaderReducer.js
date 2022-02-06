import chessOpeningSearchNameAjaxLoaderActionTypes from '../constants/ajaxLoader/chessOpeningSearchNameAjaxLoaderActionTypes';

const initialState = {
  show: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningSearchNameAjaxLoaderActionTypes.SHOW:
      return {
        show: true
      };
    case chessOpeningSearchNameAjaxLoaderActionTypes.HIDE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
