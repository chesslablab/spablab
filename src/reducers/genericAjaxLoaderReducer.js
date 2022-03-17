import genericAjaxLoaderActionTypes from '../constants/ajaxLoader/genericAjaxLoaderActionTypes';

const initialState = {
  show: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case genericAjaxLoaderActionTypes.SHOW:
      return {
        show: true
      };
    case genericAjaxLoaderActionTypes.HIDE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
