import chessOpeningAjaxLoaderActionTypes from '../constants/ajaxLoader/chessOpeningAjaxLoaderActionTypes';

const initialState = {
  show: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningAjaxLoaderActionTypes.SHOW:
      return {
        show: true
      };
    case chessOpeningAjaxLoaderActionTypes.HIDE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
