import chessOpeningSearchMovetextAjaxLoaderActionTypes from '../constants/ajaxLoader/chessOpeningSearchMovetextAjaxLoaderActionTypes';

const initialState = {
  show: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case chessOpeningSearchMovetextAjaxLoaderActionTypes.SHOW:
      return {
        show: true
      };
    case chessOpeningSearchMovetextAjaxLoaderActionTypes.HIDE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
