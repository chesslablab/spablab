import chessOpeningSearchEcoAjaxLoaderActionTypes from '../constants/ajaxLoader/chessOpeningSearchEcoAjaxLoaderActionTypes';

const initialState = {
  show: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningSearchEcoAjaxLoaderActionTypes.SHOW:
      return {
        show: true
      };
    case chessOpeningSearchEcoAjaxLoaderActionTypes.HIDE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
