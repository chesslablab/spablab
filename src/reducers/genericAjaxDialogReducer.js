import genericAjaxDialogActionTypes from '../constants/dialog/genericAjaxDialogActionTypes';

const initialState = {
  open: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case genericAjaxDialogActionTypes.CLOSE:
      return {
        ...state,
        open: false,
      };
    case genericAjaxDialogActionTypes.OPEN:
      return {
        ...state,
        open: true,
      };
    default:
      return state;
  }
};

export default reducer;
